const utils = require('./utils')

module.exports = {
  title: 'easy bookmark',
  description: '个人收藏',
  base: '/easy-bookmark/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ],
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d517a1ee1e75b0fd216b5183a8f32ac0";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();      
      `
    ]
  ],
  themeConfig: {
    logo: '/logo.jpg',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '博客',
        link: '/blogs/'
      },
      {
        text: '网站',
        link: '/website/'
      },
      {
        text: '日常',
        link: '/daily/'
      },
      {
        text: '前端',
        link: '/front/'
      },
      {
        text: '生活',
        link: '/life/'
      },
      { text: 'hexo', link: 'https://foreverwaiting.github.io/' }
    ],
    sidebar: utils.inferSiderbars(),
    lastUpdated: '上次更新',
    editLinkText: '在 GitHub 上编辑此页',
    repo: 'foreverwaiting/easy-bookmark',
    editLinks: true,
    docsDir: 'docs',
    smoothScroll: true,
    sidebarDepth: 3
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  }
}
