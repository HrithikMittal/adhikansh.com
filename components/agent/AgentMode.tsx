import { PERSONAL_INFO, PROJECTS, ESSAYS, SOCIAL_LINKS, ABOUT } from "@/constants/portfolio";

export default function AgentMode() {
  // Structured data for SEO/LLMs  - all content is from safe constants
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: "Technical Founder",
    description: PERSONAL_INFO.tagline,
    email: PERSONAL_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSONAL_INFO.location,
    },
    sameAs: SOCIAL_LINKS.map((l) => l.url),
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
        <h3 className="text-xl font-bold mb-2">Technical Stack</h3>
        <dl className="space-y-2">
          {Object.entries(ABOUT.stack).map(([key, value]) => (
            <div key={key}>
              <dt className="font-bold capitalize">{key === "comfortZone" ? "Comfort Zone" : key}:</dt>
              <dd className="ml-4">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">Projects</h2>
        <ul className="space-y-6">
          {PROJECTS.map((project) => (
            <li key={project.id} className="border-l-4 border-black pl-4">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {project.role} · {project.year}
              </p>
              <p className="mb-2">{project.description}</p>
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

      {/* Writing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">Writing</h2>
        <ul className="space-y-3">
          {ESSAYS.map((essay) => (
            <li key={essay.slug}>
              <div className="flex justify-between items-baseline mb-1">
                <strong>{essay.title}</strong>
                <span className="text-sm text-gray-600">
                  {essay.date} · {essay.readTime}
                </span>
              </div>
              <p className="text-sm text-gray-600">{essay.subtitle}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-black">Contact</h2>
        <ul className="space-y-2">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.platform} className="flex justify-between">
              <span className="font-bold">{link.platform}:</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
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
