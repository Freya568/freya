/**
 * 替换 site 数据即可变我的站。
 *
 * 占位符对照（改右侧的值，不必保留花括号）：
 * {{NAME}} {{NAME_EN}} {{TAGLINE}} {{EMAIL}}
 * {{XHS_PROFILE_URL}} {{ABOUT_SHORT}} {{ABOUT_LONG}}
 * {{PHOTO_TITLE_1}} … {{ARTICLE_TITLE_1}} {{ARTICLE_URL_1}}
 * {{ROLE}} {{ORG}} {{EXP_SUMMARY}}
 *
 * 下面是虚构示例，方便预览版式。外链占位为 "#"。
 */

export type Photo = {
  slug: string;
  title: string;
  cover: string;
  images: string[];
  tags: string[];
  year: string;
  location: string;
  summary: string;
};

export type Article = {
  title: string;
  date: string;
  source: string;
  url: string;
};

export type Experience = {
  role: string;
  org: string;
  start: string;
  end: string;
  summary: string;
};

export const site = {
  name: "林晚", // {{NAME}}
  nameEn: "Lin Wan", // {{NAME_EN}}
  tagline: "拍摄还没被说完的片刻。", // {{TAGLINE}}
  email: "hello@example.com", // {{EMAIL}}
  xiaohongshu: {
    label: "小红书",
    url: "#", // {{XHS_PROFILE_URL}}
  },
  socials: [
    // { label: "Instagram", url: "..." }
  ] as { label: string; url: string }[],
  resumePdf: "/resume.pdf",
  about: {
    short: "独立摄影师，也写一点城市与肖像的笔记。", // {{ABOUT_SHORT}}
    long: "我住在南方一座潮湿的城市里，大部分时间在走路、等光，和把一张照片写成能再读一遍的句子。\n\n人像要停得住，街拍要让路人还是路人，旅行则只记下回程之后仍然记得的天气。\n\n不做热闹的封面。画面留白，句子也留白。若你想约一组肖像、一次城市行走，或只是交换近期看到的光，可以从邮件或小红书开始。", // {{ABOUT_LONG}}
    lines: [
      "我用照片记下光。",
      "用句子把它们留下来。",
      "不追逐热闹。",
      "只留下值得再看一次的瞬间。",
    ],
  },
  photography: [
    {
      slug: "sample-1",
      title: "雨后的南京西路", // {{PHOTO_TITLE_1}}
      cover: "/images/photos/sample-1.jpg",
      images: ["/images/photos/sample-1b.jpg"],
      tags: ["街拍"],
      year: "2025",
      location: "上海",
      summary: "阵雨刚停，路面还亮着。人从橱窗前走过，谁也没有为镜头停留。",
    },
    {
      slug: "sample-2",
      title: "窗边的人", // {{PHOTO_TITLE_2}}
      cover: "/images/photos/sample-2.jpg",
      images: ["/images/photos/sample-2b.jpg"],
      tags: ["人像"],
      year: "2025",
      location: "杭州",
      summary: "下午的侧光只够照到半张脸。剩下的一半留给房间自己。",
    },
    {
      slug: "sample-3",
      title: "京都清晨", // {{PHOTO_TITLE_3}}
      cover: "/images/photos/sample-3.jpg",
      images: ["/images/photos/sample-3b.jpg"],
      tags: ["旅行"],
      year: "2024",
      location: "京都",
      summary: "店铺还没开门。石板路上只有送货的自行车，和一层很薄的雾。",
    },
    {
      slug: "sample-4",
      title: "地铁末班",
      cover: "/images/photos/sample-4.jpg",
      images: ["/images/photos/sample-4b.jpg"],
      tags: ["街拍"],
      year: "2024",
      location: "上海",
      summary: "车厢里的人都在看自己的屏幕。我只拍了空出来的那一节扶手。",
    },
    {
      slug: "sample-5",
      title: "白衬衫",
      cover: "/images/photos/sample-5.jpg",
      images: ["/images/photos/sample-5b.jpg"],
      tags: ["人像"],
      year: "2025",
      location: "苏州",
      summary: "没有布景。一张椅子，一件洗旧的白衬衫，以及对方自己决定的沉默。",
    },
    {
      slug: "sample-6",
      title: "海岸线",
      cover: "/images/photos/sample-6.jpg",
      images: ["/images/photos/sample-6b.jpg"],
      tags: ["旅行"],
      year: "2023",
      location: "舟山",
      summary: "风把所有声音都推远了。水平线低低的，几乎贴着镜头。",
    },
    {
      slug: "sample-7",
      title: "旧书店",
      cover: "/images/photos/sample-7.jpg",
      images: ["/images/photos/sample-7b.jpg"],
      tags: ["街拍"],
      year: "2024",
      location: "广州",
      summary: "灯是黄的，书脊是灰的。有人站着读完一页，又把书放回原处。",
    },
    {
      slug: "sample-8",
      title: "侧脸",
      cover: "/images/photos/sample-8.jpg",
      images: ["/images/photos/sample-8b.jpg"],
      tags: ["人像"],
      year: "2023",
      location: "北京",
      summary: "只要求看向窗外。快门在她忘记镜头的那一秒。",
    },
  ] satisfies Photo[],
  articles: [
    {
      title: "阴天怎么把城市拍清楚", // {{ARTICLE_TITLE_1}}
      date: "2025-03-12",
      source: "小红书",
      url: "#", // {{ARTICLE_URL_1}}
    },
    {
      title: "旅行箱里的两支镜头", // {{ARTICLE_TITLE_2}}
      date: "2024-11-02",
      source: "公众号",
      url: "#", // {{ARTICLE_URL_2}}
    },
    {
      title: "肖像里的停顿", // {{ARTICLE_TITLE_3}}
      date: "2024-06-18",
      source: "个人博客",
      url: "#", // {{ARTICLE_URL_3}}
    },
    {
      title: "一张照片的后期只做三件事", // {{ARTICLE_TITLE_4}}
      date: "2025-08-01",
      source: "小红书",
      url: "#", // {{ARTICLE_URL_4}}
    },
  ] satisfies Article[],
  experience: [
    {
      role: "独立摄影师", // {{ROLE}}
      org: "个人工作室", // {{ORG}}
      start: "2023",
      end: "现在",
      summary: "接肖像与城市行走，同时更新摄影笔记。", // {{EXP_SUMMARY}}
    },
    {
      role: "视觉编辑",
      org: "刊物《午后》",
      start: "2021",
      end: "2023",
      summary: "负责专题摄影的选片、排序和版式。",
    },
    {
      role: "摄影助理",
      org: "城市影像小组",
      start: "2019",
      end: "2021",
      summary: "跟拍商业人像，学会在很短的时间里找光。",
    },
  ] satisfies Experience[],
  skills: ["摄影", "选片", "写作", "版式"],
  tools: ["Lightroom", "Capture One", "Photoshop", "Figma"],
  contactNote:
    "想约一组肖像、一次城市行走，或只是聊聊近期看到的光，写一封邮件就好。我通常两天内回复。",
};

export const photoTags = ["全部", "人像", "街拍", "旅行"] as const;

export function getPhoto(slug: string) {
  return site.photography.find((photo) => photo.slug === slug);
}
