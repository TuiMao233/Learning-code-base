/*
 * @Author: Mr.Mao
 * @Date: 2021-06-25 22:11:23
 * @LastEditTime: 2021-06-27 15:47:54
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
const defineConfig = require('./types/index.js')

const config = defineConfig({
  // 文档标题
  title: `Mr.Mao's blog`,
  // 文档说明
  description: 'For man is man and master of his fate.',
  // 静态资源基本路径
  base: '/mao-blog/',
  // 设置网站图标
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
  ],
  // 解决 markdown 图片引用路径问题 需安装：markdown-it-disable-url-encode
  markdown: {
    extendMarkdown: md => md.use(require("markdown-it-disable-url-encode"))
  },
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    // 博客信息
    author: 'Mr.Mao',
    authorAvatar: '/avatar.png',
    logo: '/avatar.png',
    startYear: '2020',
    // 导航栏配置
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      {
        text: '软件开发', icon: 'reco-document', items: [
          { text: '前端开发', link: '/软件开发/前端笔记/01-HTML-超文本标记语言' },
          { text: '后端开发', link: '/软件开发/后端笔记/01-php-后端应用' },
          { text: '知识扩展', link: `/软件开发/扩展笔记/01-Promise-异步解决方案` }
        ]
      },
      {
        text: '我的扩展', icon: 'reco-npm', items: [
          { text: '快速创建视图 | create-uniapp-view', link: '/我的扩展/create-uniapp-view' },
          { text: '多端海报绘制 | uni-draw-poster', link: '/我的扩展/u-draw-poster/01-base-desc' },
          { text: '表单策略验证 | form-strategy', link: '/我的扩展/form-strategy' },
        ]
      },
      {
        text: '规划指南', icon: 'reco-date', items: [
          { text: '生活指标', link: '/规划指南/01-日常指标' },
          { text: '总结与规划', link: '/规划指南/02-总结与规划' },
          { text: '职场 RULE', link: '/个人记录/职场事项' },
        ]
      }
    ],
    // 博客配置
    blogConfig: {
      tag: {
        location: 6,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      }
    },
    // 友情分享
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'recoluan@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: '烈火焚冰',
        desc: 'Live as i will die today.',
        link: 'http://flame-ice.gitee.io/awaken/'
      }
    ],
    // 是否自动展开右侧子导航
    subSidebar: 'auto',
    // 评论配置
    valineConfig: {
      appId: 'c4HAy9JoFGTiE89oLw7VY8Xs-gzGzoHsz',// your appId
      appKey: 'iIIot1pCWnqWpXVuNO0GbKbj', // your appKey
    }
  },
  plugins: {
    // 自动生成侧边栏
    "vuepress-plugin-auto-sidebar": {
      titleMap: {

      },
    },
    // 鼠标点击特效
    // "cursor-effects": {
    //   size: 2,                    // size of the particle, default: 2
    //   shape: 'star',  // shape of the particle, default: 'star', 'star' | 'circle'
    //   zIndex: 999999999           // z-index property of the canvas, default: 999999999
    // },
    // 音乐播放器设置
    "meting": {
      meting: {
        auto: 'https://y.qq.com/n/ryqq/playlist/8049517354',
        server: "tencent",
        type: "playlist",
        mid: "8049517354"
      },
      aplayer: {
        order: 'random',
        lrcType: 0,
        volume: 0.15,
        mini: true,
        autoplay: true
      },
    },
    // 动态标题配置
    "dynamic-title": {
      showIcon: "/favicon.ico",
      showText: "(/≧▽≦/)咦！又好了！",
      hideIcon: "/failure.ico",
      hideText: "(●—●)喔哟，崩溃啦！",
      recoverTime: 2000
    },
    // 修复中文命名
    'permalink-pinyin': {
      lowercase: true, // Converted into lowercase, default: true
      separator: '-' // Separator of the slug, default: '-'
    },
    // live2d 插件配置
    'vuepress-plugin-helper-live2d': {
      // 是否开启控制台日志打印(default: false)
      log: true,
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: koharu)
        model: 'koharu',
        display: {
          vOffset: -55, //  垂直偏移(default: 0)
        },
        mobile: {
          show: false // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 0.8 // 模型透明度(default: 0.8)
        }
      }
    }
  }
})

module.exports = config