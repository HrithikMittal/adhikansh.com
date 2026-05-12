import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants/portfolio";
import Prompt from "./Prompt";

export function TerminalContactBody() {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-[radial-gradient(ellipse_100%_80%_at_100%_0%,rgba(255,107,74,0.06),transparent_60%),radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(167,139,255,0.05),transparent_60%),rgba(255,255,255,0.015)] px-4 py-4 sm:px-5 sm:py-4.5">
      <h3 className="mb-3 text-[clamp(18px,3.2vw,30px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#e6e6e0]">
        Let&apos;s build something{" "}
        <span className="bg-gradient-to-r from-[#ff6b4a] to-[#a78bff] bg-clip-text text-transparent">
          great
        </span>
      </h3>

      <div className="my-3 flex flex-wrap gap-2">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#ff6b4a] bg-[#ff6b4a] px-3 py-2 text-[12px] font-medium text-[#0a0a0a] transition-all hover:-translate-y-0.5 hover:bg-[#ff8568]"
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
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.14] bg-transparent px-3 py-2 text-[12px] font-medium text-[#e6e6e0] transition-all hover:border-[#a78bff] hover:bg-white/[0.04] hover:text-[#a78bff]"
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

      <div className="grid grid-cols-2 border-t border-white/[0.08] md:grid-cols-1">
        {SOCIAL_LINKS.map((link, i) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-between border-b border-white/[0.08] py-2.5 transition-all hover:pl-1.5 md:hover:pl-0 ${
              i % 2 === 0 ? "border-r border-white/[0.08] pr-3 md:border-r-0 md:pr-0" : "pl-3 md:pl-0"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider text-[#5b5b56]">{link.platform}</span>
            <span className="flex items-center gap-1 text-[12px] text-[#9c9c95] transition-colors group-hover:text-[#ff6b4a]">
              {link.handle}
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="-translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
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
    <div className="mt-11">
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
