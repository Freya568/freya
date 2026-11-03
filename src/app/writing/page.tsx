import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "文章",
  description: "已发布的摄影与写作笔记。",
};

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${year}.${month}.${day}`;
}

export default function WritingPage() {
  return (
    <main className="px-4 pt-28 pb-24">
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none font-light tracking-[-0.04em]">
        文章
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink">
        笔记发布在小红书、公众号或个人博客。这里只做目录，点开会去原平台。
      </p>
      <ul className="mt-12 border-t border-line">
        {site.articles.map((article) => (
          <li key={article.title} className="border-b border-line">
            <a
              href={article.url}
              className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              {...(article.url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="text-lg group-hover:underline">{article.title}</span>
              <span className="flex items-center gap-4 font-mono text-[11px] text-muted">
                <span>{article.source}</span>
                <span>{formatDate(article.date)}</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
