"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    let frame = 0;

    const loop = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    const home = () => window.location.pathname === "/";
    const locked = () => home() && document.documentElement.dataset.stage !== "done";

    const pinTop = () => {
      if (!home()) return;
      lenis.scrollTo(0, { immediate: true, force: true });
    };

    if (locked()) {
      pinTop();
      lenis.stop();
    } else {
      lenis.start();
    }

    const release = () => {
      pinTop();
      lenis.start();
    };
    window.addEventListener("INTRO:DONE", release);

    return () => {
      window.removeEventListener("INTRO:DONE", release);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
