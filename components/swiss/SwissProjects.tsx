"use client";

import { useState } from "react";
import { PROJECTS } from "@/constants/portfolio";

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
          Three companies. Same playbook:{" "}
          <em className="italic font-[family-name:var(--font-newsreader)] font-normal">build</em>, ship, listen, repeat.
        </h2>
      </div>

      <div className="border-t border-[var(--line)]">
        {PROJECTS.map((project, i) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onMouseMove={handleMouseMove}
            className="group relative flex cursor-pointer flex-col gap-4 border-b border-[var(--line)] px-0 py-5 transition-colors hover:bg-[var(--tint)] lg:grid lg:grid-cols-[60px_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.7fr)_90px] lg:items-center lg:gap-x-6 lg:gap-y-0 lg:py-[22px]"
          >
            <div className="flex min-w-0 items-start justify-between gap-3 lg:contents">
              <span className="shrink-0 font-mono text-xs tabular-nums text-[var(--muted)] lg:col-start-1 lg:row-start-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 font-[family-name:var(--font-display)] text-[clamp(1.25rem,5.2vw,1.875rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)] lg:col-start-2 lg:row-start-1 lg:flex-none lg:text-[clamp(22px,2.6vw,32px)]">
                {project.name}
              </span>
              <span
                className="flex size-9 shrink-0 items-center justify-center self-start rounded-full border border-[var(--line)] transition-all group-hover:border-[var(--fg)] group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] lg:col-start-5 lg:row-start-1 lg:justify-self-end"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </div>
            <span className="text-sm leading-relaxed text-[var(--muted)] lg:col-start-3 lg:row-start-1 lg:max-w-[360px] lg:text-[14px] lg:leading-[1.5]">
              {project.description}
            </span>
            <span className="flex flex-col gap-1 lg:col-start-4 lg:row-start-1">
              <span className="text-[13px] text-[var(--fg)]">{project.role}</span>
              <span className="font-mono text-[11px] text-[var(--muted)]">{project.year}</span>
            </span>
          </a>
        ))}
      </div>

      {/* Hover preview (desktop only) */}
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
                background: `linear-gradient(135deg, ${PROJECTS.find((p) => p.id === hoveredProject)?.color} 0%, color-mix(in oklab, ${PROJECTS.find((p) => p.id === hoveredProject)?.color} 60%, #000) 100%)`,
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
                {PROJECTS.find((p) => p.id === hoveredProject)?.glyph}
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
              <span>{PROJECTS.find((p) => p.id === hoveredProject)?.name}</span>
              <span>↗ visit</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
