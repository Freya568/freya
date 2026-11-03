"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Boot() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem("site-booted") === "1") return;

    setVisible(true);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("site-booted", "1");
      setVisible(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end bg-white px-4 py-6">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        {site.nameEn}
      </p>
    </div>
  );
}
