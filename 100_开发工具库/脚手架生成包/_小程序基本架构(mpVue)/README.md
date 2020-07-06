# mpvue_cli 最佳实践

> A Mpvue best practices project

## 项目结构分析

~~~makefile
├── build    # webpack相关配置
├── config    # vue基本配置文件(监听端口，打包输出等相关配置)
├── src    # 小程序资源文件夹
|   ├── api    # flyio 请求接口配置与暴露
|   ├── pages    # 小程序页面(组件化)
|   ├── store    # vuex集中式状态数据管理
|   ├── app.json    # 小程序页面配置
|   ├── app.vue    # 全局样式与JS
|   └── main.js    # vue入口文件
├── .babelrc    # ES6语法编译配置,依赖将es6代码转换为浏览器识别的代码
├── .editorconfig    # 开发工具配置插件
├── .eslintignore    # eslint忽略文件
├── .eslintrc    # eslint配置
├── .gitignore    # 云端忽略文件
├── .postcssrc.js    # CSS样式兼容配置
├── index.html    # 页面入口
├── package.json    # 项目基本信息(项目开发所需模块,项目名称,版本)
├── package.swan.json    # 暂无说明
├── project.config.json    # 小程序项目配置
├── project.swan.json    # 暂无说明
└── README.md    # 说明文件
~~~

## mpvue vs code 插件清单

~~~markdown
# 必要插件
- create-mpvue-view 快速生成mpvue-page，mpvue-component
- minapp -> 微信小程序标签、属性的智能补全（同时支持原生小程序、mpvue 和 wepy 框架，并提供 snippets）
- Vetur -> 为vue文件提供格式化
- Vue VSCode Snippets -> 为vue文件提供代码提示
- Vue peek -> Vue文件引入的鼠标点击快速跳转
# 可选插件
- CodeMetrics -> 检测代码圈复杂度(优化代码质量)
- Code Runner -> 运行部分JS代码(调试逻辑用)
- Settings Sync -> 将配置储存到github中
- Better Comments -> 为注释提供多样式
- any-rule -> 正则规则集
~~~

## mpvue 项目优化清单

开发时打开`Vue.config._mpTrace = true`。

谨慎引入第三方库，权衡收益。

添加数据到data中时要克制，能精简尽量精简。

图片记得要压缩，图片在显示时才渲染。

vuex保持数据精简，必要时可先存storage。

## 构建命令清单

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```


