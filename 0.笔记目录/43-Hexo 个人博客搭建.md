# Hexo 简介

hexo 可以理解为是基于node.js制作的一个博客工具，不是我们理解的一个开源的博客系统。其中的差别，有点意思。hexo 正常来说，不需要部署到我们的服务器上，我们的服务器上保存的，其实是基于在hexo通过markdown编写的文章，然后hexo帮我们生成静态的html页面，然后，将生成的html上传到我们的服务器。简而言之：hexo是个静态页面生成、上传的工具。

# Hexo 脚手架的具体使用

~~~makefile
npm install hexo-cli -g # 安装脚手架
hexo init blog # 初始化blog文件为Hexo博客文件夹
cd blog	# 进入文件
npm install # 安装依赖
hexo server # 开启服务器
~~~

## Hexo 文件目录结构

~~~markdown
# 项目总文件
  - node_modules	用node安装的依赖包
  - scaffolds	模板文件, 当新建文章时，Hexo 会根据 scaffold 来建立文件。
  - source		存放用户资源文件
  - themes		主题文件夹, 里面可包含多个主题
  - _config.yml		_网站的配置信息，可以在此配置大部分的参数。
  - .gitignore		上传需要忽略的文件格式
  - package.json		项目基本信息(项目开发所需模块,项目名称,版本, es配置)
~~~

## _config.yml 配置修改项

**网站**

| 参数          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `title`       | 网站标题                                                     |
| `subtitle`    | 网站副标题                                                   |
| `description` | 网站描述                                                     |
| `keywords`    | 网站的关键词。使用半角逗号 `,` 分隔多个关键词。              |
| `author`      | 您的名字                                                     |
| `language`    | 网站使用的语言。对于简体中文用户来说，使用不同的主题可能需要设置成不同的值，请参考你的主题的文档自行设置，常见的有 `zh-Hans`和 `zh-CN`。 |
| `timezone`    | 网站时区。Hexo 默认使用您电脑的时区。请参考 [时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 进行设置，如 `America/New_York`, `Japan`, 和 `UTC` 。一般的，对于中国大陆地区可以使用 `Asia/Shanghai`。 |

**网址**

| 参数                         | 描述                                                         | 默认值                      |
| :--------------------------- | :----------------------------------------------------------- | :-------------------------- |
| `url`                        | 网址                                                         |                             |
| `root`                       | 网站根目录                                                   |                             |
| `permalink`                  | 文章的 [永久链接](https://hexo.io/zh-cn/docs/permalinks) 格式 | `:year/:month/:day/:title/` |
| `permalink_defaults`         | 永久链接中各部分的默认值                                     |                             |
| `pretty_urls`                | 改写 [`permalink`](https://hexo.io/zh-cn/docs/variables) 的值来美化 URL |                             |
| `pretty_urls.trailing_index` | 是否在永久链接中保留尾部的 `index.html`，设置为 `false` 时去除 | `true`                      |
| `pretty_urls.trailing_html`  | 是否在永久链接中保留尾部的 `.html`, 设置为 `false` 时去除 (*对尾部的 `index.html`无效*) |                             |