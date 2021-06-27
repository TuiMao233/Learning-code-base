---
title: 如何让 uni-cli 创建的项目拥有运行自动打开开发者调试工具的能力
date: 2020-11-15
categories:
  - 扩展知识
tags: 
  - uni
  - cli
  - cmd
  - node
---

## 前言：

关于前端的IDE，流行的无非也就那么几款，但若要问那款编辑器最好用，那无疑是`vscode`开发的最舒适了，不得不说`vscode`的代码提示，引入跳转，自动补全引入语句等功能，并且`git`支持很不错，加上`typescript`后开发体验真的是提升到了一个很高的档次。

但 `HBuilderX` 在这些方面的支持真是太差了，只有内置的代码提示，没有`d.ts`文件的支持，自定义扩展功能少，使用`typescript`开发完全丢失了类型提示，使得`typescript`在编写时发现问题的这个优势完全丢失。

所以我们公司的多端程序都使用了`uni-cli`脚手架搭建的项目运行，在`vscode`中运行，但相比`HBuilderX`却缺少了运行后自动打开小程序的功能，那么问题来了，`HBuilderX`都能做到，为什么我们`vscode`做不到呢！

其实做这个很简单，导致我一度怀疑`HBuilderX`为了推广他自家的编译器而不做这个功能...（事实上确实如此）目前我已经做成了一个第三方插件，直接使用即可，该文章的主要目的是记录当中所用到的技术，如怎么自己做一个脚手架程序等。

个人博客：[gitee.io/mao-blog](https://tuimao233.gitee.io/mao-blog/)

脚手架自动打开小程序：[open-devtools](https://github.com/TuiMao233/open-devtools)

## 微信小程序命令行v2

微信开发者工具提供了`cli`命令，可用于在外部使用`cmd`打开和操控项目，这里只使用部分指令，感兴趣的同学可以去看[官网文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)

首先找到开发者工具的目录下，`cmd`打开当前目录，我们创建一个小程序项目放在开发者工具的根目录下，然后试着使用命令行打开项目。

~~~makefile
cd F:\softs\微信web开发者工具
cli open --project F:\softs\微信web开发者工具\demo
~~~

那么运行之后，就会发现开发者工具自动打开了程序，这里需要注意，运行的路径必选得是绝对路径，不然是会报错的。

## npm 命令行调用 node 工具

这里只记录了我使用的方式，说的可能不是很全面，建议去看一下这篇文章，[从0开始用node写一个自己的命令行程序](https://www.jianshu.com/p/57eaec6cf97b)

~~~makefile
# 初始化项目
npm init

# 修改 package.json 中bin字段
"bin": {
    "open-dev": "./index.js"
}

# 新建 index.js
#!/usr/bin/env node
console.log('open-dev')
# `#!/usr/bin/env node` 的意思是让系统自己去找node的执行程序，该行必不可少。

# 执行 npm link
npm link

# 运行脚手架工具
git-tool

# index.js 中 process.argv 可用来获取命令行参数
# 注意 #!/usr/bin/env node 为是必须的
#!/usr/bin/env node
console.log('open-dev')
console.log(process.argv) # ['...', '...', ....]
~~~

## 使用 shelljs 调用 cmd 命令

ShellJS是在Node.js API之上的Unix shell命令的可移植**（Windows / Linux / macOS）**实现。是基于Node.js API的封装。其他API可以查看官网：[shelljs](https://github.com/shelljs/shelljs)

~~~js
const shell = require('shelljs')
// 进入目录
shell.cp('F:\\softs\\微信web开发者工具')
// 调用命令, 这里需要注意, 调用命令时需要在后面加上 --color=always 不然就没有命令行颜色了
shell.exec('cli open --project F:\softs\微信web开发者工具\demo --color=always')
~~~

## 获取当前执行环境

我们来仔细的观察一下 `uni-cli` 自带的命令中，前面存在很长一大串的命令，那这个命令具体作用就是用于区分当前运行环境和类型的。如果想了解更多，可以去看一下 cross-env 的官方文档。

运行命令携带参数`cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin`

~~~js
"dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin open-devtools",
~~~

将相当于在我们的命令`js`中`process.env`环境变量里添加了两个参数

~~~js
const NODE_ENV = process.env.NODE_ENV // development
const UNI_PLATFORM = process.env.UNI_PLATFORM // mp-weixin 
~~~

## 获取 pageage.json 中的字段

我们需要知道，微信开发者工具的路径是不确定的，那么需要在一开始先确定下来，我的思路是放在项目中的`pageage.json`储存。

~~~json
{
    "devtoolsConfig":{
        "weixin": "F:\\softs\\微信web开发者工具"
    }
}
~~~

## 脚手架实开发

那么有了这些基本的东西，基本的思路已经有了，实现功能具体路线为

基本路径与开发者工具的路径 》》运行开发者工具》》调用对应自身项目运行命令

~~~js
// index.js
#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const shell = require('shelljs')
const utils = require(path.resolve(__dirname, './src/utils'))

// 运行项目路径读取, 这里需要注意当安装依赖时, 当前路径为xxx/node_module/xxx, 所以需要回退两层
const PRESET_PATH = path.resolve(__dirname, '../../')
const PACKAGE_PATH = path.resolve(PRESET_PATH, './package.json')

// 当前运行环境变量与运行命令, getRunPresetExec是我封装的方法, 可以获取当前对应的运行命令
// 例如 development|mp-weixin 则对应 -> npx cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch --color=always
const NODE_ENV = process.env.NODE_ENV
const UNI_PLATFORM = process.env.UNI_PLATFORM
const EXEC_CODE = utils.getRunPresetExec(NODE_ENV, UNI_PLATFORM)

// 微信项目源码路径, 这里对于项目中的小程序源码路径
const EXEC_CODE_TYPE = NODE_ENV === 'development' ? 'dev' : 'build'
const WEIXIN_PRESET_PATH = path.resolve(PRESET_PATH, `dist/${EXEC_CODE_TYPE}/mp-weixin`)

// 获取开发者工具目录(pageage.json)
const PACKAGE_CONFIG = JSON.parse(fs.readFileSync(PACKAGE_PATH).toString())
const DEVTOOLS_CONFIG = PACKAGE_CONFIG.devtoolsConfig || {}
const WEIXIN_DEVTOOLS_PATH = DEVTOOLS_CONFIG.weixin

// 如果调用环境是微信
if (UNI_PLATFORM === 'mp-weixin') {
  // 先递归写入, 防止无内容导致调试工具报错
  // 这里需要注意, 不能直接写入文件, 需要先创建好完整的目录
  // 不然会直接报错, 这里的mkdirsSync是我封装的递归创建目录的方法
  utils.mkdirsSync(WEIXIN_PRESET_PATH)
  const writeFileStr = JSON.stringify({ appid: 'touristappid', projectname: 'open-devtools' }, null, "\t")
  fs.writeFileSync(path.resolve(WEIXIN_PRESET_PATH, './project.config.json'), writeFileStr, { flag: 'w' })
  // 打开小程序项目
  const openDevToolsShell = `cli open --project ${WEIXIN_PRESET_PATH} --color=always`
  shell.cd(WEIXIN_DEVTOOLS_PATH)
  // 打开完毕后, 运行编译工具
  shell.exec(openDevToolsShell, () => {
    shell.cd(PRESET_PATH)
    shell.exec(EXEC_CODE)
  })
  // 返回当前条件, 阻止代码运行
  return false;
}

// 如上方代码没有执行, 则直接执行运行项目命令
shell.cd(PRESET_PATH)
shell.exec(EXEC_CODE)
~~~

## 总结

这次也是自己尝试写了个命令行工具，当然，结合多种需求场景，可以发挥出很大的作用，不过如今无论是`create-react-app`，还是`vue-cli`的封装都十分完善了，但我们也需要知道是如何实现的，才能当遇到这种常见的时候可以变通。

觉得还可以的就去 [open-devtools](https://github.com/TuiMao233/open-devtools) 点给`start`吧

