export default function Prompt({ command, children }: { command?: string; children?: React.ReactNode }) {
  return (
    <div className="py-1">
      <div className="flex gap-2.5 items-baseline">
        <span className="text-[#5be3a3]">adhi</span>
        <span className="text-[#5b5b56]">@</span>
        <span className="text-[#a78bff]">coral</span>
        <span className="text-[#ff6b4a]">~</span>
        <span className="text-[#5b5b56] pr-1">$</span>
        {command && <span className="text-[#e6e6e0]">{command}</span>}
        {command && <span className="inline-block w-2 h-[1em] bg-[#ff6b4a] ml-1 align-baseline -translate-y-[2px] animate-blink" />}
      </div>
      {children && <div className="py-1.5 text-[#9c9c95] whitespace-pre-wrap">{children}</div>}
    </div>
  );
}
