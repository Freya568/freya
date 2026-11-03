"use client";

import { useEffect, useRef } from "react";

export function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let current = { x: -40, y: -40 };
    let target = current;
    let frame = 0;

    const move = (event: PointerEvent) => {
      target = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      current = {
        x: current.x + (target.x - current.x) * 0.22,
        y: current.y + (target.y - current.y) * 0.22,
      };
      const node = dot.current;
      if (node) {
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-2.5 w-2.5 rounded-full bg-black md:block"
      style={{ transform: "translate3d(-40px, -40px, 0) translate(-50%, -50%)" }}
    />
  );
}
