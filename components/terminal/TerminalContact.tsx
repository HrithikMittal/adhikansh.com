import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants/portfolio";
import Prompt from "./Prompt";

export function TerminalContactBody() {
  return (
    <div className="max-lg:rounded-md max-lg:border-0 max-lg:bg-transparent max-lg:px-0 max-lg:py-0 lg:rounded-lg lg:border lg:border-white/[0.08] lg:bg-[radial-gradient(ellipse_100%_80%_at_100%_0%,rgba(255,107,74,0.06),transparent_60%),radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(167,139,255,0.05),transparent_60%),rgba(255,255,255,0.015)] lg:px-5 lg:py-4.5">
      <h3 className="mb-3 text-[clamp(18px,3.2vw,30px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#e6e6e0]">
        Let&apos;s build something{" "}
        <span className="bg-gradient-to-r from-[#ff6b4a] to-[#a78bff] bg-clip-text text-transparent">
          great
        </span>
      </h3>

      <div className="my-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-[#ff6b4a] bg-[#ff6b4a] px-3 py-2.5 text-[12px] font-medium text-[#0a0a0a] transition-all hover:-translate-y-0.5 hover:bg-[#ff8568] sm:w-auto sm:justify-start"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Email me
        </a>
        <a
          href="https://topmate.io/adhikansh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-white/[0.14] bg-transparent px-3 py-2.5 text-[12px] font-medium text-[#e6e6e0] transition-all hover:border-[#a78bff] hover:bg-white/[0.04] hover:text-[#a78bff] sm:w-auto sm:justify-start"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Book a call
        </a>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/[0.1] bg-white/[0.1] lg:grid-cols-2">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 flex-col gap-1 bg-[#111116] px-3 py-3 transition-colors hover:bg-[#15151c] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-3.5"
          >
            <span className="shrink-0 text-[10px] uppercase tracking-wider text-[#5b5b56]">{link.platform}</span>
            <span className="flex min-w-0 items-center gap-1 break-words text-[12px] text-[#9c9c95] transition-colors group-hover:text-[#ff6b4a] sm:justify-end sm:text-right">
              <span className="min-w-0">{link.handle}</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function TerminalContact() {
  return (
    <div className="mt-8 max-lg:mt-6 lg:mt-11">
      <div className="my-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56] sm:my-4">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">05</span> Contact
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      <Prompt command="ping --reach me" />
      <TerminalContactBody />
    </div>
  );
}
