"use client";

import { useMode, type PortfolioMode } from "@/contexts/ModeContext";

const MODES: { value: PortfolioMode; label: string }[] = [
  { value: "human", label: "HUMAN" },
  { value: "dev", label: "DEV" },
  { value: "agent", label: "AGENT" },
];

export default function TerminalModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div
      className="flex max-w-none shrink-0 flex-nowrap items-center justify-end gap-1 rounded-md border border-white/[0.12] bg-black/55 px-1.5 py-1 sm:gap-1.5 sm:px-2"
      role="group"
      aria-label="Switch portfolio mode"
    >
      <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-[#5b5b56] sm:inline">MODE:</span>
      <div className="flex gap-0.5 sm:gap-1">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setMode(m.value)}
            aria-pressed={mode === m.value}
            className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide transition-colors sm:px-2 sm:text-[10px] ${
              mode === m.value
                ? "border border-[#ff6b4a]/40 bg-[#ff6b4a]/15 text-[#e6e6e0]"
                : "border border-transparent text-[#5b5b56] hover:border-white/[0.1] hover:bg-white/[0.06] hover:text-[#9c9c95]"
            }`}
          >
            [{m.label}]
          </button>
        ))}
      </div>
    </div>
  );
}
