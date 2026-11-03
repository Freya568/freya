"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Story({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.28, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <section
      id="story"
      ref={ref}
      className="px-4 py-28 md:py-40"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 text-center font-display text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.25] tracking-[-0.03em] md:gap-4">
        {lines.map((line) =>
          reduce ? (
            <p key={line}>{line}</p>
          ) : (
            <motion.p key={line} style={{ opacity, y }}>
              {line}
            </motion.p>
          ),
        )}
      </div>
    </section>
  );
}
