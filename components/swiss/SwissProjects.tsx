"use client";

import { useState } from "react";
import { PROJECTS_ORDERED } from "@/constants/portfolio";

export default function SwissProjects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="py-20 md:py-14 sm:py-11 border-b border-[var(--line)]" id="work">
      <div className="grid grid-cols-[200px_1fr] gap-10 mb-10 items-start max-[820px]:grid-cols-1 max-[820px]:gap-[18px] max-[820px]:mb-7">
        <div className="flex gap-3.5 items-start">
          <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider leading-none">
            § 02
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)] leading-none">Selected work</span>
        </div>
        <h2 className="text-[clamp(22px,2.4vw,28px)] font-medium tracking-[-0.02em] max-w-[720px] m-0 leading-none [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          One flagship bet, two{" "}
          <em className="italic font-[family-name:var(--font-newsreader)] font-normal">shipped</em> side quests — each
          with something running in production.
        </h2>
      </div>

      <div className="border-t border-[var(--line)]">
        {PROJECTS_ORDERED.map((project, i) => (
          <div
            key={project.id}
            className="group relative isolate flex flex-col gap-4 border-b border-[var(--line)] px-0 py-5 transition-colors before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:z-[-1] before:w-screen before:-translate-x-1/2 before:bg-transparent before:transition-colors hover:before:bg-[var(--tint)] lg:grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-x-10 lg:gap-y-0 lg:py-[22px]"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onMouseMove={handleMouseMove}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-0"
              aria-label={`Visit ${project.name}`}
            />
            {/* Left rail: same rhythm as § 02 + Selected work */}
            <div className="relative z-10 flex min-w-0 items-start justify-between gap-3 lg:col-start-1 lg:row-start-1 lg:justify-start lg:gap-3.5">
              <div className="flex min-w-0 items-start gap-3.5">
                <span className="shrink-0 pt-0.5 font-mono text-[11px] tabular-nums uppercase tracking-wider text-[var(--muted)] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 font-[family-name:var(--font-display)] text-[clamp(1.25rem,5.2vw,1.875rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)] lg:text-[clamp(22px,2.6vw,32px)]">
                  {project.name}
                </span>
              </div>
              <span
                className="flex size-9 shrink-0 items-center justify-center self-start rounded-full border border-[var(--line)] transition-all group-hover:border-[var(--fg)] group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] lg:hidden"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </div>

            {/* Right column: aligns with section headline (max-w matches h2) */}
            <div className="relative z-10 min-w-0 max-w-[720px] lg:col-start-2 lg:row-start-1">
              <div className="pointer-events-none flex flex-col gap-2 text-sm leading-relaxed text-[var(--muted)] lg:text-[14px] lg:leading-[1.5]">
                <span>{project.description}</span>
                {project.proofLinks && project.proofLinks.length > 0 ? (
                  <span className="pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-[var(--fg)]/80">
                    {project.proofLinks.map((pl) =>
                      pl.url ? (
                        <a
                          key={pl.label}
                          href={pl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-b border-[var(--line-strong)] hover:text-[var(--fg)]"
                        >
                          {pl.label}
                        </a>
                      ) : (
                        <span
                          key={pl.label}
                          className="text-[12px] font-sans normal-case tracking-normal text-[var(--muted)]"
                        >
                          {pl.label}
                        </span>
                      ),
                    )}
                  </span>
                ) : null}
              </div>
              <div className="pointer-events-none mt-3 flex items-start justify-between gap-4 lg:mt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] text-[var(--fg)]">{project.role}</span>
                  <span className="font-mono text-[11px] text-[var(--muted)]">{project.year}</span>
                </div>
                <span
                  className="pointer-events-none hidden size-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] transition-all group-hover:border-[var(--fg)] group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] lg:flex"
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hoveredProject && (
        <div
          style={{
            position: "fixed",
            pointerEvents: "none",
            width: "360px",
            height: "240px",
            borderRadius: "8px",
            overflow: "hidden",
            zIndex: 60,
            left: mousePos.x + 240,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.18), 0 0 0 1px var(--line)",
          }}
          className="hidden lg:block"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              background: "var(--bg)",
              color: "var(--fg)",
            }}
          >
            <div
              style={{
                flex: 1,
                position: "relative",
                overflow: "hidden",
                background: `linear-gradient(135deg, ${PROJECTS_ORDERED.find((p) => p.id === hoveredProject)?.color} 0%, color-mix(in oklab, ${PROJECTS_ORDERED.find((p) => p.id === hoveredProject)?.color} 60%, #000) 100%)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "repeating-linear-gradient(45deg, transparent 0 14px, rgba(255,255,255,0.06) 14px 15px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "96px",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.15)",
                }}
              >
                {PROJECTS_ORDERED.find((p) => p.id === hoveredProject)?.glyph}
              </div>
            </div>
            <div
              style={{
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--line)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              <span>{PROJECTS_ORDERED.find((p) => p.id === hoveredProject)?.name}</span>
              <span>↗ visit</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
