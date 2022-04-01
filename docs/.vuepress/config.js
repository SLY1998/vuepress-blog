module.exports = {
  title: "凡年换酒柴1998",
  description: "天戴其苍，地履其黄。纵有千古，横有八荒。前途似海，来日方长。",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "主页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date",
      },
    ],
    type: "blog",
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认 “标签”
      },
      // socialLinks: [
      //   // 信息栏展示社交信息
      //   { icon: "reco-github", link: "https://github.com/recoluan", text: "1" },
      //   { icon: "reco-npm", link: "https://www.npmjs.com/~reco_luan" },
      // ],
    },
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    subSidebar: "auto",
    lastUpdated: "Last Updated",
    author: "凡年换酒柴1998🌸",
    authorAvatar: "/avatar.jpg",
    startYear: "2022",
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      "sakura",
      {
        // 默认数量
        num: 8,
        //是否显示
        show: true,
        // 层级
        zIndex: 200,
        img: {
          // false 默认图 true 换图 需要填写httpUrl地址
          // replace: true,
          // 绝对路径
          // httpUrl: "/vuepress-blog/docs/.vuepress/public/flower.png",
        },
      },
    ],
    [
      //先安装在配置， npm install @vuepress-reco/vuepress-plugin-kan-ban-niang --save
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ["whiteCat", "wanko"],
        clean: false,
        messages: {
          welcome: "欢迎来到我的博客",
          home: "学习使我快乐",
          theme: "好吧，希望你能喜欢我的其他小伙伴。",
          close: "再见哦",
        },
        messageStyle: {
          background: "#000",
          color: "#fff",
          right: "68px",
          bottom: "250px",
        },
        width: 240,
        height: 352,
      },
    ],
    [
      //github地址：https://github.com/moefyit/vuepress-plugin-cursor-effects
      "vuepress-plugin-cursor-effects",
      {
        // size of the particle, default: 2
        size: 3,
        // shape of the particle, default: 'star'
        shape: "star",
        // z-index property of the canvas, default: 999999999
        zIndex: 999999999,
      },
    ],
    [
      //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "🌸加载成功了耶",
        hideIcon: "/failure.ico",
        hideText: "🥀哎呀，加载失败啦",
        recoverTime: 2000,
      },
    ],
    [
      //插件广场的流程图插件 先安装在配置 npm install vuepress-plugin-flowchart --save
      "flowchart",
    ],
    [
      //插件广场的sitemap插件 先安装在配置 npm install vuepress-plugin-sitemap --save
      "sitemap",
      {
        hostname: "https://www.glassysky.site",
      },
    ],
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码", //vuepress复制粘贴提示插件P 先安装在配置 npm install vuepress-plugin-nuggets-style-copy --save
        tip: {
          content: "复制成功!",
        },
      },
    ],
    ["@vuepress-reco/extract-code"],
  ],
};
