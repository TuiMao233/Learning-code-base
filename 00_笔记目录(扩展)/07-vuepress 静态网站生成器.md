---
title: vuepress 静态网站生成器
date: 2020-11-01
categories:
  - 
tags: 
  - vuepress
---
## VuePress 简述

`VuePress` 是 `Vue` 驱动的静态网站生成器，具有简介，Markdown 支持，Vue 驱动，高性能等特点。

### 快速构建

~~~makefile
## 安装依赖 #
npm init
npm install -D vuepress
## 创建文件 #
mkdir docs && echo '## Hello VuePress' > docs/README.md
~~~

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

~~~makefile
npm run docs:dev
~~~

### 目录分析

https://www.vuepress.cn/guide/directory-structure.html#默认的页面路由

~~~
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
~~~

