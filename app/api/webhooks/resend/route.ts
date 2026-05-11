import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function parseAddressList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function uniqueEmails(addresses: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const a of addresses) {
    const key = a.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(a);
  }
  return out;
}

/**
 * Resend Inbound webhook — subscribe to `email.received` in the Resend dashboard.
 *
 * **Where it forwards**
 * - If `RESEND_INBOUND_FORWARD_TO` is set: every address in that list (comma / `;` / newline separated).
 * - If unset / empty: all recipients on the inbound message (`to`, `cc`, `bcc`) from the webhook payload.
 *
 * **Outbound `from` (Resend requires a verified-domain sender)**  
 * You do not need a dedicated env mailbox if inbound mail has a `To:` on your domain:
 * 1. `RESEND_INBOUND_FORWARD_FROM` or `RESEND_FROM` if set
 * 2. Otherwise the **first inbound `To` address** (`result.data.to[0]`) — the address that received the message on your inbound subdomain (must be allowed to send on that domain in Resend).
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  if (!apiKey || !webhookSecret) {
    return new NextResponse("Resend webhook is not configured", { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    const payload = await req.text();

    const id = req.headers.get("svix-id");
    const timestamp = req.headers.get("svix-timestamp");
    const signature = req.headers.get("svix-signature");

    if (!id || !timestamp || !signature) {
      return new NextResponse("Missing Svix signature headers", { status: 400 });
    }

    const result = resend.webhooks.verify({
      payload,
      headers: { id, timestamp, signature },
      webhookSecret,
    });

    if (result.type !== "email.received") {
      return NextResponse.json({ ok: true, ignored: result.type });
    }

    const envList = parseAddressList(process.env.RESEND_INBOUND_FORWARD_TO);
    const fromInbound = uniqueEmails([
      ...result.data.to,
      ...(result.data.cc ?? []),
      ...(result.data.bcc ?? []),
    ]);
    const forwardTo = envList.length > 0 ? uniqueEmails(envList) : fromInbound;

    if (forwardTo.length === 0) {
      return new NextResponse("No forward recipients (set RESEND_INBOUND_FORWARD_TO or inbound to/cc/bcc)", {
        status: 400,
      });
    }

    const forwardFrom =
      process.env.RESEND_INBOUND_FORWARD_FROM?.trim() ||
      process.env.RESEND_FROM?.trim() ||
      result.data.to[0]?.trim();

    if (!forwardFrom) {
      return new NextResponse(
        "Could not set From: add RESEND_INBOUND_FORWARD_FROM (or RESEND_FROM), or receive mail with a To address on your inbound domain.",
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.receiving.forward({
      emailId: result.data.email_id,
      to: forwardTo.length === 1 ? forwardTo[0]! : forwardTo,
      from: forwardFrom,
    });

    if (error) {
      console.error("[resend inbound forward]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data, forwardedTo: forwardTo, from: forwardFrom });
  } catch (e) {
    console.error("[resend webhook]", e);
    return new NextResponse("Invalid webhook or handler error", { status: 400 });
  }
}
