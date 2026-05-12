import { ABOUT, PERSONAL_INFO } from "@/constants/portfolio";
import Prompt from "./Prompt";

export function TerminalHeroBody() {
  const meta = [
    { key: "Role", value: PERSONAL_INFO.primaryRole },
    { key: "Location", value: PERSONAL_INFO.location },
    { key: "Status", value: PERSONAL_INFO.status, live: true },
    { key: "Stack", value: ABOUT.stack.stack },
  ] as const;

  return (
    <>
      <div className="text-[clamp(34px,8vw,84px)] leading-none font-bold tracking-[-0.04em] my-5.5">
        <span className="bg-gradient-to-r from-[#ff6b4a] to-[#a78bff] bg-clip-text text-transparent">
          {PERSONAL_INFO.name.split(" ")[0]}
        </span>
        <br />
        <span className="text-[#ff6b4a]">&</span> {PERSONAL_INFO.name.split(" ")[1]}
      </div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-[#5b5b56] mb-2">{PERSONAL_INFO.primaryRole}</p>
      <div className="text-[clamp(14px,1.4vw,16px)] text-[#9c9c95] mt-2 max-w-[720px] leading-relaxed">
        {PERSONAL_INFO.tagline}
      </div>

      <div className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/[0.1] bg-white/[0.1] sm:grid-cols-2 lg:grid-cols-4">
        {meta.map((item) => (
          <div key={item.key} className="min-w-0 bg-[#111116] px-3.5 py-3 sm:px-4 sm:py-3.5">
            <div className="text-[10px] text-[#5b5b56] uppercase tracking-[0.12em]">{item.key}</div>
            <div className="mt-1 flex items-start gap-1.5 text-[13px] leading-snug text-[#e6e6e0]">
              {"live" in item && item.live && (
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-[#5be3a3] shadow-[0_0_0_0_rgba(91,227,163,0.5)]" />
              )}
              <span className="min-w-0 break-words">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function TerminalHero() {
  return (
    <div>
      <Prompt command="whoami" />
      <TerminalHeroBody />
    </div>
  );
}
