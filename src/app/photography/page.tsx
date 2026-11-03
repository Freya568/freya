import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "摄影",
  description: "人像、街拍与旅行。",
};

export default function PhotographyPage() {
  return (
    <main className="px-4 pt-28 pb-24">
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none font-light tracking-[-0.04em]">
        摄影
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink">按人像、街拍、旅行查看。点进一张，可以放大。</p>
      <div className="mt-10">
        <Gallery photos={site.photography} />
      </div>
    </main>
  );
}
