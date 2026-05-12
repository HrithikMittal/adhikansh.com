"use client";

import { useLayoutEffect, useRef } from "react";
import { renderPacManToCanvas, type PacManFrozenSnapshot } from "./pacManRender";

type PacManFrozenProps = {
  snapshot: PacManFrozenSnapshot;
  /** Pixel cell size for canvas (smaller fits history comfortably). */
  cell?: number;
};

export function PacManFrozen({ snapshot, cell = 12 }: PacManFrozenProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    renderPacManToCanvas(canvas, snapshot, cell);
  }, [snapshot, cell]);

  const cols = snapshot.grid[0]?.length ?? 0;
  const rows = snapshot.grid.length;
  const w = cols * cell;
  const h = rows * cell;

  return (
    <div className="overflow-x-auto rounded border border-white/[0.1] bg-[#050508] p-2">
      <canvas
        ref={ref}
        width={w}
        height={h}
        className="mx-auto block max-w-full"
        style={{ imageRendering: "pixelated" }}
        aria-label="Pac-Man session snapshot"
      />
    </div>
  );
}
