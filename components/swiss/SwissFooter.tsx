export default function SwissFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-6 pb-8 flex justify-between items-center md:flex-col md:gap-3 md:items-start text-[var(--muted)] font-mono text-[11px] uppercase tracking-wider border-t border-[var(--line)]">
      <div className="flex gap-4.5">
        <span>© {currentYear}</span>
        <span>Adhikansh Mittal</span>
      </div>
      <div className="flex gap-4.5">
        <span>Built with Next.js</span>
        <span>Designed in Claude</span>
      </div>
    </div>
  );
}
