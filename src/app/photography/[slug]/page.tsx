import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lightbox } from "@/components/Lightbox";
import { getPhoto, site } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return site.photography.map((photo) => ({ slug: photo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const photo = getPhoto(slug);
  if (!photo) return { title: "未找到" };
  return { title: photo.title, description: photo.summary };
}

export default async function PhotoPage({ params }: Props) {
  const { slug } = await params;
  const photo = getPhoto(slug);
  if (!photo) notFound();

  const frames = [
    { src: photo.cover, alt: photo.title },
    ...photo.images.map((src, index) => ({
      src,
      alt: `${photo.title} ${index + 2}`,
      wide: true,
    })),
  ];

  const meta = [
    { label: "地点", value: photo.location },
    { label: "年份", value: photo.year },
    { label: "类型", value: photo.tags.join(" / ") },
  ];

  return (
    <main className="px-4 pt-28 pb-24">
      <p className="font-mono text-[11px] tracking-[0.14em] text-muted">PHOTO</p>
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        {meta.map((item) => (
          <div key={item.label}>
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted">{item.label}</p>
            <p className="mt-2 font-display text-2xl font-light tracking-[-0.03em]">{item.value}</p>
          </div>
        ))}
      </div>
      <h1 className="mt-10 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-[-0.04em]">
        {photo.title}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink">{photo.summary}</p>
      <div className="mt-10">
        <Lightbox images={frames} title={photo.title} />
      </div>
      <Link href="/photography" className="mt-10 inline-block text-sm underline underline-offset-4">
        返回摄影
      </Link>
    </main>
  );
}
