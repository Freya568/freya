"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const riseEase = [0.14, 1, 0.34, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: "1.4rem" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        opacity: { duration: 0.8, ease: "linear", delay },
        y: { duration: 1, ease: riseEase, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
