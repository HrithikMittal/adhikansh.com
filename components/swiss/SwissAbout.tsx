import { ABOUT } from "@/constants/portfolio";

export default function SwissAbout() {
  return (
    <section className="py-20 md:py-14 sm:py-11 border-b border-[var(--line)]" id="about">
      <div className="grid grid-cols-[200px_1fr] gap-10 mb-10 items-start max-[820px]:grid-cols-1 max-[820px]:gap-[18px] max-[820px]:mb-7">
        <div className="flex gap-3.5 items-start">
          <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider leading-none">
            § 01
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)] leading-none">About</span>
        </div>
        <div className="text-[clamp(22px,2.4vw,28px)] tracking-[-0.02em] max-w-[720px] m-0">
        <h2 className="font-medium mb-7 leading-none [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          Multidisciplinary technical founder. Comfortable in code, taste, and{" "}
          <em className="italic font-[family-name:var(--font-newsreader)] font-normal">customer calls</em>.
        </h2>
        <div>
          <p className="text-[17px] leading-[1.6] mb-4.5 max-w-[640px]">
            I started Coraltalk after a decade of bouncing between engineering, product, and the messy in-between. Before that I co-founded{" "}
            <a href="https://staymod.in" className="border-b border-[var(--line-strong)]">
              StayMod
            </a>{" "}
            and{" "}
            <a href="https://eatmod.in" className="border-b border-[var(--line-strong)]">
              EatMod
            </a>{" "}
            — turning hand-written specs into production systems and live customers.
          </p>
          <p className="text-[17px] leading-[1.6] mb-4.5 max-w-[640px]">
            I care about the parts of building that don&apos;t show up in case studies: the second iteration that nobody asks for, the dashboards you delete, the hire you should have made earlier. I work best with people who treat{" "}
            <em className="italic font-[family-name:var(--font-newsreader)]">simplicity</em> as the hardest design constraint.
          </p>
          <p className="text-[17px] leading-[1.6] mb-4.5 max-w-[640px]">
            If you&apos;re trying to take an idea from blank repo to first ten paying customers — or scale that work past the founder bottleneck — I&apos;m a useful person to talk to.
          </p>

          {/* Stack matrix */}
          <div className="mt-9 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-0 border-t border-[var(--line)]">
            {Object.entries(ABOUT.stack).map(([key, value]) => (
              <div
                key={key}
                className="py-3.5 border-b border-[var(--line)] flex items-baseline justify-between gap-3.5"
              >
                <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider">
                  {key === "comfortZone" ? "Comfort zone" : key.toUpperCase()}
                </span>
                <span className="text-[14px]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div> 
    </section>
  );
}
