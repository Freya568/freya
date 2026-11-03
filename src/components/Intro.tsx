"use client";

import { createTimeline, type Timeline } from "animejs";
import { useEffect, useRef, useState } from "react";

const LETTERS = [
  { ch: "F", d: "M108.64 28.28Q77.84 28.28 55.02 18.76Q32.2 9.24 19.74 -7.42Q7.28 -24.08 7.28 -45.36Q7.28 -62.72 13.44 -77Q19.6 -91.28 29.82 -100.8Q40.04 -110.32 52.36 -113.4Q54.32 -113.68 54.32 -112Q54.32 -110.6 52.92 -109.76Q38.36 -101.08 30.66 -84.84Q22.96 -68.6 22.96 -48.72Q22.96 -27.16 34.16 -11.62Q45.36 3.92 64.82 12.18Q84.28 20.44 108.64 20.44Q129.64 20.44 148.54 13.02Q167.44 5.6 183.4 -7.28Q199.36 -20.16 212.1 -36.54Q224.84 -52.92 233.52 -70.84Q235.48 -75.04 237.44 -78.96Q239.4 -82.88 241.36 -86.8Q234.64 -87.08 229.18 -87.36Q223.72 -87.64 221.76 -87.64Q214.2 -87.64 205.66 -86.66Q197.12 -85.68 189.7 -82.88Q182.28 -80.08 177.52 -74.2Q175.56 -72.24 175.14 -71.12Q174.72 -70 173.88 -70Q172.76 -70 171.92 -71.82Q171.08 -73.64 172.2 -75.88Q178.64 -90.16 190.4 -95.34Q202.16 -100.52 216.72 -100.52Q219.8 -100.52 228.34 -99.54Q236.88 -98.56 246.4 -97.44Q258.72 -122.36 268.94 -142.52Q279.16 -162.68 288.12 -176.12Q267.96 -182.84 245.28 -188.02Q222.6 -193.2 196.56 -193.2Q177.24 -193.2 161.56 -187.88Q145.88 -182.56 134.82 -173.6Q123.76 -164.64 117.88 -153.72Q112 -142.8 112 -131.88Q112 -119.56 116.76 -112.28Q121.52 -105 129.22 -101.78Q136.92 -98.56 145.04 -98.56Q157.08 -98.56 165.62 -104.44Q174.16 -110.32 179.2 -117.74Q184.24 -125.16 185.36 -129.92Q186.48 -134.4 188.72 -134.4Q192.08 -134.4 191.52 -130.48Q189.84 -118.16 182.84 -109.2Q175.84 -100.24 165.76 -95.62Q155.68 -91 144.48 -91Q133 -91 122.36 -96.6Q111.72 -102.2 105 -112.84Q98.28 -123.48 98.28 -138.6Q98.28 -150.92 103.74 -163.1Q109.2 -175.28 120.26 -185.5Q131.32 -195.72 148.4 -201.88Q165.48 -208.04 188.72 -208.04Q205.24 -208.04 222.6 -204.26Q239.96 -200.48 257.74 -194.74Q275.52 -189 292.88 -182.84Q298.76 -190.4 304.08 -194.46Q309.4 -198.52 314.72 -198.52Q316.96 -198.52 317.8 -197.54Q318.64 -196.56 318.64 -195.72Q318.64 -194.6 317.8 -193.2Q316.96 -191.8 314.72 -191.8Q305.48 -191.8 297.36 -181.44Q317.52 -174.72 336.14 -169.54Q354.76 -164.36 370.72 -164.36Q383.04 -164.36 386.96 -167.02Q390.88 -169.68 390.88 -174.44Q390.88 -177.52 392.84 -177.52Q394.24 -177.52 395.5 -175.7Q396.76 -173.88 396.76 -171.36Q396.76 -164.64 389.34 -160.44Q381.92 -156.24 368.76 -156.24Q351.4 -156.24 332.64 -161.98Q313.88 -167.72 292.88 -174.72Q285.32 -162.12 278.04 -141.82Q270.76 -121.52 260.96 -96.04Q273 -94.92 286.44 -94.22Q299.88 -93.52 308.28 -93.52Q311.08 -93.52 311.08 -91.84Q311.08 -89.6 304.64 -87.92Q300.44 -86.8 290.5 -86.24Q280.56 -85.68 269.92 -85.68Q267.68 -85.68 264.32 -85.82Q260.96 -85.96 257.04 -85.96Q254.52 -79.52 251.86 -72.94Q249.2 -66.36 246.12 -59.36Q234.36 -31.64 217.42 -14.42Q200.48 2.8 181.3 12.18Q162.12 21.56 143.22 24.92Q124.32 28.28 108.64 28.28Z" },
  { ch: "r", d: "M311.64 -54.88Q313.88 -59.64 317.52 -70.14Q321.16 -80.64 325.08 -93.52Q329 -106.4 330.96 -117.88Q331.8 -122.36 334.04 -124.46Q336.28 -126.56 338.8 -126.56Q342.44 -126.56 345.52 -123.06Q348.6 -119.56 348.6 -113.12Q348.6 -105.28 343.98 -99.68Q339.36 -94.08 332.64 -89.04Q335.44 -88.76 338.52 -88.62Q341.6 -88.48 345.24 -88.48Q358.4 -88.48 371.28 -90.16Q371.84 -88.48 371.84 -87.64Q371.84 -84 369.74 -78.4Q367.64 -72.8 365.4 -68.32Q364.28 -65.8 360.92 -59.22Q357.56 -52.64 353.64 -44.38Q349.72 -36.12 347.06 -28.14Q344.4 -20.16 344.4 -14.56Q344.4 -7.28 350 -7.28Q355.32 -7.28 364.84 -19.74Q374.36 -32.2 383.88 -54.04Q387.24 -54.04 387.24 -51.52Q384.16 -43.96 379.54 -35Q374.92 -26.04 369.32 -18.06Q363.72 -10.08 357.28 -4.9Q350.84 0.28 343.84 0.28Q338.52 0.28 333.2 -4.06Q327.88 -8.4 327.88 -18.2Q327.88 -26.88 331.24 -35.14Q334.6 -43.4 338.8 -50.68Q343 -57.96 346.36 -63.56Q349.72 -69.16 349.72 -72.52Q349.72 -77.56 343.42 -79.8Q337.12 -82.04 327.04 -82.32Q322 -69.44 319.48 -63.28Q316.96 -57.12 314.72 -51.52Q310.24 -51.52 311.64 -54.88Z" },
  { ch: "e", d: "M404.04 1.12Q393.68 1.12 385.42 -5.6Q377.16 -12.32 377.16 -26.04Q377.16 -37.52 382.34 -50.4Q387.52 -63.28 396.06 -74.62Q404.6 -85.96 415.1 -93.1Q425.6 -100.24 436.24 -100.24Q441.56 -100.24 446.6 -97.16Q451.64 -94.08 451.64 -86.52Q451.64 -79.52 446.32 -71.12Q441 -62.72 431.2 -55.44Q427 -52.36 420.56 -49.56Q414.12 -46.76 407.68 -44.94Q401.24 -43.12 397.04 -43.12Q395.64 -39.76 394.38 -34.16Q393.12 -28.56 393.12 -22.68Q393.12 -15.68 395.92 -10.08Q398.72 -4.48 406.28 -4.48Q415.52 -4.48 423.5 -9.8Q431.48 -15.12 437.78 -23.24Q444.08 -31.36 448.56 -39.76Q453.04 -48.16 455.56 -54.04Q458.92 -54.04 458.92 -51.52Q455.28 -43.68 450.66 -34.44Q446.04 -25.2 439.74 -17.22Q433.44 -9.24 424.62 -4.06Q415.8 1.12 404.04 1.12ZM399 -48.16Q402.92 -48.16 412.16 -51.1Q421.4 -54.04 428.96 -60.48Q436.24 -66.92 440.16 -74.62Q444.08 -82.32 444.08 -87.64Q444.08 -93.8 439.6 -93.8Q436.24 -93.8 430.36 -89.32Q424.48 -84.84 415.8 -74.2Q410.48 -67.48 405.72 -59.64Q400.96 -51.8 399 -48.16Z" },
  { ch: "y", d: "M416.92 89.32Q402.36 89.32 396.2 83.58Q390.04 77.84 390.04 70Q390.04 57.96 398.86 47.74Q407.68 37.52 420.56 31.36Q435.12 24.64 453.74 20.44Q472.36 16.24 489.44 11.2Q494.76 1.96 499.24 -9.94Q503.72 -21.84 507.36 -33.18Q511 -44.52 513.24 -51.8Q509.88 -45.64 504.7 -36.82Q499.52 -28 493.08 -19.6Q486.64 -11.2 479.22 -5.6Q471.8 0 463.68 0Q460.6 0 456.26 -1.4Q451.92 -2.8 448.7 -6.58Q445.48 -10.36 445.48 -17.92Q445.48 -25.2 449.96 -34.02Q454.44 -42.84 458.92 -51.52Q457.52 -51.52 456.54 -51.8Q455.56 -52.08 455.56 -54.04Q456.4 -55.72 458.92 -61.32Q461.44 -66.92 464.66 -73.64Q467.88 -80.36 470.4 -85.4Q473.48 -91.84 477.26 -94.36Q481.04 -96.88 484.68 -96.88L502.04 -96.88Q500.08 -95.2 497.14 -93.1Q494.2 -91 491.68 -86.8Q484.12 -73.92 478.52 -62.02Q472.92 -50.12 466.48 -36.68Q463.4 -30.24 462 -24.92Q460.6 -19.6 460.6 -15.68Q460.6 -6.44 466.76 -6.44Q473.48 -6.44 483 -17.36Q490.84 -26.6 498.82 -39.34Q506.8 -52.08 514.22 -65.66Q521.64 -79.24 527.24 -90.72Q530.32 -96.88 538.16 -96.88L553.56 -96.88Q545.44 -91.28 541.1 -82.32Q536.76 -73.36 531.44 -59.36Q525.56 -43.96 520.24 -27.44Q514.92 -10.92 508.48 6.44Q522.2 1.68 531.44 -5.88Q540.68 -13.44 547.82 -25.34Q554.96 -37.24 562.24 -54.04Q565.6 -54.04 565.6 -51.52Q559.44 -38.64 554.4 -28.84Q549.36 -19.04 543.2 -11.62Q537.04 -4.2 527.8 2.1Q518.56 8.4 504 14.28Q497.28 26.32 488.74 39.34Q480.2 52.36 469.42 63.7Q458.64 75.04 445.62 82.18Q432.6 89.32 416.92 89.32ZM410.2 83.72Q419.44 83.72 429.24 78.12Q439.04 72.52 448.28 63.98Q457.52 55.44 465.22 46.62Q472.92 37.8 477.68 31.08Q479.08 29.12 480.76 26.04Q482.44 22.96 484.12 20.16Q470.4 23.8 454.02 28.14Q437.64 32.48 425.6 37.8Q412.16 43.4 404.46 53.76Q396.76 64.12 396.76 72.24Q396.76 77.28 399.98 80.5Q403.2 83.72 410.2 83.72Z" },
  { ch: "a", d: "M623 0.84Q616.56 0.84 611.66 -2.8Q606.76 -6.44 606.76 -17.64Q606.76 -22.4 607.46 -26.6Q608.16 -30.8 609.28 -35.56Q606.76 -31.36 602.28 -25.2Q597.8 -19.04 592.34 -13.16Q586.88 -7.28 581.14 -3.36Q575.4 0.56 570.36 0.56Q563.08 0.56 558.6 -6.02Q554.12 -12.6 554.12 -23.24Q554.12 -34.72 559.44 -47.88Q564.76 -61.04 574 -73.08Q583.24 -85.12 595.28 -92.68Q607.32 -100.24 620.48 -100.24Q626.92 -100.24 632.8 -98.14Q638.68 -96.04 643.16 -91.28Q645.12 -89.32 645.12 -86.8Q645.12 -85.12 643.72 -84Q642.32 -82.88 640.08 -83.44Q637 -93.24 626.92 -93.24Q622.16 -93.24 616 -90.16Q608.44 -86.24 599.9 -77.7Q591.36 -69.16 583.94 -58.38Q576.52 -47.6 571.76 -36.68Q567 -25.76 567 -16.8Q567 -7.56 574 -7.56Q580.16 -7.56 586.74 -13.44Q593.32 -19.32 599.34 -28.14Q605.36 -36.96 610.4 -45.64Q615.44 -54.32 618.24 -59.64Q622.44 -67.2 626.08 -72.24Q629.72 -77.28 636.44 -77.28Q639.52 -77.28 642.6 -76.44Q645.68 -75.6 649.04 -76.16Q640.64 -67.76 634.34 -56.28Q628.04 -44.8 624.68 -33.74Q621.32 -22.68 621.32 -15.12Q621.32 -6.72 626.92 -6.72Q631.4 -6.72 636.58 -11.76Q641.76 -16.8 646.66 -24.5Q651.56 -32.2 655.76 -40.18Q659.96 -48.16 662.48 -54.04Q663.88 -54.04 664.86 -53.76Q665.84 -53.48 665.84 -51.52Q665.56 -50.4 664.86 -49.14Q664.16 -47.88 662.76 -44.8Q660.52 -40.32 656.6 -32.76Q652.68 -25.2 647.36 -17.5Q642.04 -9.8 635.88 -4.48Q629.72 0.84 623 0.84Z" }
] as const;

const SWASH_D = "M 649.98 -5.16 C 705 22, 755 68, 772 118 C 792 178, 778 238, 742 278 C 698 328, 628 348, 558 332 C 498 318, 458 278, 468 228 C 476 188, 520 168, 568 178 C 610 186, 648 210, 668 248 C 682 274, 676 308, 648 328";
const MARK_VIEWBOX = "-32.72 -248.04 860 620";

export function Intro() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<SVGPathElement | null>>([]);
  const swashRef = useRef<SVGPathElement>(null);
  const [gone, setGone] = useState(false);
  const [playId, setPlayId] = useState(0);

  useEffect(() => {
    const replay = () => {
      const root = document.documentElement;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      window.scrollTo(0, 0);
      root.dataset.stage = "logo";
      delete root.dataset.header;
      setGone(false);
      setPlayId((id) => id + 1);
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && window.location.pathname === "/") replay();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let timeline: Timeline | null = null;
    let capTimer = 0;

    const finish = () => {
      root.dataset.stage = "done";
      root.dataset.header = "show";
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("HEADER:SHOW"));
      window.dispatchEvent(new Event("INTRO:DONE"));
      setGone(true);
    };

    if (window.location.pathname !== "/") return;

    if (reduce || root.dataset.stage === "done") {
      finish();
      return;
    }

    window.scrollTo(0, 0);
    root.dataset.stage = "logo";

    const run = () => {
      if (cancelled) return;
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      const swash = swashRef.current;
      const letters = letterRefs.current.filter((node): node is SVGPathElement => Boolean(node));
      if (!wrap || !stage || !swash || letters.length !== LETTERS.length) return;

      letters.forEach((letter) => {
        letter.style.strokeDasharray = "1";
        letter.style.strokeDashoffset = "1";
        letter.style.fill = "rgba(14,8,7,0)";
        letter.style.stroke = "#0e0807";
      });
      swash.style.strokeDasharray = "1";
      swash.style.strokeDashoffset = "1";

      timeline = createTimeline({ autoplay: false });
      timeline.add({ duration: 700 }, 0);

      letters.forEach((letter, index) => {
        const start = 700 + index * 550;
        timeline?.add(
          letter,
          {
            strokeDashoffset: [1, 0],
            duration: 1000,
            ease: "inOutCubic",
          },
          start,
        );
        timeline?.add(
          letter,
          {
            fill: ["rgba(14,8,7,0)", "rgba(14,8,7,1)"],
            duration: 280,
            ease: "linear",
          },
          start + 720,
        );
      });

      // Soft pulse while the last glyphs settle
      timeline.add(wrap, { scale: 1.025, duration: 360, ease: "inOutSine" }, 3700);
      timeline.add(wrap, { scale: 1, duration: 360, ease: "inOutSine" }, 4060);

      // Longer swash; still finishing as the mark begins to leave
      timeline.add(
        swash,
        {
          strokeDashoffset: [1, 0],
          duration: 2400,
          ease: "inOutCubic",
        },
        3800,
      );

      // Fly-off + title overlap: rising headline catches the departing line
      timeline.add(
        wrap,
        {
          y: -Math.round(window.innerHeight * 1.3),
          scale: 2,
          duration: 3000,
          ease: "outCubic",
        },
        5100,
      );
      timeline.call(() => {
        root.dataset.stage = "exit";
      }, 5100);

      // Title almost with fly-off so the handoff reads as one continuous move
      timeline.call(() => {
        root.dataset.stage = "title";
      }, 5150);

      // Keep the flying mark visible through the early title rise
      timeline.add(stage, { opacity: [1, 0], duration: 900, ease: "linear" }, 6400);

      timeline.call(() => {
        root.dataset.stage = "detail";
      }, 6800);
      timeline.call(() => {
        root.dataset.header = "show";
        window.dispatchEvent(new Event("HEADER:SHOW"));
      }, 6900);
      timeline.call(() => {
        root.dataset.stage = "done";
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event("INTRO:DONE"));
        if (!cancelled) setGone(true);
      }, 8000);

      timeline.play();
    };

    let started = false;
    const kick = () => {
      if (started || cancelled) return;
      started = true;
      run();
    };

    capTimer = window.setTimeout(kick, 1600);
    document.fonts.ready.then(kick).catch(kick);

    return () => {
      cancelled = true;
      window.clearTimeout(capTimer);
      if (root.dataset.stage !== "done") {
        timeline?.revert();
        delete root.dataset.stage;
      }
    };
  }, [playId]);

  if (gone) return null;

  return (
    <div className="intro" ref={stageRef} aria-hidden>
      <div className="intro__wrap" ref={wrapRef}>
        <svg
          className="intro__mark"
          viewBox={MARK_VIEWBOX}
          role="img"
          aria-label="Freya"
        >
          {LETTERS.map((letter, index) => (
            <path
              key={letter.ch + index}
              ref={(node) => {
                letterRefs.current[index] = node;
              }}
              className="intro__glyph"
              pathLength={1}
              d={letter.d}
            />
          ))}
          <path
            ref={swashRef}
            className="intro__swash-line"
            pathLength={1}
            d={SWASH_D}
          />
        </svg>
      </div>
    </div>
  );
}
