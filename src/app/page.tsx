import { Intro } from "@/components/Intro";
import { Reveal } from "@/components/Reveal";
import { SubscribeForm } from "@/components/SubscribeForm";

const services = [
  { index: "/01", title: "职业" },
  { index: "/02", title: "创作" },
  { index: "/03", title: "社群" },
];

const panels = [
  {
    id: "education",
    index: "01",
    title: "简介",
    note: "多了解我一点吧。",
    className: "bg-[#efeae4]",
    ink: "text-[#0e0807]",
  },
  {
    id: "collection",
    index: "02",
    title: "收集",
    note: "参考与分享放在这一格。",
    className: "bg-[#d9d2cb]",
    ink: "text-[#0e0807]",
  },
  {
    id: "works",
    index: "03",
    title: "作品",
    note: "项目以画面网格呈现。",
    className: "bg-[#1a1412]",
    ink: "text-[#f8f6f3]",
  },
];

function Rule({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 80 8" className="mb-4 h-2 w-16" aria-hidden>
      <line
        className="rule-draw"
        x1="0"
        y1="4"
        x2="80"
        y2="4"
        stroke={light ? "#f8f6f3" : "#0e0807"}
        strokeWidth="1"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main>
      <Intro />
      <section className="relative flex min-h-[100svh] flex-col px-[clamp(1.25rem,4vw,4.5rem)] pt-28 pb-8">
        <div className="hero-lock flex flex-1 flex-col items-center justify-center py-16 text-center">
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#0e0807]">
            朋友们，大家好。线下见面吧。
          </p>
          <h1 className="mt-8 font-display text-[58px] leading-[0.85] font-normal tracking-[-0.01em] text-[#0e0807] md:text-[100px] xl:text-[120px]">
            <span className="block">Welcome  To  My  World</span>
          </h1>
        </div>

        <div className="hero-detail relative z-10 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-sm text-[15px] leading-7 text-[#0e0807]">
            </p>
            <span className="hero-rule" />
          </div>
        </div>
      </section>

      <section id="thesis" data-gradient-band className="scroll-mt-28 px-[clamp(1.25rem,4vw,4.5rem)] py-28 text-[#f8f6f3]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <Rule light />
              <p className="font-mono text-[11px] tracking-[0.16em]">我的论点</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <p className="font-display text-[clamp(1.8rem,3.5vw,3.35rem)] leading-[1.05] font-normal tracking-[-0.01em] text-[#f8f6f3]/72">
                关注设计与创意人才。人在彼此鼓励、不断重写优秀标准的同伴之间，会做出更好的工作。焦点在社群、职业与创作实践交会的地方。
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-10 max-w-md text-[15px] leading-7">
              欢迎来到创意人才、社群与创作实践这一页。
              </p>
              <a
                href="#portfolio"
                className="mt-8 inline-flex items-center bg-white px-6 py-4 font-mono text-[11px] tracking-[0.16em] text-[#0e0807] transition-colors duration-300 hover:bg-[#f8f6f3]"
              >
                我的服务
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="portfolio" className="scroll-mt-28 px-[clamp(1.25rem,4vw,4.5rem)] py-24">
        <Reveal>
          <ul className="grid border-t border-[#0e0807]/15 md:grid-cols-3">
            {services.map((item) => (
              <li key={item.title} className="border-b border-[#0e0807]/15 py-8 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <p className="font-mono text-[11px] tracking-[0.16em]">{item.index}</p>
                <h2 className="mt-6 font-display text-5xl leading-[0.85] font-normal tracking-[-0.01em]">{item.title}</h2>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="about" className="scroll-mt-28 px-[clamp(1.25rem,4vw,4.5rem)] pt-8 pb-24">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.22em]">关于</p>
          <h2 className="mx-auto mt-6 max-w-5xl text-center font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-normal tracking-[-0.01em]">
            关于我的工作室
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mx-auto mt-12 max-w-xl border-t border-[#0e0807]/20 pt-6">
            <p className="text-[15px] leading-7">
              工作室、社媒和邮箱收在这一页。简介、收集、作品分三格往下排。
            </p>
            <a href="#education" className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] hover:opacity-60">
              阅读更多
              <span aria-hidden className="transition-transform duration-300 hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {panels.map((panel, index) => (
            <li key={panel.id} id={panel.id} className="scroll-mt-28">
              <Reveal delay={index * 0.06}>
                <a href={`#${panel.id}-note`} className="group block">
                  <article className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-5 ${panel.className} ${panel.ink}`}>
                    <span className="font-mono text-[11px] tracking-[0.16em]">{panel.index}</span>
                    <span
                      className="pointer-events-none absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{
                        background:
                          panel.id === "works"
                            ? "radial-gradient(90% 70% at 80% 20%, rgba(248,246,243,0.28), transparent 50%)"
                            : "linear-gradient(160deg, transparent 20%, rgba(14,8,7,0.06) 100%)",
                      }}
                    />
                    <span className="relative font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.85] font-normal tracking-[-0.01em]">
                      {panel.title}
                    </span>
                  </article>
                  <span className="mt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.12em]">
                    阅读更多
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {panels.map((panel) => (
            <p key={`${panel.id}-note`} id={`${panel.id}-note`} className="scroll-mt-28 text-[15px] leading-7">
              <span className="mb-2 block font-mono text-[11px] tracking-[0.16em]">{panel.title}</span>
              {panel.note}
            </p>
          ))}
        </div>
      </section>

      
      <section id="lifestyle" className="scroll-mt-28 bg-[#f8f6f3] pt-28 pb-8">
        <div className="px-[clamp(1.25rem,4vw,4.5rem)]">
          <p className="font-mono text-[11px] tracking-[0.22em]">Lifestyle</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.92] font-normal tracking-[-0.01em]">
            Lifestyle
          </h2>
        </div>
        <div
          className="relative mt-6 w-full"
          style={{ height: "min(calc(100svh - 14rem), calc(100vw * 820 / 1220))" }}
        >
          <iframe
            src="/zine/index.html?plain=1"
            title="照片集"
            className="absolute inset-0 h-full w-full border-0 bg-[#f8f6f3]"
          />
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 border-t border-[#f8f6f3]/12 bg-[#0e0807] px-[clamp(1.25rem,4vw,4.5rem)] py-28 text-[#f8f6f3]">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em]">关于我的社媒和邮箱</p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.92] font-normal tracking-[-0.01em]">
            朋友们，大家好。线下见面吧。
          </h2>
          <p id="instagram" className="mt-8 scroll-mt-28 max-w-md text-[15px] leading-7">
            邮箱都还没有可公开的地址。下面的输入只做界面，不会提交到任何服务。
          </p>
          <SubscribeForm />
        </Reveal>
      </section>

      <footer className="flex flex-col gap-4 bg-[#0e0807] px-[clamp(1.25rem,4vw,4.5rem)] py-8 font-mono text-[11px] tracking-[0.14em] text-[#f8f6f3] sm:flex-row sm:items-center sm:justify-between">
        <p>朋友们，大家好。线下见面吧。</p>
        <nav className="flex gap-5" aria-label="页脚">
          <a href="#instagram" className="hover:opacity-60">
            INSTAGRAM
          </a>
          <a href="#contact" className="hover:opacity-60">
            接触
          </a>
        </nav>
      </footer>
    </main>
  );
}
