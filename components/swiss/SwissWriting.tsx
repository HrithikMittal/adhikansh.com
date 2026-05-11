import { ESSAYS } from "@/constants/portfolio";

export default function SwissWriting() {
  return (
    <section className="py-20 md:py-14 sm:py-11 border-b border-[var(--line)]" id="writing">
      <div className="grid grid-cols-[200px_1fr] gap-10 mb-10 items-start max-[820px]:grid-cols-1 max-[820px]:gap-[18px] max-[820px]:mb-7">
        <div className="flex gap-3.5 items-start">
          <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider leading-none">
            § 03
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)] leading-none">Writing</span>
        </div>
        <h2 className="text-[clamp(22px,2.4vw,28px)] font-medium tracking-[-0.02em] max-w-[720px] m-0 leading-none [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          Notes on building, hiring, and the unromantic parts of{" "}
          <em className="italic font-[family-name:var(--font-newsreader)] font-normal">founder mode</em>.
        </h2>
      </div>

      <div className="flex flex-col">
        {ESSAYS.map((essay) => (
          <a
            key={essay.slug}
            href={`#${essay.slug}`}
            className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[1fr_auto] gap-6 md:gap-y-2 md:gap-x-3 items-baseline py-4.5 border-t border-[var(--line)] first:border-t hover:pl-2 md:hover:pl-0 transition-all"
          >
            <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider md:row-start-1">
              {essay.date}
            </span>
            <div className="md:row-start-2 md:col-span-2">
              <span className="text-[17px] tracking-[-0.01em] leading-[1.35] font-medium block">
                {essay.title}
              </span>
              <span className="block text-[14px] text-[var(--muted)] font-normal mt-0.5">
                {essay.subtitle}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[var(--muted)] md:row-start-1">
              {essay.readTime}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
