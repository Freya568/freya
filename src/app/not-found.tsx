import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-start justify-end px-4 pb-24">
      <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-none font-light tracking-[-0.045em]">
        没有这一页
      </h1>
      <Link href="/" className="mt-8 text-sm underline underline-offset-4">
        回到首页
      </Link>
    </main>
  );
}
