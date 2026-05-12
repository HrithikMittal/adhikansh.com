"use client";

import TerminalModeToggle from "./TerminalModeToggle";

export default function TerminalWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 w-full max-w-full flex-1 flex-col overflow-hidden rounded-[10px] border border-white/[0.14] bg-gradient-to-b from-[#111116] to-[#0e0e12] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      {/* Terminal header — mode switch top-right (replaces static tab) */}
      <div className="relative flex shrink-0 items-center gap-2 border-b border-white/[0.08] bg-black/25 px-2 py-2 sm:gap-3 sm:px-3.5 sm:py-2.5">
        <div className="flex shrink-0 gap-1.5">
          <i className="block h-[11px] w-[11px] rounded-full bg-[#ff5f56] opacity-85" />
          <i className="block h-[11px] w-[11px] rounded-full bg-[#ffbd2e] opacity-85" />
          <i className="block h-[11px] w-[11px] rounded-full bg-[#27c93f] opacity-85" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 min-w-0 max-w-[45%] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] tracking-wide text-[#5b5b56] sm:max-w-[50%] sm:text-[12px]">
          <b className="font-medium text-[#9c9c95]">adhi@coral</b> ~ zsh
        </div>

        <div className="ml-auto shrink-0">
          <TerminalModeToggle />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 sm:px-8 sm:py-6">{children}</div>
    </div>
  );
}
