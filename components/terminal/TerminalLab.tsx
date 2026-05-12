import { LAB_IDEAS } from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalLab() {
  return (
    <div className="mt-11">
      <div className="flex items-center gap-3 my-4.5 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">03</span> Lab
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <Prompt command="grep -n '^' ideas/roadmap.txt" />
      <div className="flex flex-col gap-0 border border-white/[0.08] rounded-lg overflow-hidden">
        {LAB_IDEAS.map((idea, i) => (
          <div
            key={idea.id}
            className="border-b border-white/[0.08] last:border-b-0 px-4 py-4 sm:px-5 sm:py-4.5 bg-white/[0.015]"
          >
            <div className="font-mono text-[11px] text-[#5be3a3] mb-2">
              {String(i + 1).padStart(2, "0")} · {idea.workingTitle}
            </div>
            <p className="text-[13px] leading-relaxed text-[#9c9c95] m-0 max-w-[640px]">{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
