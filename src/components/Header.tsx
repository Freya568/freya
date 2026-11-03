"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/#works", label: "作品", section: "works" },
  { href: "/photography", label: "摄影", match: "/photography" },
  { href: "/writing", label: "文章", match: "/writing" },
  { href: "/about", label: "关于", match: "/about" },
  { href: "/about#resume", label: "简历", hash: "resume" },
  { href: "/contact", label: "联系", match: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setHash(window.location.hash.replace("#", ""));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return;
    const nodes = ["works", "notes", "story"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  const active = (link: (typeof links)[number]) => {
    if (link.hash) return pathname === "/about" && hash === link.hash;
    if (link.match === "/about") return pathname === "/about" && hash !== "resume";
    if (link.match) return pathname === link.match || pathname.startsWith(`${link.match}/`);
    if (pathname === "/" && link.section) return section === link.section || (section === "" && link.section === "works" && hash === "works");
    return false;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-white/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="relative z-10 flex items-center gap-2 font-display text-xl font-medium tracking-[-0.03em]">
          <span aria-hidden className="inline-block h-3.5 w-3.5 rounded-full bg-black" />
          {site.name}
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex" aria-label="主导航">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-xs font-medium leading-none ${active(link) ? "underline underline-offset-4" : "text-black"}`}
              aria-current={active(link) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex h-9 items-center rounded-full bg-black px-4 text-xs font-medium text-white"
          >
            联系
          </Link>
          <button
            type="button"
            className="relative h-9 w-9 md:hidden"
            aria-expanded={open}
            aria-label={open ? "关闭菜单" : "打开菜单"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`absolute left-2 right-2 h-px bg-black transition-transform duration-200 ${open ? "top-1/2 rotate-45" : "top-[13px]"}`} />
            <span className={`absolute top-1/2 left-2 right-2 h-px bg-black transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-2 right-2 h-px bg-black transition-transform duration-200 ${open ? "top-1/2 -rotate-45" : "bottom-[13px]"}`} />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-col gap-5 px-4 pt-6 pb-10 md:hidden" aria-label="移动端导航">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-display text-[2rem] leading-none font-light tracking-[-0.03em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
