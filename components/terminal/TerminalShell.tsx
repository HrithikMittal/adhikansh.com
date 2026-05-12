"use client";

import { useCallback, useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { TerminalHeroBody } from "./TerminalHero";
import { TerminalAboutBody } from "./TerminalAbout";
import { TerminalProjectsBody } from "./TerminalProjects";
import { TerminalLabBody } from "./TerminalLab";
import { TerminalWritingArchiveOnly } from "./TerminalWriting";
import { TerminalContactBody } from "./TerminalContact";
import TerminalStatusBar from "./TerminalStatusBar";
import { PacManGame, type PacManExitPayload } from "./PacManGame";
import { PacManFrozen } from "./PacManFrozen";

type HistoryEntry = { id: string; command: string; output: ReactNode };

function PacGameHistorySummary({ payload }: { payload: PacManExitPayload }) {
  return (
    <div className="space-y-2">
      <p className="m-0 font-mono text-[12px] leading-relaxed text-[#9c9c95]">
        Session ended — score <span className="text-[#ffe24a]">{payload.score}</span>, lives{" "}
        <span className="text-[#5be3a3]">{payload.lives}</span>, dots left{" "}
        <span className="text-[#e6e6e0]">{payload.dotsRemaining}</span>. Maze{" "}
        <span className="text-[#e6e6e0]">{payload.mazeName}</span> · tick{" "}
        <span className="text-[#e6e6e0]">{payload.tickMs}ms</span>
      </p>
      <PacManFrozen snapshot={payload.snapshot} cell={12} />
      <p className="m-0 font-mono text-[10px] text-[#5b5b56]">Board frozen when you left the game.</p>
    </div>
  );
}

function HistoryCommandLine({ command }: { command: string }) {
  return (
    <div className="py-1 text-[13px] leading-snug">
      <span className="text-[#5be3a3]">adhi</span>
      <span className="text-[#5b5b56]"> @ </span>
      <span className="text-[#a78bff]">coral</span>
      <span className="text-[#ff6b4a]"> ~ </span>
      <span className="text-[#5b5b56]">$ </span>
      <span className="text-[#e6e6e0]">{command}</span>
    </div>
  );
}

const HELP_COMMAND_ROWS: { cmd: string; desc: string }[] = [
  { cmd: "whoami", desc: "intro & current focus" },
  { cmd: "about", desc: "background & stack" },
  { cmd: "projects", desc: "shipped work (aliases: ls, portfolio)" },
  { cmd: "lab", desc: "ideas & experiments (alias: ideas)" },
  { cmd: "writing", desc: "Medium archive only" },
  { cmd: "contact", desc: "email & social (aliases: ping, mail)" },
  {
    cmd: "game",
    desc: "fullscreen Pac-Man; exit saves the board to scrollback (alias: play)",
  },
  { cmd: "help", desc: "this list (aliases: ?, h)" },
  { cmd: "clear", desc: "clear the screen" },
];

const HELP_OUTPUT = (
  <div className="m-0 max-w-full font-mono text-[12px] leading-relaxed text-[#9c9c95]">
    <p className="mb-2.5 mt-0 text-[11px] font-medium uppercase tracking-wide text-[#7a7a72] sm:text-[12px]">
      Commands
    </p>
    <ul className="m-0 list-none space-y-2.5 p-0 sm:space-y-2">
      {HELP_COMMAND_ROWS.map((row) => (
        <li
          key={row.cmd}
          className="grid max-w-full grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] sm:items-start"
        >
          <span className="shrink-0 font-medium text-[#5be3a3]">{row.cmd}</span>
          <span className="min-w-0 break-words text-[#b5b5ae]">{row.desc}</span>
        </li>
      ))}
    </ul>
    <p className="mb-0 mt-3 border-t border-white/[0.08] pt-2.5 text-[11px] leading-snug text-[#6b6b66]">
      On smaller screens, use the command menu below the prompt instead of typing.
    </p>
  </div>
);

/** Shown in <select> below lg — values are sent as the shell command line. */
const MOBILE_COMMAND_OPTIONS: { value: string; label: string }[] = [
  { value: "help", label: "help — list commands" },
  { value: "whoami", label: "whoami — intro & focus" },
  { value: "about", label: "about — stack & background" },
  { value: "projects", label: "projects — shipped work" },
  { value: "lab", label: "lab — ideas & experiments" },
  { value: "writing", label: "writing — Medium archive" },
  { value: "contact", label: "contact — email & social" },
  { value: "game", label: "game — Pac-Man (fullscreen)" },
  { value: "clear", label: "clear — clear the screen" },
  { value: "exit", label: "exit — mode tip" },
];

function normalizeCommand(raw: string): string {
  const t = raw.trim().toLowerCase();
  if (!t) return "";
  const first = t.split(/\s+/)[0] ?? "";

  const aliases: Record<string, string> = {
    "?": "help",
    h: "help",
    ls: "projects",
    portfolio: "projects",
    ideas: "lab",
    ping: "contact",
    mail: "contact",
    play: "game",
  };

  if (aliases[first]) return aliases[first];
  if (first === "cat" && t.includes("about")) return "about";
  return first;
}

function focusShellControl(mobileSelect: HTMLSelectElement | null, input: HTMLInputElement | null) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(max-width: 1023px)").matches) {
    mobileSelect?.focus();
  } else {
    input?.focus();
  }
}

function renderOutput(raw: string): ReactNode {
  const cmd = normalizeCommand(raw);
  switch (cmd) {
    case "help":
      return HELP_OUTPUT;
    case "clear":
      return null;
    case "whoami":
      return <TerminalHeroBody />;
    case "about":
      return <TerminalAboutBody />;
    case "projects":
      return <TerminalProjectsBody />;
    case "lab":
      return <TerminalLabBody />;
    case "writing":
      return <TerminalWritingArchiveOnly />;
    case "contact":
      return <TerminalContactBody />;
    case "exit":
      return (
        <p className="m-0 text-[12px] text-[#5b5b56]">
          There is nothing to exit here — switch mode from the bar at the bottom of the page.
        </p>
      );
    default:
      return (
        <p className="m-0 font-mono text-[13px] text-[#ff6b4a]">
          zsh: command not found: <span className="text-[#e6e6e0]">{raw.trim() || "(empty)"}</span>
        </p>
      );
  }
}

export default function TerminalShell() {
  const uid = useId();
  const [gameOpen, setGameOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(() => [
    {
      id: `${uid}-init`,
      command: "?",
      output: HELP_OUTPUT,
    },
  ]);
  const [line, setLine] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileSelectRef = useRef<HTMLSelectElement>(null);
  const preGameHistoryRef = useRef<HistoryEntry[]>([]);

  const finishGame = useCallback(
    (payload: PacManExitPayload) => {
      setGameOpen(false);
      setHistory([
        ...preGameHistoryRef.current,
        {
          id: `${uid}-game-${Date.now()}`,
          command: "game",
          output: <PacGameHistorySummary payload={payload} />,
        },
      ]);
      queueMicrotask(() => focusShellControl(mobileSelectRef.current, inputRef.current));
    },
    [uid],
  );

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom, gameOpen]);

  useEffect(() => {
    queueMicrotask(() => focusShellControl(mobileSelectRef.current, inputRef.current));
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const cmdKey = normalizeCommand(trimmed);
      if (cmdKey === "clear") {
        if (gameOpen) setGameOpen(false);
        setHistory([]);
        queueMicrotask(() => focusShellControl(mobileSelectRef.current, inputRef.current));
        return;
      }

      if (cmdKey === "game") {
        setHistory((h) => {
          preGameHistoryRef.current = h;
          return [];
        });
        setGameOpen(true);
        return;
      }

      const output = renderOutput(trimmed);
      setHistory((h) => [
        ...h,
        {
          id: `${uid}-${Date.now()}-${h.length}`,
          command: trimmed,
          output,
        },
      ]);
      queueMicrotask(() => focusShellControl(mobileSelectRef.current, inputRef.current));
    },
    [uid, gameOpen],
  );

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = line.trim();
      setLine("");
      runCommand(trimmed);
    },
    [line, runCommand],
  );

  const onMobileCommandChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (!value) return;
      runCommand(value);
      e.target.selectedIndex = 0;
    },
    [runCommand],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {gameOpen ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <PacManGame fullTerminal defaultTickMs={340} onExit={finishGame} />
        </div>
      ) : (
        <>
          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 text-[13px] leading-relaxed [scrollbar-color:rgba(255,255,255,0.12)_transparent]"
          >
            {history.map((entry) => (
              <div key={entry.id} className="mb-4 last:mb-0">
                <HistoryCommandLine command={entry.command} />
                {entry.output ? <div className="border-l border-white/[0.08] pl-3.5 pt-2">{entry.output}</div> : null}
              </div>
            ))}
          </div>

          <form
            onSubmit={submit}
            className="mt-3 shrink-0 border-t border-white/[0.08] bg-black/20 px-1 py-3 sm:px-0"
          >
            <label htmlFor="terminal-shell-input" className="sr-only">
              Terminal command
            </label>
            <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-2 lg:gap-y-1">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
                <span className="select-none text-[#5be3a3]">adhi</span>
                <span className="select-none text-[#5b5b56]">@</span>
                <span className="select-none text-[#a78bff]">coral</span>
                <span className="select-none text-[#ff6b4a]">~</span>
                <span className="select-none text-[#5b5b56]">$</span>
              </div>
              <select
                id="terminal-shell-mobile-commands"
                ref={mobileSelectRef}
                defaultValue=""
                aria-label="Choose a terminal command"
                onChange={onMobileCommandChange}
                className="w-full min-w-0 rounded-md border border-white/[0.14] bg-[#101014] px-2.5 py-2.5 font-mono text-[13px] text-[#e6e6e0] outline-none lg:hidden"
              >
                <option value="" disabled>
                  Choose a command…
                </option>
                {MOBILE_COMMAND_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                id="terminal-shell-input"
                ref={inputRef}
                type="text"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="hidden min-h-0 min-w-0 flex-1 bg-transparent font-mono text-[13px] text-[#e6e6e0] outline-none placeholder:text-[#5b5b56] lg:block lg:min-w-[12rem]"
                placeholder="type a command…"
              />
            </div>
          </form>
        </>
      )}

      <div className="mt-2 shrink-0">
        <TerminalStatusBar />
      </div>
    </div>
  );
}
