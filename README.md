# 林晚 — Portfolio

黑白、大标题、作品网格。界面中文。内容全部来自 `src/data/site.ts`，替换这份数据即可变成你的站。

技术栈：Next.js（App Router）+ Tailwind CSS + Framer Motion + TypeScript。动效用 Framer Motion，路由淡入，滚动分段出现；系统开启「减少动态效果」时动画关闭。

视觉参考的是 [forai.design](https://forai.design/) 的留白、字号节奏和作品网格，没有使用对方的标志、文案或图片。

## 本地启动

```bash
cd site
npm install
npm run dev
```

浏览器打开 http://localhost:3000 。

生产构建：

```bash
npm run build
npm start
```

## 替换内容

打开 `src/data/site.ts`。文件头注释写了占位符对照。预览用的是虚构示例（林晚）。

| 占位符 | 字段 | 说明 |
| --- | --- | --- |
| `{{NAME}}` | `name` | 中文名，同时出现在字标和标题 |
| `{{NAME_EN}}` | `nameEn` | 可选英文名，加载画面会用到 |
| `{{TAGLINE}}` | `tagline` | 首页一句话 |
| `{{EMAIL}}` | `email` | 页脚、联系页、表单的 mailto |
| `{{XHS_PROFILE_URL}}` | `xiaohongshu.url` | 小红书主页。现在是 `#` |
| `{{ABOUT_SHORT}}` | `about.short` | 关于页大标题 |
| `{{ABOUT_LONG}}` | `about.long` | 关于页正文，段落之间空一行 |
| `about.lines` | 首页大字区 | 每句单独一行 |
| `{{PHOTO_TITLE_n}}` | `photography[].title` | 作品标题 |
| 封面 | `photography[].cover` | 放到 `public/images/photos/` |
| `{{ARTICLE_TITLE_n}}` / `{{ARTICLE_URL_n}}` | `articles` | 外链文章。占位是 `#` |
| `{{ROLE}}` `{{ORG}}` `{{EXP_SUMMARY}}` | `experience` | 简历时间线 |

照片字段还有 `slug`、`tags`（人像 / 街拍 / 旅行）、`year`、`location`、`summary`、`images`（详情页第二张）。

简历 PDF：替换 `public/resume.pdf`。页内时间线读的是 `experience`，和 PDF 互不影响。

## 换字体

在 `src/app/layout.tsx`。

- 西文标题：`Funnel_Display`（字重 300 / 500），接近参考站的大标题
- 正文：`Geist`
- 标注：`Geist_Mono`
- 中文：`Noto_Sans_SC`（思源黑体），跟在西文后面，汉字会落到这套

改完保持 `variable` 名称不变，`src/app/globals.css` 里的 `--font-display` / `--font-sans` / `--font-mono` 就会一起生效。

## 页面

- `/` 首页：姓名、精选摄影、文章、关于短句、小红书与简历
- `/photography` 筛选网格
- `/photography/[slug]` 作品详情，点击图片打开灯箱
- `/writing` 文章外链
- `/about` 长文、时间线、技能，以及 PDF
- `/contact` 邮箱、小红书、邮件草稿表单（没有后端）

## 部署

可放到 Vercel 或 Netlify。在托管后台把根目录设为 `site`（这个文件夹在浏览器插件仓库里面）。

Vercel：导入仓库，Root Directory 填 `site`，Framework 选 Next.js。

Netlify：Base directory 填 `site`，Build command `npm run build`，Publish directory `.next` 不需要手填，使用 Next.js runtime 即可。

构建命令是 `npm run build`。图片放在 `public/`，不需要额外的环境变量。
