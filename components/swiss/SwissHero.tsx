"use client";

import { Fragment } from "react";
import { PERSONAL_INFO, TICKER_ITEMS } from "@/constants/portfolio";

function splitDisplayName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) {
    return { line1: fullName, line2: "" };
  }
  const line1 = parts[0] ?? fullName;
  const line2 = `${parts.slice(1).join(" ")}.`;
  return { line1, line2 };
}

const META = [
  { label: "Index", value: PERSONAL_INFO.index },
  { label: "Based in", value: PERSONAL_INFO.location },
  { label: "Updated", value: PERSONAL_INFO.updated },
] as const;

export default function SwissHero() {
  const { line1, line2 } = splitDisplayName(PERSONAL_INFO.name);

  return (
    <section className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="pt-14 pb-0 sm:pt-16 md:pt-20 lg:pt-24">
        {/* Same grid as SwissAbout: 200px label rail + 1fr body so columns line up */}
        <div className="grid grid-cols-[200px_1fr] gap-10 items-start max-[820px]:grid-cols-1 max-[820px]:gap-[18px]">
          {/* Left rail — metadata (About uses § 01 / label here) */}
          <aside className="flex flex-row max-[820px]:justify-between sm:max-[820px]:justify-start gap-8 sm:gap-12 min-[821px]:flex-col min-[821px]:gap-7">
            {META.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1.5 min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                  {label}
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-[var(--fg)] tabular-nums">
                  {value}
                </span>
              </div>
            ))}
          </aside>

          {/* Right column — same rail + max width as SwissAbout */}
          <div className="m-0 max-w-[720px] flex flex-col items-start">
            <h1 className="text-[clamp(2.75rem,9vw,5.5rem)] font-bold tracking-[-0.045em] leading-[0.9] text-[var(--fg)] mb-6 md:mb-7">
              {line1}
              {line2 ? (
                <>
                  <br />
                  {line2}
                </>
              ) : null}
            </h1>

            <p className="text-lg sm:text-xl leading-snug text-[var(--fg)] max-w-xl tracking-[-0.01em] mb-3.5 md:mb-4">
              Technical founder building{" "}
              <em className="font-[family-name:var(--font-newsreader)] italic">AI products</em>{" "}
              from{" "}
              <span className="font-mono text-[0.95em] tracking-tight">0 → 1</span>. I write code,
              ship features, and answer support tickets — usually the same week.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-emerald-50/90 px-3 py-1.5 font-mono text-[10px] tracking-wide text-neutral-800 dark:border-[var(--line)] dark:bg-emerald-950/25 dark:text-neutral-400">
              <span
                className="size-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse-dot"
                aria-hidden
              />
              {PERSONAL_INFO.status}
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="mt-16 sm:mt-20 md:mt-24 border-y border-neutral-200/90 dark:border-[var(--line)] py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-scroll gap-5 sm:gap-6 items-center">
            {[0, 1, 2].map((copy) => (
              <span
                key={copy}
                className="inline-flex shrink-0 items-center gap-4 sm:gap-5 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500"
              >
                {TICKER_ITEMS.map((item, i) => (
                  <Fragment key={`${copy}-${item}-${i}`}>
                    {i > 0 ? (
                      <span className="text-neutral-300 dark:text-neutral-600 select-none" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <span className="whitespace-nowrap">{item.toUpperCase()}</span>
                  </Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
