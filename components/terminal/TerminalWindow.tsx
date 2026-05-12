"use client";

import TerminalModeToggle from "./TerminalModeToggle";

export default function TerminalWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 w-full max-w-full flex-1 flex-col overflow-hidden rounded-[10px] border border-white/[0.14] bg-gradient-to-b from-[#111116] to-[#0e0e12] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      {/* Terminal header — dots + title + mode toggle; title stacks on small screens to avoid overlap */}
      <div className="relative flex shrink-0 flex-row items-center gap-2 border-b border-white/[0.08] bg-black/25 px-2 py-2 sm:gap-3 sm:px-3.5 sm:py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2 md:min-h-[1.75rem]">
          <div className="flex shrink-0 gap-1.5">
            <i className="block h-[11px] w-[11px] rounded-full bg-[#ff5f56] opacity-85" />
            <i className="block h-[11px] w-[11px] rounded-full bg-[#ffbd2e] opacity-85" />
            <i className="block h-[11px] w-[11px] rounded-full bg-[#27c93f] opacity-85" />
          </div>
          {/* Mobile / tablet: title in flow so it never collides with [HUMAN][DEV][AGENT] */}
          <div className="min-w-0 flex-1 truncate text-left text-[11px] tracking-wide text-[#5b5b56] sm:text-[12px] md:hidden">
            <b className="font-medium text-[#9c9c95]">adhi@coral</b> <span className="text-[#5b5b56]">~ zsh</span>
          </div>
        </div>

        {/* md+: centered title (original chrome) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden min-w-0 max-w-[min(42%,14rem)] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] tracking-wide text-[#5b5b56] sm:max-w-[min(46%,16rem)] sm:text-[12px] md:block lg:max-w-[50%]">
          <b className="font-medium text-[#9c9c95]">adhi@coral</b> ~ zsh
        </div>

        <div className="flex shrink-0 justify-end">
          <TerminalModeToggle />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 sm:px-8 sm:py-6">{children}</div>
    </div>
  );
}
