"use client";

import { useMode, PortfolioMode } from "@/contexts/ModeContext";

export default function ModeSwitcher() {
  const { mode, setMode } = useMode();

  const modes: { value: PortfolioMode; label: string }[] = [
    { value: "human", label: "HUMAN" },
    { value: "dev", label: "DEV" },
    { value: "agent", label: "AGENT" },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 sm:bottom-6">
      <div className="rounded-md border border-white/20 bg-black/90 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2">
        <div className="flex items-center gap-2 font-mono text-[11px] leading-none sm:gap-2.5 sm:text-xs">
          <span className="shrink-0 text-white/55">MODE:</span>
          <div className="flex gap-1 sm:gap-1.5">
            {modes.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`rounded px-2 py-0.5 transition-all sm:px-2.5 sm:py-1 ${
                  mode === m.value
                    ? "border border-white/30 bg-white/20 text-white"
                    : "text-white/50 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                [{m.label}]
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
