"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

export default function SwissNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Lab", href: "#lab" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--bg)]/88 backdrop-blur-xl border-b border-[var(--line)]">
        <div className="max-w-[1280px] mx-auto px-12 md:px-6 sm:px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-[var(--fg)]" />
            Adhikansh
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors relative group"
              >
                {link.label}
                <span className="absolute left-0 right-0 bottom-[-4px] h-px bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 border border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--tint)] rounded-full flex items-center justify-center transition-all"
              aria-label="Toggle theme"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden h-8 px-3 border border-[var(--line)] hover:border-[var(--line-strong)] rounded-full flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider"
          >
            <span className="flex flex-col gap-[3px]">
              <i className="w-2.5 h-px bg-[var(--fg)] block" />
              <i className="w-2.5 h-px bg-[var(--fg)] block" />
              <i className="w-2.5 h-px bg-[var(--fg)] block" />
            </span>
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[var(--bg)] flex flex-col animate-slide-down">
          <div className="flex justify-between items-center px-5 h-[52px] border-b border-[var(--line)]">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="h-8 px-3.5 border border-[var(--line)] rounded-full font-mono text-[11px] uppercase tracking-wider"
            >
              Close
            </button>
          </div>
          <nav className="flex-1 flex flex-col px-5 py-2">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-5.5 border-b border-[var(--line)] flex justify-between items-baseline font-display text-[32px] font-medium tracking-tight"
              >
                {link.label}
                <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-widest">
                  §{String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>
          <div className="px-5 py-4.5 border-t border-[var(--line)] flex flex-col gap-3 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
            <div className="flex justify-between">
              <span>Theme</span>
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-[var(--fg)]">
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
