import { ABOUT, MEDIUM_PROFILE } from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalAbout() {
  const stackLines = Object.entries(ABOUT.stack).map(([key, value]) => ({
    key,
    value,
    label: key === "comfortZone" ? "comfortZone" : key,
  }));

  return (
    <div className="mt-11">
      <div className="flex items-center gap-3 my-4.5 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">01</span> About
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <Prompt command="cat about.md" />
      <div className="border border-white/[0.08] rounded-lg px-5 py-4.5 bg-white/[0.015] space-y-3">
        <div className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
          <span className="text-[#5b5b56] w-6 text-right select-none">1</span>
          <div>
            <span className="text-[#a78bff]">#</span> <span className="text-[#ff6b4a]">About</span>
          </div>
        </div>
        <div className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
          <span className="text-[#5b5b56] w-6 text-right select-none">2</span>
          <div className="text-[#9c9c95]">{ABOUT.headline}</div>
        </div>
        {ABOUT.paragraphs.map((para, i) => (
          <div key={i} className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
            <span className="text-[#5b5b56] w-6 text-right select-none">{3 + i}</span>
            <div className="text-[#e6e6e0]">{para}</div>
          </div>
        ))}
        <div className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
          <span className="text-[#5b5b56] w-6 text-right select-none">{3 + ABOUT.paragraphs.length}</span>
          <div className="text-[#5b5b56] italic">{ABOUT.personal}</div>
        </div>
        <div className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
          <span className="text-[#5b5b56] w-6 text-right select-none">{4 + ABOUT.paragraphs.length}</span>
          <div>
            <a
              href={MEDIUM_PROFILE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a78bff] underline hover:text-[#ff6b4a]"
            >
              {MEDIUM_PROFILE.url.replace("https://", "")}
            </a>
            <span className="text-[#5b5b56]"> {"// essays"}</span>
          </div>
        </div>
        <div className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
          <span className="text-[#5b5b56] w-6 text-right select-none">{5 + ABOUT.paragraphs.length}</span>
          <div>
            <span className="text-[#5b5b56] italic">{"// Stack"}</span>
          </div>
        </div>
        {stackLines.map((line, i) => (
          <div key={line.key} className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
            <span className="text-[#5b5b56] w-6 text-right select-none">{6 + ABOUT.paragraphs.length + i}</span>
            <div>
              <span className="text-[#ffb454]">{line.label}</span>
              <span className="text-[#5b5b56]">:</span> <span className="text-[#e6e6e0]">{line.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
