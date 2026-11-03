import type { Metadata } from "next";
import { Bodoni_Moda, Great_Vibes, IBM_Plex_Mono, Inter, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { Frame } from "@/components/Frame";
import { PillNav } from "@/components/PillNav";
import { SiteGradient } from "@/components/SiteGradient";
import { SmoothScroll } from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: "400",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const notoSans = Noto_Sans_SC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-serif-sc",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Freya",
    template: "%s — Freya",
  },
  description: "朋友们，大家好。线下见面吧。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${bodoni.variable} ${script.variable} ${plex.variable} ${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full text-[#0e0807]">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var h=document.documentElement;if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.pathname==='/'){if(location.hash)history.replaceState(null,'',location.pathname+location.search);var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce){h.dataset.stage='done';h.dataset.header='show'}else{h.dataset.stage='logo';delete h.dataset.header;var pin=function(){if(h.dataset.stage==='done'){removeEventListener('scroll',pin);return}if(scrollY!==0)scrollTo(0,0)};addEventListener('scroll',pin,{passive:true});scrollTo(0,0)}}}catch(e){}",
          }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-3 focus:py-2"
        >
          跳到内容
        </a>
        <SiteGradient />
        <SmoothScroll />
        <PillNav />
        <div id="content" className="relative z-[1]">
          <Frame>{children}</Frame>
        </div>
      </body>
    </html>
  );
}
