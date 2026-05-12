"use client";

import { PROJECTS_ORDERED } from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalProjects() {
  return (
    <div className="mt-11">
      <div className="flex items-center gap-3 my-4.5 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">02</span> Projects
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <Prompt command="ls -lah projects/" />
      <div className="flex flex-col gap-0">
        {PROJECTS_ORDERED.map((project, i) => (
          <div
            key={project.id}
            className="group relative flex cursor-pointer flex-col gap-3.5 border border-white/[0.08] border-t-0 px-4 py-5 transition-all first:rounded-t-lg first:border-t last:rounded-b-lg hover:border-[#b94e36] hover:bg-[rgba(255,107,74,0.05)] sm:px-5 sm:py-5.5 lg:grid lg:grid-cols-[52px_1fr_auto] lg:items-start lg:gap-x-[18px] lg:gap-y-0 lg:px-5 lg:py-5.5"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-0"
              aria-label={`Visit ${project.name}`}
            />
            <div className="pointer-events-none relative z-10 flex min-w-0 items-start justify-between gap-3 lg:contents">
              <span className="shrink-0 pt-0.5 font-mono text-[12px] tabular-nums text-[#ff6b4a] lg:col-start-1 lg:row-start-1 lg:pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex shrink-0 items-center gap-3 lg:col-start-3 lg:row-start-1 lg:flex-col lg:items-end lg:gap-2">
                <span className="text-right text-[11px] text-[#5b5b56]">{project.year}</span>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-[#9c9c95] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[#ff6b4a] group-hover:bg-[#ff6b4a] group-hover:text-black">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pointer-events-none relative z-10 min-w-0 lg:col-start-2 lg:row-start-1">
              <h3 className="text-[clamp(1.125rem,4.5vw,1.75rem)] font-bold tracking-[-0.02em] text-[#e6e6e0] lg:text-[clamp(20px,2.6vw,28px)]">
                {project.name}
              </h3>
              <span className="mt-1 block break-all text-[12px] font-medium text-[#a78bff]">
                → {project.url.replace("https://", "")}
              </span>
              <p className="mt-2.5 max-w-[560px] text-[13px] leading-relaxed text-[#9c9c95] lg:leading-[1.6]">
                {project.description}
              </p>
              {project.proofLinks && project.proofLinks.length > 0 ? (
                <p className="pointer-events-auto mt-2 max-w-[560px] text-[12px] leading-relaxed text-[#5be3a3]">
                  {project.proofLinks.map((pl, j) => (
                    <span key={pl.label}>
                      {j > 0 ? " · " : ""}
                      {pl.url ? (
                        <a href={pl.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#a78bff]">
                          {pl.label}
                        </a>
                      ) : (
                        <span className="text-[#5b5b56]">{pl.label}</span>
                      )}
                    </span>
                  ))}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded border border-white/[0.08] bg-white/[0.04] px-2 py-[3px] text-[10px] uppercase tracking-wider text-[#9c9c95]">
                  {project.role}
                </span>
              </div>
            </div>

            <div className="hidden lg:block absolute top-0 right-full mr-4.5 w-[220px] h-[140px] border border-white/[0.14] rounded-md bg-[#111116] opacity-0 translate-x-2 scale-[0.97] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all pointer-events-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[5]">
              <div className="h-[18px] border-b border-white/[0.08] flex items-center px-2 gap-1">
                <i className="w-1.5 h-1.5 rounded-full bg-[#5b5b56] block" />
                <i className="w-1.5 h-1.5 rounded-full bg-[#5b5b56] block" />
                <i className="w-1.5 h-1.5 rounded-full bg-[#5b5b56] block" />
              </div>
              <div className="px-3 py-3 h-[calc(100%-18px)] flex flex-col justify-between bg-[#111116]">
                <div className="text-[36px] font-extrabold tracking-[-0.04em]" style={{ color: project.color }}>
                  {project.glyph}
                </div>
                <div className="text-[10px] text-[#5b5b56] uppercase tracking-wider">
                  {project.name} · {project.year}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
