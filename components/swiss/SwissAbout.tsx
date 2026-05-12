import Image from "next/image";
import { ABOUT, PROFILE_IMAGE } from "@/constants/portfolio";

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
        <div className="text-[clamp(22px,2.4vw,28px)] tracking-[-0.02em] max-w-[720px] m-0 min-w-0">
          <div className="mb-7 flex flex-col items-center gap-8 min-[821px]:flex-row min-[821px]:items-start min-[821px]:gap-10">
            <div className="relative h-[148px] w-[148px] shrink-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--tint)] shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-none">
              <Image
                src={PROFILE_IMAGE}
                alt="Adhikansh Mittal"
                width={296}
                height={296}
                className="h-full w-full object-cover object-[center_12%]"
                priority
                sizes="148px"
              />
            </div>
            <h2 className="max-[820px]:text-center min-[821px]:flex-1 min-[821px]:pt-1 font-medium leading-[1.15] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              {ABOUT.headline}
            </h2>
          </div>
          <div>
            {ABOUT.paragraphs.map((para, i) => (
              <p key={i} className="text-[17px] leading-[1.6] mb-4.5 max-w-[640px]">
                {para}
              </p>
            ))}
            <p className="text-[15px] leading-[1.6] mb-4.5 max-w-[640px] text-[var(--muted)]">{ABOUT.personal}</p>

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
