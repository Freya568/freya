"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Lightbox({
  images,
  title,
}: {
  images: { src: string; alt: string; wide?: boolean }[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((index) => (index === null ? index : (index + 1) % images.length));
      if (event.key === "ArrowLeft") {
        setOpen((index) => (index === null ? index : (index - 1 + images.length) % images.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, open]);

  return (
    <>
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="group relative block w-full cursor-pointer overflow-hidden rounded-lg bg-line text-left"
            onClick={() => setOpen(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.wide ? 1600 : 1400}
              height={image.wide ? 1066 : 1400}
              priority={index === 0}
              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-white/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} 灯箱`}
        >
          <button type="button" className="absolute top-4 right-4 text-xs" onClick={() => setOpen(null)}>
            关闭
          </button>
          <button
            type="button"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-xs md:left-6"
            onClick={() => setOpen((index) => (index === null ? index : (index - 1 + images.length) % images.length))}
          >
            上一张
          </button>
          <Image
            src={images[open].src}
            alt={images[open].alt}
            width={1600}
            height={1200}
            className="max-h-[86vh] w-auto max-w-[88vw] object-contain"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xs md:right-6"
            onClick={() => setOpen((index) => (index === null ? index : (index + 1) % images.length))}
          >
            下一张
          </button>
        </div>
      ) : null}
    </>
  );
}
