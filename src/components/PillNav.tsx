"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#about", index: "/01", label: "About" },
  { href: "/#portfolio", index: "/02", label: "Portfolio" },
  { href: "/#lifestyle", index: "/03", label: "Lifestyle" },
  { href: "/#contact", index: "/04", label: "Contact" },
];

export function PillNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="site-header fixed top-4 left-1/2 z-50 w-[min(92vw,40rem)]">
        <div className="flex items-center justify-between rounded-full bg-white px-5 py-3 shadow-[0_12px_40px_rgba(14,8,7,0.08)]">
          <Link
            href="/"
            className="nav-wordmark relative z-10 text-[1.65rem] leading-none text-[#0e0807] tracking-[-0.02em]"
            aria-label="Freya 首页"
            onClick={() => setOpen(false)}
          >
            Freya
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center"
            aria-label={open ? "关闭导航" : "打开导航"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
              <span
                className={`h-px bg-[#0e0807] transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px bg-[#0e0807] transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <nav
          id="site-menu"
          className="menu-in fixed inset-0 z-40 px-[clamp(1.25rem,4vw,4.5rem)] pt-32 pb-16"
          aria-label="主导航"
        >
          <ol className="mx-auto flex w-full max-w-3xl flex-col">
            {links.map((link) => (
              <li key={link.label} className="border-b border-[#0e0807]/12">
                <Link
                  href={link.href}
                  className="group flex items-baseline justify-between py-4"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-none tracking-[-0.04em] group-hover:opacity-60">
                    {link.label}
                  </span>
                  {link.index ? (
                    <span className="font-mono text-[11px] tracking-[0.16em]">{link.index}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </>
  );
}
