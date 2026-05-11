"use client";

import TerminalWindow from "./TerminalWindow";
import TerminalHero from "./TerminalHero";
import TerminalAbout from "./TerminalAbout";
import TerminalProjects from "./TerminalProjects";
import TerminalWriting from "./TerminalWriting";
import TerminalContact from "./TerminalContact";
import TerminalStatusBar from "./TerminalStatusBar";

export default function TerminalMode() {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#e6e6e0] font-mono relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(167,139,255,0.06),transparent_60%),radial-gradient(ellipse_70%_50%_at_100%_100%,rgba(255,107,74,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.012)_0_1px,transparent_1px_3px)] mix-blend-overlay opacity-50" />
      </div>

      <div className="relative z-[2] max-w-[1180px] mx-auto px-6 sm:px-3 py-8 sm:py-4 pb-16 sm:pb-12">
        <TerminalWindow>
          <TerminalHero />
          <TerminalAbout />
          <TerminalProjects />
          <TerminalWriting />
          <TerminalContact />
          <TerminalStatusBar />
        </TerminalWindow>
      </div>
    </div>
  );
}
