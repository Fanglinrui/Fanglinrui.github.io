import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { getSidebar } from "./utils/getSidebar";

export default defineConfig({
  // 标签上显示的网站标题
  title: "FangLinrui's Blog",
  titleTemplate: "Blog",
  // 在标签上显示所的 logo
  head: [["link", { rel: "icon", href: "/logo.png" }]],

  // 网站描述，有利于被搜索引擎捕获
  description:
    "FangLinrui's tech blog: An undergraduate's journey.",

  // md 文件根目录
  // 【谨慎修改】：一旦修改将引起较多变动
  srcDir: "./src",

  // 主题自定义
  themeConfig: {
    // 网站左上角 logo
    logo: "/logo.png",
    // 顶部导航栏
    nav: [
      { text: "👋 About", link: "/AboutMe.md" },
      { text: "💭 Posts", link: "/Notes/index" },
      // { text: "🦄 Projects", link: "Projects.md" },
      // { text: "👫 Friends", link: "Friends.md" },
    ],
    // 顶部导航栏左侧的社交平台跳转
    socialLinks: [{ icon: "github", link: "https://github.com/Fanglinrui" }],
    // 首页底部版权声明
    footer: {
      copyright: "Copyright © 2025-present FangLinrui, All rights reserved.",
    },
    // 【文章页面左侧导航】
    sidebar: {
      "/Notes/": getSidebar("/docs/src", "/Notes/"),
    },
    // 文章内导航栏标题
    outlineTitle: "导航栏",
    // 是否启动搜索功能
    search: {
      provider: "local",
    },
  },
  // 数学公式支持
  markdown: {
    math: true,
  },
  // !请勿修改
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPDocFooterLastUpdated\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/UpdateTime.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(new URL("./components/Footer.vue", import.meta.url)),
        },
      ],
    },
  },
  lastUpdated: true,
});
