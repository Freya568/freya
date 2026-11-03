import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "联系",
  description: site.contactNote,
};

export default function ContactPage() {
  return (
    <main className="px-4 pt-36 pb-24">
      <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[1.02] font-light tracking-[-0.045em]">
        联系
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink">{site.contactNote}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className="inline-flex h-11 items-center rounded-full bg-black px-5 text-sm text-white">
          {site.email}
        </a>
        <a
          href={site.xiaohongshu.url}
          className="inline-flex h-11 items-center rounded-full border border-black px-5 text-sm"
          {...(site.xiaohongshu.url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {site.xiaohongshu.label}
        </a>
      </div>
      <ContactForm />
    </main>
  );
}
