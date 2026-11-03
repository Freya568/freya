"use client";

import { useMemo, useState } from "react";
import { photoTags, type Photo } from "@/data/site";
import { PhotoCard } from "@/components/PhotoCard";

export function Gallery({ photos }: { photos: Photo[] }) {
  const [tag, setTag] = useState<(typeof photoTags)[number]>("全部");
  const visible = useMemo(
    () => (tag === "全部" ? photos : photos.filter((photo) => photo.tags.includes(tag))),
    [photos, tag],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="作品筛选">
        {photoTags.map((item) => {
          const selected = item === tag;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTag(item)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                selected ? "bg-black text-white" : "bg-line text-black"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <p className="text-sm text-ink">这个分类还没有作品。</p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((photo) => (
            <li key={photo.slug}>
              <PhotoCard photo={photo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
