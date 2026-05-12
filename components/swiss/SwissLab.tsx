import { LAB_IDEAS } from "@/constants/portfolio";

export default function SwissLab() {
  return (
    <section className="py-20 md:py-14 sm:py-11 border-b border-[var(--line)]" id="lab">
      <div className="grid grid-cols-[200px_1fr] gap-10 mb-10 items-start max-[820px]:grid-cols-1 max-[820px]:gap-[18px] max-[820px]:mb-7">
        <div className="flex gap-3.5 items-start">
          <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider leading-none">
            § 03
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)] leading-none">Lab</span>
        </div>
        <h2 className="text-[clamp(22px,2.4vw,28px)] font-medium tracking-[-0.02em] max-w-[720px] m-0 leading-none [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          Exploring —{" "}
          <em className="italic font-[family-name:var(--font-newsreader)] font-normal">not shipped</em>. Names are
          working titles; ping me if something overlaps your world.
        </h2>
      </div>

      <ul className="m-0 list-none border-t border-[var(--line)] p-0">
        {LAB_IDEAS.map((idea, i) => (
          <li
            key={idea.id}
            className="group relative isolate flex flex-col gap-4 border-b border-[var(--line)] px-0 py-5 transition-colors before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:z-[-1] before:w-screen before:-translate-x-1/2 before:bg-transparent before:transition-colors hover:before:bg-[var(--tint)] lg:grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-x-10 lg:gap-y-0 lg:py-[22px]"
          >
            <div className="relative z-10 flex min-w-0 items-start gap-3.5 lg:col-start-1 lg:row-start-1">
              <span className="shrink-0 pt-0.5 font-mono text-[11px] tabular-nums uppercase tracking-wider leading-none text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="relative z-10 min-w-0 max-w-[720px] lg:col-start-2 lg:row-start-1">
              <p className="m-0 mb-2 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                {idea.workingTitle}
              </p>
              <p className="m-0 text-[15px] leading-relaxed text-[var(--fg)]">{idea.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
