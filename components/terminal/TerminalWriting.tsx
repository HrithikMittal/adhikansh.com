import {
  LINKEDIN_POSTS,
  MEDIUM_ARTICLES,
  MEDIUM_PROFILE,
  NOW,
  WRITING_SECTION,
} from "@/constants/portfolio";
import Prompt from "./Prompt";

/** Medium archive list only — used by `writing` terminal command */
export function TerminalWritingArchiveOnly() {
  if (MEDIUM_ARTICLES.length === 0) {
    return <p className="m-0 text-[12px] text-[#5b5b56]">No Medium archive entries.</p>;
  }

  return (
    <div>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-[#5b5b56]">
        {WRITING_SECTION.archiveLabel}
      </div>
      <div className="rounded-lg border border-white/[0.08] py-0">
        {MEDIUM_ARTICLES.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b border-white/[0.08] px-4 py-3.5 transition-colors last:border-b-0 hover:bg-[rgba(167,139,255,0.05)] sm:px-4.5 sm:py-4"
            aria-label={`${article.title} on Medium`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="shrink-0 font-mono text-[11px] text-[#5be3a3]">{article.date}</span>
              <span className="shrink-0 font-mono text-[11px] text-[#5b5b56]">{article.readTime}</span>
            </div>
            <h3 className="mt-1.5 text-[13px] font-medium leading-snug tracking-[-0.01em] text-[#e6e6e0]">
              {article.title}
            </h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#9c9c95]">{article.subtitle}</p>
            <span className="mt-2 inline-block font-semibold text-[11px] text-[#a78bff]">M</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function TerminalWritingBody() {
  return (
    <div className="space-y-4">
      <p className="mb-0 max-w-[720px] text-[13px] leading-relaxed text-[#9c9c95]">
        {WRITING_SECTION.headlineBefore}
        <span className="text-[#e6e6e0]">{WRITING_SECTION.headlineEm}</span>
        {WRITING_SECTION.headlineAfter}
      </p>

      <Prompt command="cat publishing.txt" />
      <div className="mb-0 rounded-lg border border-white/[0.08] bg-white/[0.015] px-4 py-4 sm:px-5">
        <p className="m-0 mb-3 text-[13px] leading-relaxed text-[#9c9c95]">{NOW.headline}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <a
            href={NOW.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold text-[#ff6b4a] transition-colors hover:text-[#a78bff]"
          >
            → {NOW.ctaLabel}
          </a>
          <a
            href={MEDIUM_PROFILE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold text-[#ff6b4a] transition-colors hover:text-[#a78bff]"
          >
            → Read on Medium
          </a>
        </div>
        <p className="m-0 mt-3 text-[12px] leading-relaxed text-[#5b5b56]">{WRITING_SECTION.mediumBlurb}</p>
      </div>

      {LINKEDIN_POSTS.length > 0 ? (
        <>
          <Prompt command="ls linkedin/highlights/" />
          <div className="mb-0 rounded-lg border border-white/[0.08] py-1">
            {LINKEDIN_POSTS.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[110px_1fr_auto] items-baseline gap-4 border-b border-white/[0.08] px-4.5 py-3.5 transition-colors last:border-b-0 hover:bg-[rgba(167,139,255,0.05)] md:grid-cols-[1fr_auto] md:gap-x-3 md:gap-y-1.5"
              >
                <span className="text-[11px] text-[#5be3a3] md:row-start-1">{post.date}</span>
                <span className="hidden pr-1.5 font-semibold text-[#a78bff] md:inline">LI</span>
                <span className="text-[13px] text-[#e6e6e0] md:col-span-2 md:row-start-2">{post.title}</span>
                <span className="text-[11px] text-[#5b5b56] md:row-start-1">↗</span>
              </a>
            ))}
          </div>
        </>
      ) : (
        <p className="mb-0 max-w-[640px] text-[12px] leading-relaxed text-[#5b5b56]">{WRITING_SECTION.highlightsEmpty}</p>
      )}

      {MEDIUM_ARTICLES.length > 0 ? (
        <>
          <Prompt command="tail -n +1 writing/medium.log" />
          <TerminalWritingArchiveOnly />
        </>
      ) : null}
    </div>
  );
}

export default function TerminalWriting() {
  return (
    <div className="mt-11">
      <div className="my-4.5 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">04</span> Writing
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      <TerminalWritingBody />
    </div>
  );
}
