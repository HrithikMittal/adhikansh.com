"use client";

import { ModeProvider, useMode } from "@/contexts/ModeContext";
import SwissMode from "@/components/swiss/SwissMode";
import TerminalMode from "@/components/terminal/TerminalMode";
import AgentMode from "@/components/agent/AgentMode";
import ModeSwitcher from "@/components/shared/ModeSwitcher";

function PortfolioContent() {
  const { mode } = useMode();

  return (
    <div
      className={
        mode === "dev"
          ? "flex h-[100dvh] flex-col overflow-hidden"
          : "pb-[calc(7rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))]"
      }
    >
      {mode === "human" && <SwissMode />}
      {mode === "dev" && <TerminalMode />}
      {mode === "agent" && <AgentMode />}
      <ModeSwitcher />
    </div>
  );
}

export default function Home() {
  return (
    <ModeProvider>
      <PortfolioContent />
    </ModeProvider>
  );
}
