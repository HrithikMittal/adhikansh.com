"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PortfolioMode = "human" | "dev" | "agent";

interface ModeContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>("human");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read from localStorage
    const stored = localStorage.getItem("portfolio_mode") as PortfolioMode;
    // Read from URL
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode") as PortfolioMode;

    const initialMode = urlMode || stored || "human";
    setModeState(initialMode);
  }, []);

  const setMode = (newMode: PortfolioMode) => {
    setModeState(newMode);
    localStorage.setItem("portfolio_mode", newMode);

    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("mode", newMode);
    window.history.pushState({}, "", url);
  };

  if (!mounted) {
    // Prevent hydration mismatch
    return null;
  }

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
