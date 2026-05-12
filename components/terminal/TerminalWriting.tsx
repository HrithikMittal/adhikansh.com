import {
  LINKEDIN_POSTS,
  MEDIUM_ARTICLES,
  MEDIUM_PROFILE,
  NOW,
  WRITING_SECTION,
} from "@/constants/portfolio";
import Prompt from "./Prompt";

export default function TerminalWriting() {
  return (
    <div className="mt-11">
      <div className="flex items-center gap-3 my-4.5 text-[11px] uppercase tracking-[0.14em] text-[#5b5b56]">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-[#ff6b4a]">04</span> Writing
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      <p className="text-[13px] leading-relaxed text-[#9c9c95] mb-4 max-w-[720px]">
        {WRITING_SECTION.headlineBefore}
        <span className="text-[#e6e6e0]">{WRITING_SECTION.headlineEm}</span>
        {WRITING_SECTION.headlineAfter}
      </p>

      <Prompt command="cat publishing.txt" />
      <div className="border border-white/[0.08] rounded-lg px-4 py-4 sm:px-5 mb-4 bg-white/[0.015]">
        <p className="text-[13px] leading-relaxed text-[#9c9c95] m-0 mb-3">{NOW.headline}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <a
            href={NOW.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold text-[#ff6b4a] hover:text-[#a78bff] transition-colors"
          >
            → {NOW.ctaLabel}
          </a>
          <a
            href={MEDIUM_PROFILE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold text-[#ff6b4a] hover:text-[#a78bff] transition-colors"
          >
            → Read on Medium
          </a>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[#5b5b56] m-0">{WRITING_SECTION.mediumBlurb}</p>
      </div>

      {LINKEDIN_POSTS.length > 0 ? (
        <>
          <Prompt command="ls linkedin/highlights/" />
          <div className="border border-white/[0.08] rounded-lg py-1 mb-4">
            {LINKEDIN_POSTS.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[110px_1fr_auto] md:grid-cols-[1fr_auto] gap-4 md:gap-y-1.5 md:gap-x-3 items-baseline px-4.5 py-3.5 border-b border-white/[0.08] last:border-b-0 hover:bg-[rgba(167,139,255,0.05)] transition-colors"
              >
                <span className="text-[#5be3a3] text-[11px] md:row-start-1">{post.date}</span>
                <span className="text-[#a78bff] font-semibold pr-1.5 hidden md:inline">LI</span>
                <span className="text-[#e6e6e0] text-[13px] md:row-start-2 md:col-span-2">{post.title}</span>
                <span className="text-[#5b5b56] text-[11px] md:row-start-1">↗</span>
              </a>
            ))}
          </div>
        </>
      ) : (
        <p className="text-[12px] text-[#5b5b56] mb-4 max-w-[640px] leading-relaxed">{WRITING_SECTION.highlightsEmpty}</p>
      )}

      {MEDIUM_ARTICLES.length > 0 ? (
        <>
          <Prompt command="tail -n +1 writing/medium.log" />
          <div className="text-[10px] uppercase tracking-wider text-[#5b5b56] mb-2">{WRITING_SECTION.archiveLabel}</div>
          <div className="border border-white/[0.08] rounded-lg py-1">
            {MEDIUM_ARTICLES.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[110px_1fr_auto] md:grid-cols-[1fr_auto] gap-4 md:gap-y-1.5 md:gap-x-3 items-baseline px-4.5 py-3.5 border-b border-white/[0.08] last:border-b-0 hover:bg-[rgba(167,139,255,0.05)] transition-colors"
              >
                <span className="text-[#5be3a3] text-[11px] md:row-start-1">{article.date}</span>
                <span className="text-[#a78bff] font-semibold pr-1.5 hidden md:inline">M</span>
                <span className="md:col-span-2 md:row-start-2 min-w-0">
                  <span className="block text-[#e6e6e0] text-[13px]">{article.title}</span>
                  <span className="block text-[#5b5b56] text-[12px] mt-0.5">{article.subtitle}</span>
                </span>
                <span className="text-[#5b5b56] text-[11px] md:row-start-1">{article.readTime}</span>
              </a>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
