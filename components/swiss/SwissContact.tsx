import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants/portfolio";

export default function SwissContact() {
  return (
    <section className="py-20 md:py-14 sm:py-11 border-b border-[var(--line)]" id="contact">
      <div className="grid grid-cols-[200px_1fr] gap-10 items-start max-[820px]:grid-cols-1 max-[820px]:gap-[18px]">
        <div className="flex gap-3.5 items-start">
          <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider leading-none">
            § 04
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)] leading-none">Contact</span>
        </div>

        <div className="m-0 max-w-[720px]">
          <h3 className="text-[clamp(36px,5vw,64px)] font-medium tracking-[-0.03em] leading-none mb-7 [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
            Have an idea worth shipping?{" "}
            <em className="italic font-[family-name:var(--font-newsreader)] font-normal">Let&apos;s talk.</em>
          </h3>

          <div className="flex gap-3 flex-wrap mb-9 max-[820px]:flex-col max-[820px]:items-stretch">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-[var(--line-strong)] text-[13px] bg-[var(--fg)] text-white dark:text-[var(--bg)] hover:-translate-y-0.5 transition-transform"
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
              className="inline-flex items-center gap-2 px-4 py-3 max-[820px]:justify-between max-[820px]:px-4.5 rounded-full border border-[var(--line)] text-[13px] hover:border-[var(--line-strong)] hover:-translate-y-0.5 transition-all"
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

          <div className="grid grid-cols-2 max-[820px]:grid-cols-1 border-t border-[var(--line)]">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex justify-between items-center gap-3.5 py-4 border-b border-[var(--line)] hover:pl-0.5 transition-all group ${
                  i % 2 === 0
                    ? "pr-6 border-r max-[820px]:pr-0 max-[820px]:border-r-0"
                    : "pl-6 max-[820px]:pl-0"
                }`}
              >
                <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider">
                  {link.platform}
                </span>
                <span className="text-[14px] flex items-center gap-2">
                  {link.handle}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all"
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
    </section>
  );
}
