"use client";

import { ModeProvider, useMode } from "@/contexts/ModeContext";
import SwissMode from "@/components/swiss/SwissMode";
import TerminalMode from "@/components/terminal/TerminalMode";
import AgentMode from "@/components/agent/AgentMode";
import ModeSwitcher from "@/components/shared/ModeSwitcher";

function PortfolioContent() {
  const { mode } = useMode();

  return (
    <>
      {mode === "human" && <SwissMode />}
      {mode === "dev" && <TerminalMode />}
      {mode === "agent" && <AgentMode />}
      <ModeSwitcher />
    </>
  );
}

export default function Home() {
  return (
    <ModeProvider>
      <PortfolioContent />
    </ModeProvider>
  );
}
