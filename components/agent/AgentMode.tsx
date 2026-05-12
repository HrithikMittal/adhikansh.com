import {
  PERSONAL_INFO,
  PROJECTS_ORDERED,
  MEDIUM_ARTICLES,
  MEDIUM_PROFILE,
  SOCIAL_LINKS,
  ABOUT,
  LAB_IDEAS,
  LINKEDIN_POSTS,
  NOW,
  WRITING_SECTION,
} from "@/constants/portfolio";

export default function AgentMode() {
  const sameAs = SOCIAL_LINKS.filter((l) => l.url.startsWith("http")).map((l) => l.url);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.primaryRole,
    description: `${PERSONAL_INFO.tagline} ${ABOUT.headline}`,
    email: PERSONAL_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSONAL_INFO.location,
    },
    sameAs,
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-[900px] mx-auto">
      {/* Structured data for SEO/LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Header */}
      <header className="mb-12 pb-8 border-b-2 border-black">
        <h1 className="text-4xl font-bold mb-2">{PERSONAL_INFO.name}</h1>
        <p className="text-sm font-bold mb-1">{PERSONAL_INFO.primaryRole}</p>
        <p className="text-lg mb-4">{PERSONAL_INFO.tagline}</p>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div>
            <dt className="font-bold">Location:</dt>
            <dd>{PERSONAL_INFO.location}</dd>
          </div>
          <div>
            <dt className="font-bold">Status:</dt>
            <dd>{PERSONAL_INFO.status}</dd>
          </div>
          <div>
            <dt className="font-bold">Email:</dt>
            <dd>{PERSONAL_INFO.email}</dd>
          </div>
          <div>
            <dt className="font-bold">Updated:</dt>
            <dd>{PERSONAL_INFO.updated}</dd>
          </div>
        </dl>
      </header>

      {/* About */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">About</h2>
        <p className="mb-4 leading-relaxed">{ABOUT.headline}</p>
        {ABOUT.paragraphs.map((para, i) => (
          <p key={i} className="mb-4 leading-relaxed">{para}</p>
        ))}
        <p className="mb-4 leading-relaxed text-gray-700">{ABOUT.personal}</p>
        <h3 className="text-xl font-bold mb-2">Technical stack</h3>
        <dl className="space-y-2">
          {Object.entries(ABOUT.stack).map(([key, value]) => {
            const label =
              key === "comfortZone"
                ? "Comfort zone"
                : key === "ai"
                  ? "AI"
                  : key === "stack"
                    ? "Stack"
                    : key === "cloud"
                      ? "Cloud"
                      : key;
            return (
              <div key={key}>
                <dt className="font-bold">{label}:</dt>
                <dd className="ml-4">{value}</dd>
              </div>
            );
          })}
        </dl>
      </section>

      {/* Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">Projects</h2>
        <ul className="space-y-6">
          {PROJECTS_ORDERED.map((project) => (
            <li key={project.id} className="border-l-4 border-black pl-4">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {project.role} · {project.year} · {project.tier === "flagship" ? "Primary" : "Side project"}
              </p>
              <p className="mb-2">{project.description}</p>
              {project.proofLinks && project.proofLinks.length > 0 ? (
                <ul className="mb-2 list-disc pl-5 text-sm">
                  {project.proofLinks.map((pl) => (
                    <li key={pl.label}>
                      {pl.url ? (
                        <a href={pl.url} target="_blank" rel="noopener noreferrer" className="underline">
                          {pl.label}
                        </a>
                      ) : (
                        pl.label
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:no-underline"
              >
                {project.url}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">Lab (exploring)</h2>
        <p className="text-sm text-gray-600 mb-4">Ideas not yet shipped; working titles only.</p>
        <ul className="space-y-4">
          {LAB_IDEAS.map((idea) => (
            <li key={idea.id}>
              <strong>{idea.workingTitle}</strong>
              <p className="text-sm mt-1">{idea.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">Publishing</h2>
        <p className="mb-2 leading-relaxed text-sm">
          {WRITING_SECTION.headlineBefore}
          <em>{WRITING_SECTION.headlineEm}</em>
          {WRITING_SECTION.headlineAfter}
        </p>
        <p className="mb-3 leading-relaxed">{NOW.headline}</p>
        <p className="mb-2 flex flex-wrap gap-x-6 gap-y-1">
          <a href={NOW.ctaUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {NOW.ctaLabel}
          </a>
          <a href={MEDIUM_PROFILE.url} target="_blank" rel="noopener noreferrer" className="underline">
            Medium ({MEDIUM_PROFILE.handle})
          </a>
        </p>
        <p className="mb-4 text-sm text-gray-600">{WRITING_SECTION.mediumBlurb}</p>
        {LINKEDIN_POSTS.length > 0 ? (
          <>
            <h3 className="text-lg font-bold mb-2">LinkedIn highlights</h3>
            <ul className="space-y-3 mb-6">
              {LINKEDIN_POSTS.map((post) => (
                <li key={post.url}>
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {post.title}
                  </a>
                  <span className="text-sm text-gray-600"> — {post.date}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mb-6 text-sm text-gray-600">{WRITING_SECTION.highlightsEmpty}</p>
        )}
        {MEDIUM_ARTICLES.length > 0 ? (
          <>
            <h3 className="text-lg font-bold mb-2">{WRITING_SECTION.archiveLabel}</h3>
            <ul className="space-y-4">
              {MEDIUM_ARTICLES.map((article) => (
                <li key={article.id}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                    {article.title}
                  </a>
                  <span className="text-sm text-gray-600">
                    {" "}
                    — {article.date} · {article.readTime}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{article.subtitle}</p>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">Contact</h2>
        <ul className="space-y-2">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.platform} className="flex justify-between gap-4">
              <span className="font-bold shrink-0">{link.platform}:</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline text-right break-all"
              >
                {link.handle}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-black text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
        <p className="mt-2">
          This page is optimized for AI agents and LLMs. Human-friendly versions available via mode switcher.
        </p>
      </footer>
    </div>
  );
}
