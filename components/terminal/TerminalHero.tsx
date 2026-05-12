import { PERSONAL_INFO } from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalHero() {
  return (
    <div>
      <Prompt command="whoami" />
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

      <div className="grid grid-cols-4 md:grid-cols-2 gap-0 mt-7 border border-white/[0.08] rounded-md overflow-hidden">
        {[
          { key: "Role", value: PERSONAL_INFO.primaryRole },
          { key: "Location", value: PERSONAL_INFO.location },
          { key: "Status", value: PERSONAL_INFO.status, live: true },
          { key: "Stack", value: "TS · PY · PG" },
        ].map((item) => (
          <div
            key={item.key}
            className={`px-3.5 py-3 border-r border-white/[0.08] last:border-r-0 md:nth-child(2n):border-r-0 md:nth-child(-n+2):border-b md:border-b-white/[0.08]`}
          >
            <div className="text-[10px] text-[#5b5b56] uppercase tracking-[0.12em]">{item.key}</div>
            <div className="text-[13px] text-[#e6e6e0] mt-1 flex items-center gap-1.5 leading-snug">
              {item.live && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#5be3a3] shadow-[0_0_0_0_rgba(91,227,163,0.5)] animate-pulse-dot inline-block shrink-0" />
              )}
              <span className="min-w-0">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
