import { TERMINAL_TAGLINE } from "@/constants/portfolio";

const TAGLINE_PARTS = TERMINAL_TAGLINE.split(" · ");

export default function TerminalStatusBar() {
  return (
    <div className="mt-3 border border-white/[0.08] rounded-md bg-black/30 grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 text-[11px] text-[#5b5b56] uppercase tracking-wider overflow-hidden">
      <div className="px-3.5 py-2 border-r border-white/[0.08] bg-[#ff6b4a] text-[#0a0a0a]">{TAGLINE_PARTS[0]}</div>
      <div className="px-3.5 py-2 border-r border-white/[0.08]">~/portfolio</div>
      <div className="px-3.5 py-2 border-r border-white/[0.08]">main</div>
      <div className="px-3.5 py-2 border-r border-white/[0.08] bg-[#a78bff] text-[#0a0a0a]">{TAGLINE_PARTS[1]}</div>
      <div className="px-3.5 py-2 bg-[#ff6b4a] text-[#0a0a0a]">{TAGLINE_PARTS[2]}</div>
    </div>
  );
}
