"use client";

import TerminalWindow from "./TerminalWindow";
import TerminalShell from "./TerminalShell";

export default function TerminalMode() {
  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#08080a] font-mono text-[#e6e6e0]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(167,139,255,0.06),transparent_60%),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(255,107,74,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.012)_0_1px,transparent_1px_3px)] opacity-50 mix-blend-overlay" />
      </div>

      <div className="relative z-[2] mx-auto flex min-h-0 w-full max-w-[1180px] flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5">
        <TerminalWindow>
          <TerminalShell />
        </TerminalWindow>
      </div>
    </div>
  );
}
