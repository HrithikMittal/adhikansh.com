"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
} from "react";
import type { Cell } from "./pacManMazes";
import { PAC_MAZE_PRESETS, parseMazePreset } from "./pacManMazes";
import { renderPacManToCanvas, type PacManFrozenSnapshot } from "./pacManRender";

const DEFAULT_TICK_MS = 320;
const BASE_SCARE_TICKS = 55;
const BASE_TICK_MS = 165;

type Dir = 0 | 1 | 2 | 3;

const DY: number[] = [-1, 0, 1, 0];
const DX: number[] = [0, 1, 0, -1];

function usePacSounds() {
  const ctxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(false);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    return ctxRef.current;
  }, []);

  const tone = useCallback(
    (freq: number, dur: number, vol = 0.06, type: OscillatorType = "square") => {
      if (mutedRef.current) return;
      const ctx = getCtx();
      if (!ctx || ctx.state === "closed") return;
      const t0 = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + dur + 0.02);
    },
    [getCtx],
  );

  const resume = useCallback(async () => {
    const ctx = getCtx();
    if (ctx?.state === "suspended") await ctx.resume();
  }, [getCtx]);

  return useMemo(
    () => ({
      resume,
      setMuted(m: boolean) {
        mutedRef.current = m;
      },
      playEat() {
        tone(880, 0.04, 0.05);
      },
      playPower() {
        tone(220, 0.08, 0.07, "triangle");
        setTimeout(() => tone(330, 0.08, 0.06, "triangle"), 90);
      },
      playGhostEat() {
        tone(1200, 0.06, 0.05);
        setTimeout(() => tone(1600, 0.08, 0.04), 70);
      },
      playDeath() {
        [440, 330, 220, 165].forEach((f, i) => setTimeout(() => tone(f, 0.15, 0.07), i * 120));
      },
      playWin() {
        [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.12, 0.06), i * 100));
      },
      playStart() {
        tone(392, 0.1, 0.05);
        setTimeout(() => tone(523, 0.12, 0.055), 100);
      },
    }),
    [resume, tone],
  );
}

type Ghost = { r: number; c: number; dir: Dir; scared: number };

type GameRef = {
  grid: Cell[][];
  pac: { r: number; c: number; dir: Dir; want: Dir };
  startPac: { r: number; c: number };
  ghosts: Ghost[];
  powerUntil: number;
  tick: number;
  running: boolean;
  dotsLeft: number;
  ghostHome: { r: number; c: number }[];
};

export type PacManExitPayload = {
  snapshot: PacManFrozenSnapshot;
  score: number;
  lives: number;
  dotsRemaining: number;
  tickMs: number;
  mazeName: string;
};

export type PacManGameProps = {
  fullTerminal?: boolean;
  /** Initial tick interval in ms; user can change while playing. */
  defaultTickMs?: number;
  onExit?: (payload: PacManExitPayload) => void;
};

function readGame(ref: MutableRefObject<GameRef | null>) {
  return ref.current;
}

function gameToSnapshot(g: GameRef): PacManFrozenSnapshot {
  return {
    grid: g.grid.map((row) => [...row]),
    pac: { r: g.pac.r, c: g.pac.c, dir: g.pac.dir },
    ghosts: g.ghosts.map((gh) => ({
      r: gh.r,
      c: gh.c,
      dir: gh.dir,
      scared: gh.scared > g.tick,
    })),
    tick: g.tick,
  };
}

export function PacManGame({ fullTerminal = false, defaultTickMs = DEFAULT_TICK_MS, onExit }: PacManGameProps) {
  const cell = fullTerminal ? 18 : 14;
  const [mazeIndex, setMazeIndex] = useState(0);
  const [tickMs, setTickMs] = useState(defaultTickMs);
  const scareTicks = Math.max(20, Math.round((BASE_SCARE_TICKS * BASE_TICK_MS) / tickMs));

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const sounds = usePacSounds();
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [overlay, setOverlay] = useState<string | null>(null);

  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  const gameRef = useRef<GameRef | null>(null);

  const initGame = useCallback(() => {
    const { grid, pac, ghosts } = parseMazePreset(mazeIndex);
    let dots = 0;
    for (const row of grid) for (const c of row) if (c === "dot" || c === "power") dots++;
    const ghostHome = ghosts.map((g) => ({ ...g }));
    gameRef.current = {
      grid: grid.map((row) => [...row]),
      pac: { ...pac, dir: 1, want: 1 },
      startPac: { r: pac.r, c: pac.c },
      ghosts: ghosts.map((g, i) => ({
        r: g.r,
        c: g.c,
        dir: ([1, 3, 0] as const)[i % 3],
        scared: 0,
      })),
      powerUntil: 0,
      tick: 0,
      running: true,
      dotsLeft: dots,
      ghostHome,
    };
    setScore(0);
    setLives(3);
    setOverlay(null);
  }, [mazeIndex]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const g = readGame(gameRef);
    if (!canvas || !g) return;
    renderPacManToCanvas(canvas, gameToSnapshot(g), cell);
  }, [cell]);

  const buildExitPayload = useCallback((): PacManExitPayload => {
    const g = readGame(gameRef);
    if (!g) {
      const { grid, pac, ghosts } = parseMazePreset(mazeIndex);
      let dots = 0;
      for (const row of grid) for (const c of row) if (c === "dot" || c === "power") dots++;
      const stub: GameRef = {
        grid: grid.map((row) => [...row]),
        pac: { ...pac, dir: 1, want: 1 },
        startPac: { r: pac.r, c: pac.c },
        ghosts: ghosts.map((gh, i) => ({
          r: gh.r,
          c: gh.c,
          dir: ([1, 3, 0] as const)[i % 3],
          scared: 0,
        })),
        powerUntil: 0,
        tick: 0,
        running: false,
        dotsLeft: dots,
        ghostHome: ghosts.map((x) => ({ ...x })),
      };
      return {
        snapshot: gameToSnapshot(stub),
        score: scoreRef.current,
        lives: livesRef.current,
        dotsRemaining: dots,
        tickMs,
        mazeName: PAC_MAZE_PRESETS[mazeIndex]?.name ?? "Maze",
      };
    }
    return {
      snapshot: gameToSnapshot(g),
      score: scoreRef.current,
      lives: livesRef.current,
      dotsRemaining: g.dotsLeft,
      tickMs,
      mazeName: PAC_MAZE_PRESETS[mazeIndex]?.name ?? "Maze",
    };
  }, [mazeIndex, tickMs]);

  useEffect(() => {
    if (!fullTerminal) return;
    queueMicrotask(() => gameAreaRef.current?.focus());
  }, [fullTerminal]);

  useEffect(() => {
    initGame();
    queueMicrotask(() => draw());
  }, [initGame, draw]);

  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => {
      const game = readGame(gameRef);
      if (!game || !game.running) return;
      const { grid, pac, ghosts } = game;
      const rows = grid.length;
      const cols = grid[0]?.length ?? 0;

      const can = (r: number, c: number, d: Dir) => {
        const nr = r + DY[d];
        let nc = c + DX[d];
        if (nr < 0 || nr >= rows) return false;
        if (nc < 0) nc = cols - 1;
        if (nc >= cols) nc = 0;
        return grid[nr]?.[nc] !== "wall";
      };

      if (can(pac.r, pac.c, pac.want)) pac.dir = pac.want;
      if (can(pac.r, pac.c, pac.dir)) {
        pac.r += DY[pac.dir];
        let nc = pac.c + DX[pac.dir];
        if (nc < 0) nc = cols - 1;
        if (nc >= cols) nc = 0;
        pac.c = nc;
      }

      const here = grid[pac.r]?.[pac.c];
      if (here === "dot") {
        grid[pac.r]![pac.c] = "empty";
        game.dotsLeft -= 1;
        setScore((s) => s + 10);
        sounds.playEat();
      } else if (here === "power") {
        grid[pac.r]![pac.c] = "empty";
        game.dotsLeft -= 1;
        game.powerUntil = game.tick + scareTicks;
        for (const gh of ghosts) gh.scared = game.powerUntil;
        setScore((s) => s + 50);
        sounds.playPower();
      }

      for (const gh of ghosts) {
        const dirs: Dir[] = [0, 1, 2, 3];
        const scared = gh.scared > game.tick;
        const opp = ((gh.dir + 2) % 4) as Dir;
        const valid = dirs.filter((d) => {
          if (!can(gh.r, gh.c, d)) return false;
          if (!scared && d === opp) return false;
          return true;
        });
        let pick: Dir = gh.dir;
        if (valid.length) {
          if (scared) {
            let worst = -1;
            for (const d of valid) {
              let nr = gh.r + DY[d];
              let nc = gh.c + DX[d];
              if (nc < 0) nc = cols - 1;
              if (nc >= cols) nc = 0;
              const dist = Math.abs(nr - pac.r) + Math.abs(nc - pac.c);
              if (dist > worst) {
                worst = dist;
                pick = d;
              }
            }
          } else {
            let best = Infinity;
            for (const d of valid) {
              let nr = gh.r + DY[d];
              let nc = gh.c + DX[d];
              if (nc < 0) nc = cols - 1;
              if (nc >= cols) nc = 0;
              const dist = Math.abs(nr - pac.r) + Math.abs(nc - pac.c);
              if (dist < best) {
                best = dist;
                pick = d;
              }
            }
          }
        } else {
          const any = dirs.filter((d) => can(gh.r, gh.c, d));
          if (any.length) pick = any[Math.floor(Math.random() * any.length)]!;
        }
        gh.dir = pick;
        if (can(gh.r, gh.c, gh.dir)) {
          gh.r += DY[gh.dir];
          let nc = gh.c + DX[gh.dir];
          if (nc < 0) nc = cols - 1;
          if (nc >= cols) nc = 0;
          gh.c = nc;
        }
      }

      for (let i = 0; i < ghosts.length; i++) {
        const gh = ghosts[i]!;
        if (pac.r !== gh.r || pac.c !== gh.c) continue;
        if (gh.scared > game.tick) {
          const home = game.ghostHome[i] ?? game.ghostHome[0] ?? { r: 5, c: 12 };
          gh.r = home.r;
          gh.c = home.c;
          gh.scared = 0;
          setScore((s) => s + 200);
          sounds.playGhostEat();
        } else {
          sounds.playDeath();
          setLives((lv) => {
            const n = lv - 1;
            if (n <= 0) {
              game.running = false;
              setOverlay(
                fullTerminal
                  ? "Game over — Restart, Esc / Exit to shell (session is saved in scrollback)."
                  : "Game over — type `game` again to retry.",
              );
            } else {
              pac.r = game.startPac.r;
              pac.c = game.startPac.c;
              pac.dir = 1;
              pac.want = 1;
            }
            return n;
          });
        }
        break;
      }

      game.tick += 1;
      if (game.dotsLeft <= 0) {
        game.running = false;
        sounds.playWin();
        setOverlay(
          fullTerminal
            ? "You cleared the maze! Esc / Exit saves this board to scrollback."
            : "You cleared the maze!",
        );
      }
      draw();
    }, tickMs);
    return () => window.clearInterval(id);
  }, [started, draw, tickMs, scareTicks, sounds, fullTerminal]);

  useEffect(() => {
    sounds.setMuted(muted);
  }, [muted, sounds]);

  useEffect(() => {
    if (!fullTerminal || !onExit) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit(buildExitPayload());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullTerminal, onExit, buildExitPayload]);

  const handleGameKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const game = readGame(gameRef);
      if (!game || !started) return;
      const map: Record<string, Dir> = {
        ArrowUp: 0,
        ArrowRight: 1,
        ArrowDown: 2,
        ArrowLeft: 3,
        w: 0,
        d: 1,
        s: 2,
        a: 3,
      };
      const d = map[e.key];
      if (d === undefined) return;
      e.preventDefault();
      game.pac.want = d;
    },
    [started],
  );

  const begin = useCallback(async () => {
    await sounds.resume();
    sounds.playStart();
    initGame();
    const g = readGame(gameRef);
    if (g) g.running = true;
    setStarted(true);
    queueMicrotask(() => {
      draw();
      gameAreaRef.current?.focus();
    });
  }, [sounds, initGame, draw]);

  const preset = PAC_MAZE_PRESETS[mazeIndex];
  const rows = preset?.lines.length ?? 17;
  const cols = preset?.lines[0]?.length ?? 23;
  const w = cols * cell;
  const h = rows * cell;

  const shellHint = fullTerminal
    ? "Change maze & speed before Start. After Start, panel is focused — Esc / Exit to shell saves the board below."
    : "After Start, this panel is focused for controls. Arrows or WASD to move.";

  return (
    <div
      className={
        fullTerminal
          ? "flex min-h-0 flex-1 flex-col bg-[#050508]"
          : "rounded-md border border-white/[0.12] bg-[#050508] p-3"
      }
    >
      <div
        className={
          fullTerminal
            ? "mb-2 flex shrink-0 flex-col gap-2 border-b border-white/[0.08] px-1 pb-2 font-mono text-[11px] text-[#9c9c95] sm:px-0"
            : "mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#9c9c95]"
        }
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>
            Score <span className="text-[#ffe24a]">{score}</span> · Lives{" "}
            <span className="text-[#5be3a3]">{lives}</span>
          </span>
          {fullTerminal ? (
            <>
              <label className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#6b6b66]">Maze</span>
                <select
                  value={mazeIndex}
                  disabled={started}
                  onChange={(e) => setMazeIndex(Number(e.target.value))}
                  className="max-w-[11rem] rounded border border-white/[0.15] bg-[#0e0e12] px-1.5 py-0.5 text-[11px] text-[#e6e6e0] disabled:opacity-50"
                >
                  {PAC_MAZE_PRESETS.map((p, i) => (
                    <option key={p.id} value={i}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#6b6b66]">Speed</span>
                <input
                  type="range"
                  min={120}
                  max={520}
                  step={10}
                  value={tickMs}
                  onChange={(e) => setTickMs(Number(e.target.value))}
                  className="w-[min(160px,40vw)] accent-[#5be3a3]"
                  aria-label="Game speed in milliseconds per tick"
                />
                <span className="tabular-nums text-[#e6e6e0]">{tickMs}ms</span>
                <span className="hidden text-[#5b5b56] sm:inline">(higher = slower)</span>
              </label>
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onExit ? (
            <button
              type="button"
              onClick={() => onExit(buildExitPayload())}
              className="rounded border border-[#ff6b4a]/35 bg-[#ff6b4a]/10 px-2 py-0.5 text-[#ff6b4a] hover:bg-[#ff6b4a]/18"
            >
              Exit to shell
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="rounded border border-white/[0.15] px-2 py-0.5 text-[#e6e6e0] hover:bg-white/[0.06]"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
          {!started ? (
            <button
              type="button"
              onClick={begin}
              className="rounded border border-[#5be3a3]/40 bg-[#5be3a3]/10 px-2 py-0.5 text-[#5be3a3] hover:bg-[#5be3a3]/20"
            >
              Start (enables sound)
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                initGame();
                const g = readGame(gameRef);
                if (g) g.running = true;
                setOverlay(null);
                queueMicrotask(() => {
                  draw();
                  gameAreaRef.current?.focus();
                });
              }}
              className="rounded border border-white/[0.15] px-2 py-0.5 text-[#e6e6e0] hover:bg-white/[0.06]"
            >
              Restart
            </button>
          )}
        </div>
      </div>
      <div
        ref={gameAreaRef}
        tabIndex={-1}
        onKeyDown={handleGameKeyDown}
        className={
          fullTerminal
            ? "flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#5be3a3]/35"
            : "overflow-x-auto rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#5be3a3]/35"
        }
      >
        <canvas
          ref={canvasRef}
          width={w}
          height={h}
          className={fullTerminal ? "mx-auto block max-h-full max-w-full" : "mx-auto block max-w-full"}
          style={{ imageRendering: "pixelated" }}
          aria-label="Pac-Man maze"
        />
      </div>
      <p
        className={
          fullTerminal
            ? "m-0 shrink-0 px-1 pt-2 font-mono text-[11px] leading-relaxed text-[#6b6b66] sm:px-0"
            : "mt-2 m-0 font-mono text-[11px] leading-relaxed text-[#6b6b66]"
        }
      >
        {shellHint}
      </p>
      {overlay ? (
        <p
          className={
            fullTerminal
              ? "m-0 shrink-0 px-1 pb-1 font-mono text-[12px] text-[#a78bff] sm:px-0"
              : "mt-1 m-0 font-mono text-[12px] text-[#a78bff]"
          }
        >
          {overlay}
        </p>
      ) : null}
    </div>
  );
}
