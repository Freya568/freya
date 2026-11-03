import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "关于",
  description: site.about.short,
};

export default function AboutPage() {
  const paragraphs = site.about.long.split("\n\n");

  return (
    <main className="px-4 pt-28 pb-24">
      <h1 className="max-w-4xl font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.08] font-light tracking-[-0.04em]">
        {site.about.short}
      </h1>
      <div className="mt-12 max-w-2xl space-y-6 text-base leading-8">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section id="resume" className="mt-24 scroll-mt-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none font-light tracking-[-0.04em]">
            简历
          </h2>
          <a
            href={site.resumePdf}
            download
            className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm text-white"
          >
            下载 PDF 简历
          </a>
        </div>
        <ol className="mt-10 border-t border-line">
          {site.experience.map((item) => (
            <li key={`${item.org}-${item.start}`} className="grid gap-2 border-b border-line py-6 md:grid-cols-[1.1fr_1.2fr_0.7fr] md:gap-6">
              <p className="text-base">{item.role}</p>
              <div>
                <p className="text-sm text-ink">{item.org}</p>
                <p className="mt-2 text-sm leading-relaxed">{item.summary}</p>
              </div>
              <p className="font-mono text-[11px] text-muted md:text-right">
                {item.start} — {item.end}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted">技能</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {site.skills.map((skill) => (
              <li key={skill} className="rounded-full bg-line px-3 py-1.5 text-sm">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted">工具</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {site.tools.map((tool) => (
              <li key={tool} className="rounded-full bg-line px-3 py-1.5 text-sm">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
