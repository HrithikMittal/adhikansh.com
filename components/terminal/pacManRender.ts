import type { Cell } from "./pacManMazes";

export type PacManDir = 0 | 1 | 2 | 3;

/** Immutable frame for history / frozen view */
export type PacManFrozenSnapshot = {
  grid: Cell[][];
  pac: { r: number; c: number; dir: PacManDir };
  ghosts: { r: number; c: number; dir: PacManDir; scared: boolean }[];
  tick: number;
};

export function renderPacManToCanvas(
  canvas: HTMLCanvasElement,
  snapshot: PacManFrozenSnapshot,
  cell: number,
): void {
  const ctx2 = canvas.getContext("2d");
  if (!ctx2) return;
  const rows = snapshot.grid.length;
  const cols = snapshot.grid[0]?.length ?? 0;
  const w = cols * cell;
  const h = rows * cell;
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  ctx2.fillStyle = "#0a0a0c";
  ctx2.fillRect(0, 0, w, h);
  ctx2.strokeStyle = "#3b5cff";
  ctx2.lineWidth = 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = snapshot.grid[r]?.[c];
      const x = c * cell;
      const y = r * cell;
      if (tile === "wall") {
        ctx2.fillStyle = "#1a1a22";
        ctx2.fillRect(x, y, cell, cell);
        ctx2.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
      } else if (tile === "dot") {
        ctx2.fillStyle = "#e6d4a8";
        ctx2.beginPath();
        ctx2.arc(x + cell / 2, y + cell / 2, Math.max(2, cell * 0.14), 0, Math.PI * 2);
        ctx2.fill();
      } else if (tile === "power") {
        ctx2.fillStyle = "#fff3c4";
        ctx2.beginPath();
        ctx2.arc(x + cell / 2, y + cell / 2, Math.max(4, cell * 0.35), 0, Math.PI * 2);
        ctx2.fill();
      }
    }
  }

  const mouth = (Math.sin(snapshot.tick * 0.45) * 0.35 + 0.35) * Math.PI;
  const pr = snapshot.pac.r * cell + cell / 2;
  const pc = snapshot.pac.c * cell + cell / 2;
  const mouthBases = [-Math.PI / 2, 0, Math.PI / 2, Math.PI] as const;
  const base = mouthBases[snapshot.pac.dir];
  ctx2.fillStyle = "#ffe24a";
  ctx2.beginPath();
  ctx2.arc(pc, pr, cell * 0.42, base + mouth, base - mouth + Math.PI * 2);
  ctx2.lineTo(pc, pr);
  ctx2.fill();

  for (const gh of snapshot.ghosts) {
    const gx = gh.c * cell + cell / 2;
    const gy = gh.r * cell + cell / 2;
    ctx2.fillStyle = gh.scared ? "#3b5cff" : "#ff6b9d";
    ctx2.beginPath();
    ctx2.arc(gx, gy - 1, cell * 0.38, Math.PI, 0);
    ctx2.lineTo(gx + cell * 0.38, gy + cell * 0.32);
    for (let i = 3; i >= 0; i--) {
      ctx2.lineTo(gx + cell * 0.38 - (i * cell * 0.19), gy + cell * 0.38);
    }
    ctx2.closePath();
    ctx2.fill();
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(gx - 4, gy - 4, 3, 3);
    ctx2.fillRect(gx + 1, gy - 4, 3, 3);
  }
}
