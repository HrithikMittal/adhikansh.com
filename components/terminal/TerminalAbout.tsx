import type { ReactNode } from "react";
import { ABOUT, MEDIUM_PROFILE } from "@/constants/portfolio";
import Prompt from "./Prompt";

const stackLines = Object.entries(ABOUT.stack).map(([key, value]) => ({
  key,
  value,
  label: key === "comfortZone" ? "comfortZone" : key,
}));

const prose = "text-[13px] leading-[1.65] text-[#e6e6e0] sm:text-[14px] max-w-[65ch]";
const muted = "text-[13px] leading-[1.65] text-[#9c9c95] sm:text-[14px] max-w-[65ch]";

/** Line gutter + numbers — lg+ only; below lg, content is full-width to avoid “terminal in terminal”. */
function LineRow({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-3 py-1 sm:gap-x-4 lg:grid-cols-[2.5rem_minmax(0,1fr)]">
      <span className="hidden select-none pt-0.5 text-right font-mono text-[11px] tabular-nums leading-[1.65] text-[#5b5b56] lg:block">
        {n}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function TerminalAboutBody() {
  const stackStart = 6 + ABOUT.paragraphs.length;

  return (
    <div className="max-lg:py-0 lg:rounded-lg lg:border lg:border-white/[0.08] lg:bg-white/[0.015] lg:px-6 lg:py-6">
      <LineRow n={1}>
        <div className="leading-snug">
          <span className="text-[#a78bff]">#</span> <span className="text-[#ff6b4a]">About</span>
        </div>
      </LineRow>

      <LineRow n={2}>
        <p className={`m-0 ${muted}`}>{ABOUT.headline}</p>
      </LineRow>

      {ABOUT.paragraphs.map((para, i) => (
        <LineRow key={i} n={3 + i}>
          <p className={`m-0 ${prose}`}>{para}</p>
        </LineRow>
      ))}

      <LineRow n={3 + ABOUT.paragraphs.length}>
        <p className="m-0 text-[13px] italic leading-[1.65] text-[#5b5b56] sm:text-[14px] max-w-[65ch]">{ABOUT.personal}</p>
      </LineRow>

      <LineRow n={4 + ABOUT.paragraphs.length}>
        <div className="min-w-0">
          <a
            href={MEDIUM_PROFILE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#a78bff] underline decoration-[#a78bff]/40 underline-offset-2 transition-colors hover:text-[#ff6b4a] hover:decoration-[#ff6b4a]/50 sm:text-[14px]"
          >
            {MEDIUM_PROFILE.url.replace("https://", "")}
          </a>
          <span className="text-[13px] text-[#5b5b56] sm:text-[14px]"> {"// essays"}</span>
        </div>
      </LineRow>

      <div className="max-lg:pt-3 lg:pt-4">
        <LineRow n={5 + ABOUT.paragraphs.length}>
          <span className="text-[13px] italic text-[#5b5b56] sm:text-[14px]">{"// Stack"}</span>
        </LineRow>
      </div>

      {stackLines.map((line, i) => (
        <div
          key={line.key}
          className="grid grid-cols-1 items-start gap-x-3 gap-y-0.5 py-1 sm:gap-x-4 lg:grid-cols-[2.5rem_7.5rem_minmax(0,1fr)]"
        >
          <span className="hidden select-none pt-0.5 text-right font-mono text-[11px] tabular-nums leading-[1.65] text-[#5b5b56] lg:block">
            {stackStart + i}
          </span>
          <span className="break-words pt-0.5 font-mono text-[12px] leading-[1.65] text-[#ffb454] sm:text-[13px] lg:text-right">
            {line.label}:
          </span>
          <span className={`min-w-0 break-words ${prose}`}>{line.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function TerminalAbout() {
  return (
    <div className="mt-8 max-lg:mt-6 lg:mt-11">
      <div className="my-4.5 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">01</span> About
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      <Prompt command="cat about.md" />
      <TerminalAboutBody />
    </div>
  );
}
