import {
  LINKEDIN_POSTS,
  MEDIUM_ARTICLES,
  WRITING_SECTION,
} from "@/constants/portfolio";

export default function SwissWriting() {
  return (
    <section className="py-20 md:py-14 sm:py-11 border-b border-[var(--line)]" id="writing">
      <div className="grid grid-cols-[200px_1fr] gap-10 mb-10 items-start max-[820px]:grid-cols-1 max-[820px]:gap-[18px] max-[820px]:mb-7">
        <div className="flex gap-3.5 items-start">
          <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider leading-none">
            § 04
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)] leading-none">Writing</span>
        </div>
        <h2 className="text-[clamp(22px,2.4vw,28px)] font-medium tracking-[-0.02em] max-w-[720px] m-0 leading-none [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
          {WRITING_SECTION.headlineBefore}
          <em className="italic font-[family-name:var(--font-newsreader)] font-normal">{WRITING_SECTION.headlineEm}</em>
          {WRITING_SECTION.headlineAfter}
        </h2>
      </div>

      {LINKEDIN_POSTS.length > 0 ? (
        <div className="mb-10 flex flex-col">
          <span className="mb-3 max-w-[720px] font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
            Recent on LinkedIn
          </span>
          {LINKEDIN_POSTS.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate flex flex-col gap-3 border-t border-[var(--line)] py-4.5 transition-all first:border-t before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:z-[-1] before:w-screen before:-translate-x-1/2 before:bg-transparent before:transition-colors hover:before:bg-[var(--tint)] lg:grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-x-10 lg:gap-y-0 lg:py-5"
            >
              <div className="relative z-10 flex min-w-0 items-start lg:col-start-1 lg:row-start-1">
                <span className="shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-wider leading-none text-[var(--muted)]">
                  {post.date}
                </span>
              </div>
              <div className="relative z-10 min-w-0 max-w-[720px] lg:col-start-2 lg:row-start-1">
                <span className="block text-[17px] font-medium leading-[1.35] tracking-[-0.01em]">{post.title}</span>
                <div className="mt-2 flex justify-end">
                  <span className="font-mono text-[11px] text-[var(--muted)]">LinkedIn</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : null}

      {MEDIUM_ARTICLES.length > 0 ? (
        <div className="flex flex-col">
          <span className="mb-3 max-w-[720px] font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
            {WRITING_SECTION.archiveLabel}
          </span>
          {MEDIUM_ARTICLES.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate flex flex-col gap-3 border-t border-[var(--line)] py-4.5 transition-all first:border-t before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:z-[-1] before:w-screen before:-translate-x-1/2 before:bg-transparent before:transition-colors hover:before:bg-[var(--tint)] lg:grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-x-10 lg:gap-y-0 lg:py-5"
            >
              <div className="relative z-10 flex min-w-0 items-start lg:col-start-1 lg:row-start-1">
                <span className="shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-wider leading-none text-[var(--muted)]">
                  {article.date}
                </span>
              </div>
              <div className="relative z-10 min-w-0 max-w-[720px] lg:col-start-2 lg:row-start-1">
                <span className="block text-[17px] font-medium leading-[1.35] tracking-[-0.01em]">{article.title}</span>
                <span className="mt-0.5 block text-[14px] font-normal text-[var(--muted)]">{article.subtitle}</span>
                <div className="mt-2 flex justify-end">
                  <span className="font-mono text-[11px] text-[var(--muted)]">{article.readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
