"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { TerminalHeroBody } from "./TerminalHero";
import { TerminalAboutBody } from "./TerminalAbout";
import { TerminalProjectsBody } from "./TerminalProjects";
import { TerminalLabBody } from "./TerminalLab";
import { TerminalWritingArchiveOnly } from "./TerminalWriting";
import { TerminalContactBody } from "./TerminalContact";
import TerminalStatusBar from "./TerminalStatusBar";

type HistoryEntry = { id: string; command: string; output: ReactNode };

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

const HELP_OUTPUT = (
  <pre className="m-0 whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[#9c9c95]">
    {`Commands:
  whoami      intro & current focus
  about       background & stack
  projects    shipped work (aliases: ls, portfolio)
  lab         ideas & experiments (alias: ideas)
  writing     Medium archive only
  contact     email & social (aliases: ping, mail)
  help        this list (aliases: ?, h)
  clear       clear the screen`}
  </pre>
);

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
  };

  if (aliases[first]) return aliases[first];
  if (first === "cat" && t.includes("about")) return "about";
  return first;
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

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const raw = line;
      const trimmed = raw.trim();
      setLine("");
      if (!trimmed) return;

      const cmdKey = normalizeCommand(trimmed);
      if (cmdKey === "clear") {
        setHistory([]);
        queueMicrotask(() => inputRef.current?.focus());
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
      queueMicrotask(() => inputRef.current?.focus());
    },
    [line, uid],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          <span className="select-none text-[#5be3a3]">adhi</span>
          <span className="select-none text-[#5b5b56]">@</span>
          <span className="select-none text-[#a78bff]">coral</span>
          <span className="select-none text-[#ff6b4a]">~</span>
          <span className="select-none text-[#5b5b56]">$</span>
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
            className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-[#e6e6e0] outline-none placeholder:text-[#5b5b56] sm:min-w-[12rem]"
            placeholder="type a command…"
          />
        </div>
      </form>

      <div className="mt-2 shrink-0">
        <TerminalStatusBar />
      </div>
    </div>
  );
}
