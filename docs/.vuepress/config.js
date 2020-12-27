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
                text: '前端',
                link: '/front/'
            },
            {
                text: '生活',
                link: '/life/'
            },
            {   text: 'hexo',
                link: 'https://foreverwaiting.github.io/'
            }
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
    },
}