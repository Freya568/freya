"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function Frame({ children }: { children: ReactNode }) {
  const home = usePathname() === "/";
  return <div className={home ? "" : "pt-28"}>{children}</div>;
}
