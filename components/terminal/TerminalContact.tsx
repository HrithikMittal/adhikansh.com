import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalContact() {
  return (
    <div className="mt-11">
      <div className="flex items-center gap-3 my-4.5 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">05</span> Contact
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <Prompt command="ping --reach me" />
      <div className="border border-white/[0.08] rounded-lg px-6.5 py-6.5 bg-[radial-gradient(ellipse_100%_80%_at_100%_0%,rgba(255,107,74,0.07),transparent_60%),radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(167,139,255,0.06),transparent_60%),rgba(255,255,255,0.015)]">
        <h3 className="text-[clamp(24px,4vw,40px)] font-bold tracking-[-0.025em] leading-[1.05] text-[#e6e6e0] mb-4.5">
          Let&apos;s build something{" "}
          <span className="bg-gradient-to-r from-[#ff6b4a] to-[#a78bff] bg-clip-text text-transparent">
            great
          </span>
        </h3>

        <div className="flex gap-2.5 flex-wrap my-4.5">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 px-4 py-[11px] rounded-md text-[13px] font-medium bg-[#ff6b4a] text-[#0a0a0a] border border-[#ff6b4a] hover:-translate-y-0.5 hover:bg-[#ff8568] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email me
          </a>
          <a
            href="https://topmate.io/adhikansh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-[11px] rounded-md text-[13px] font-medium bg-transparent text-[#e6e6e0] border border-white/[0.14] hover:bg-white/[0.04] hover:border-[#a78bff] hover:text-[#a78bff] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book a call
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 border-t border-white/[0.08]">
          {SOCIAL_LINKS.map((link, i) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between py-3.5 border-b border-white/[0.08] hover:pl-2 md:hover:pl-0 transition-all group ${
                i % 2 === 0 ? "pr-4.5 border-r border-white/[0.08] md:pr-0 md:border-r-0" : "pl-4.5 md:pl-0"
              }`}
            >
              <span className="text-[11px] text-[#5b5b56] uppercase tracking-wider">{link.platform}</span>
              <span className="text-[13px] text-[#9c9c95] group-hover:text-[#ff6b4a] flex items-center gap-1.5 transition-colors">
                {link.handle}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
