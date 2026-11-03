import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/data/site";

export function PhotoCard({
  photo,
  priority = false,
}: {
  photo: Photo;
  priority?: boolean;
}) {
  return (
    <Link href={`/photography/${photo.slug}`} className="group block cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-line">
        <Image
          src={photo.cover}
          alt={photo.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="truncate text-sm leading-none">{photo.title}</h3>
        <span className="shrink-0 font-mono text-[11px] text-muted">{photo.year}</span>
      </div>
    </Link>
  );
}
