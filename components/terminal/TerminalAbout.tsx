import { ABOUT } from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalAbout() {
  return (
    <div className="mt-11">
      <div className="flex items-center gap-3 my-4.5 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">01</span> About
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <Prompt command="cat about.md" />
      <div className="border border-white/[0.08] rounded-lg px-5 py-4.5 bg-white/[0.015]">
        {[
          { ln: "1", content: <><span className="text-[#a78bff]">#</span> <span className="text-[#ff6b4a]">About Me</span></> },
          { ln: "2", content: "" },
          { ln: "3", content: <><span className="text-[#9c9c95]">{ABOUT.headline}</span></> },
          { ln: "4", content: "" },
          { ln: "5", content: <><span className="text-[#e6e6e0]">{ABOUT.paragraphs[0]}</span></> },
          { ln: "6", content: "" },
          { ln: "7", content: <><span className="text-[#9c9c95]">{ABOUT.paragraphs[1]}</span></> },
          { ln: "8", content: "" },
          { ln: "9", content: <><span className="text-[#5b5b56] italic">// Stack</span></> },
          { ln: "10", content: <><span className="text-[#ffb454]">stack</span><span className="text-[#5b5b56]">:</span> <span className="text-[#e6e6e0]">{ABOUT.stack.stack}</span></> },
          { ln: "11", content: <><span className="text-[#ffb454]">ai</span><span className="text-[#5b5b56]">:</span> <span className="text-[#e6e6e0]">{ABOUT.stack.ai}</span></> },
          { ln: "12", content: <><span className="text-[#ffb454]">cloud</span><span className="text-[#5b5b56]">:</span> <span className="text-[#e6e6e0]">{ABOUT.stack.cloud}</span></> },
        ].map((line) => (
          <div key={line.ln} className="flex gap-2.5 items-baseline py-[3px] text-[#9c9c95]">
            <span className="text-[#5b5b56] w-6 text-right select-none">{line.ln}</span>
            <div>{line.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
