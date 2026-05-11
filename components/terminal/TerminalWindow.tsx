export default function TerminalWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-white/[0.14] rounded-[10px] bg-gradient-to-b from-[#111116] to-[#0e0e12] shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-white/[0.08] bg-black/25">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <i className="w-[11px] h-[11px] rounded-full bg-[#ff5f56] opacity-85 block" />
          <i className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e] opacity-85 block" />
          <i className="w-[11px] h-[11px] rounded-full bg-[#27c93f] opacity-85 block" />
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-[12px] text-[#5b5b56] tracking-wide">
          <b className="text-[#9c9c95] font-medium">adhi@coral</b> ~ zsh
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          <div className="text-[11px] px-2.5 py-1 rounded-[5px] text-[#e6e6e0] bg-white/[0.04] border border-white/[0.08]">
            portfolio
          </div>
        </div>
      </div>

      {/* Terminal body */}
      <div className="px-8 sm:px-4 py-7 sm:py-5 min-h-[60vh]">
        {children}
      </div>
    </div>
  );
}
