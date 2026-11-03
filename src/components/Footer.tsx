import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/photography", label: "摄影" },
  { href: "/writing", label: "文章" },
  { href: "/about", label: "关于" },
  { href: "/about#resume", label: "简历" },
  { href: "/contact", label: "联系" },
];

export function Footer() {
  return (
    <footer className="px-4 pt-16 pb-8">
      <div className="flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm">
            {site.name} · {site.tagline}
          </p>
          <a href={`mailto:${site.email}`} className="mt-2 inline-block text-sm text-ink hover:text-black">
            {site.email}
          </a>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end" aria-label="页脚导航">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="text-xs text-ink hover:text-black">
              {link.label}
            </Link>
          ))}
          <a
            href={site.xiaohongshu.url}
            className="text-xs text-ink hover:text-black"
            {...(site.xiaohongshu.url.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {site.xiaohongshu.label}
          </a>
        </nav>
      </div>
      <p className="mt-10 font-mono text-[11px] text-muted">© 2026</p>
    </footer>
  );
}
