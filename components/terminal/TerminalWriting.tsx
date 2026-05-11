import { ESSAYS } from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalWriting() {
  return (
    <div className="mt-11">
      <div className="flex items-center gap-3 my-4.5 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">03</span> Writing
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <Prompt command="tail -n 4 writing.log" />
      <div className="border border-white/[0.08] rounded-lg py-1">
        {ESSAYS.map((essay, i) => (
          <a
            key={essay.slug}
            href={`#${essay.slug}`}
            className="grid grid-cols-[110px_1fr_auto] md:grid-cols-[1fr_auto] gap-4 md:gap-y-1.5 md:gap-x-3 items-baseline px-4.5 py-3.5 border-b border-white/[0.08] last:border-b-0 hover:bg-[rgba(167,139,255,0.05)] transition-colors"
          >
            <span className="text-[#5be3a3] text-[11px] md:row-start-1">{essay.date}</span>
            <span className="text-[#a78bff] font-semibold pr-1.5 hidden md:inline">INFO</span>
            <span className="text-[#e6e6e0] text-[13px] md:row-start-2 md:col-span-2">
              {essay.title}
            </span>
            <span className="text-[#5b5b56] text-[11px] md:row-start-1">{essay.readTime}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
