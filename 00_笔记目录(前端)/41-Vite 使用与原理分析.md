## Vite 是什么

`Vite`，一个基于浏览器原生 `ES imports` 的开发服务器。利用浏览器去解析 `imports`，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 `Vue` 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 `rollup` 打包。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题。

- 快速冷启动服务器
- 即时热模块更换（HMR）
- 真正的按需编译

### Javascript 模块

首先，你需要把 `type="module"` 放到 `<script>` 标签中, 来声明这个脚本是一个模块:

```html
<script type="module" src="main.js"></script>
```

当 `script.type` 为 `module` 时，通过 `src` 及 `import` 导入的文件会发送 `http` 请求。

### 拦截请求

`Vite` 会拦截这些请求，并对请求的文件进行特殊的处理。

```js
import Vue from 'vue'
```

当通过 `import` 试图导入 `node_modules`内的文件时，`Vite` 会对路径进行替换，因为在浏览器中只有 **相对路径** 和 **绝对路径**。

```js
import Vue from '/@modules/vue'
```

### 代码实现

```js
// server.js
const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

app.use(async (ctx) => {
  const {
    request: { url, query }
  } = ctx;

  if (url == '/') {
    // 返回静态资源
    ctx.type = 'text/html';
    ctx.body = fs.readFileSync('./index.html', 'utf-8');
  }

  if (url.endsWith('.js')) {
    // 处理 js 文件
    const p = path.resolve(__dirname, url.slice(1));
    const res = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    // 返回替换路径后的文件
    ctx.body = rewriteImports(res);
  }
});

function rewriteImports(content) {
  return content.replace(/from ['|"]([^'"]+)['|"]/g, function ($0, $1) {
    // 要访问 node_modules 里的文件
    if ($1[0] !== '.' && $1[1] !== '/') {
      return `from '/@modules/${$1}'`;
    } else {
      return $0;
    }
  });
}

app.listen(3000, function () {
  console.log('success listen 3000');
});
```

## 解析 /@modules

接下来就是要把 `/@modules` 开头的路径解析为真正的文件地址，并且返回给浏览器。之前是 `webpack` 帮我们做了这件事。

通过 `import` 导入的文件 `webpack` 会去 `package.json` 文件内找 `moduel` 属性。

```json
{
  "license": "MIT",
  "main": "index.js",
  "module": "dist/vue.runtime.esm-bundler.js",
  "name": "vue",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/vue-next.git"
  },
  "types": "dist/vue.d.ts",
  "unpkg": "dist/vue.global.js",
  "version": "3.0.0-beta.15"
}
```

我们只需要把这个 `dist/vue.runtime.esm-bundler.js` 地址的文件返回就好。

### 代码实现

```js
if (url.startsWith('/@modules/')) {
  // 找到 node_modules 内的文件夹
  const prefix = path.resolve(
    __dirname,
    'node_modules',
    url.replace('/@modules/', '')
  );
  // 获取 package.json 内的 module 属性
  const module = require(prefix + '/package.json').module;
  const p = path.resolve(prefix, module);
  // 读取文件
  const res = fs.readFileSync(p, 'utf-8');
  ctx.type = 'application/javascript';
  // 读取的文件内还通过 import 导入了其他的依赖，继续把路径替换为 /@modules/
  ctx.body = rewriteImports(res);
}
```

## 解析单文件组件

大家都知道 `vue` 文件包含了三个部分，分别是 `template` `script` `style`。

`Vite` 对这几个部分分别进行了处理。

![script](https://user-gold-cdn.xitu.io/2020/6/30/17300ffb038180c4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)script

![css](https://user-gold-cdn.xitu.io/2020/6/30/17300ffb0382ec3d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)css

![template](https://user-gold-cdn.xitu.io/2020/6/30/17300ffb03d7f8a3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)template

接下来我们就要实现对这几个部分的处理。

### 处理 script

`@vue/compiler-sfc` 是用来解析单文件组件的，就像是 `vue-loader` 做的事情。

它解析的结果就像是下面这样。

![img](https://user-gold-cdn.xitu.io/2020/6/30/17300ffb041a749b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 代码实现

```js
const compilerSfc = require('@vue/compiler-sfc');

if (url.includes('.vue')) {
  const p = path.resolve(__dirname, url.slice(1));
  const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));
  if (!query.type) {
    ctx.type = 'application/javascript';
    ctx.body = `
      // 拿到 script 的内容
      const __script = ${descriptor.script.content.replace('export default ', '')}

      // 如果有 style 就发送请求获取 style 的部分
      ${descriptor.styles.length ? `import "${url}?type=style"` : ''}

      // 发送请求获取 template 的部分
      import { render as __render } from "${url}?type=template"

      // 渲染 template 的内容
      __script.render = __render;
      export default __script;
    `;
  }
}
```

## 处理 template

`@vue/compiler-dom` 是用来编译 `template` 的。

因为返回给浏览器的 `vue` 是 `runtime` 版本，是没有 **编译器** 的，所有要在服务端编译后返回给浏览器。

```js
const compilerDom = require('@vue/compiler-dom');

...
if (query.type === 'template') {
  const template = descriptor.template;
  // 在服务端编译 template 并且返回
  const render = compilerDom.compile(template.content, {
    mode: 'module',
  }).code;
  ctx.type = 'application/javascript';
  ctx.body = render;
}
```

### ###

## 处理 style

对 `style` 的处理有一丢丢特殊，可以看到返回的内容中调用了 `updateStyle` 方法，在 `Vite` 中是把它放在了 **热更新** 的模块中，在这里我们还没有实现热更新，所以先 `hash` 下，在 `client` 实现该功能。

```js
// server.js
if (query.type === 'style') {
  const styleBlock = descriptor.styles[0];
  ctx.type = 'application/javascript';
  ctx.body = `
    const css = ${JSON.stringify(styleBlock.content)};
    updateStyle(css);
    export default css;
  `;
}
```

方法1使用了 **可构造样式表** 在这里放两个资料供大家参考。

- [可构造样式表 - 通过javascript来生成css的新方式](https://www.jianshu.com/p/0322405c15e6)
- [微软提出 CSS Modules V1 ：通过 import 语句将 CSS 模块导入到组件中](https://www.infoq.cn/article/tfu5VFMYSxt89KOLNLp6)

方法2就不 **balabala** 了。

```html
<body>
  <div id="app"></div>
  <script>
    // hash: 规避 shared 文件内的环境判断
    window.process = {
      env: {
        NODE_ENV: 'dev',
      }
    };

    function updateStyle(content) {
      // 方法1 
      let style = new CSSStyleSheet();
      style.replaceSync(content);
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        style,
      ];

      // 方法2
      let style = document.createElement('style')
      style.setAttribute('type', 'text/css')
      style.innerHTML = content
      document.head.appendChild(style)
    }
  </script>
  <script type="module" src="./main.js"></script>
</body>
```

### ###

## 总结实现流程

1. 页面入口请求解析（`index.html`）
2. 模块请求解析（`<script type="module" src=".." />`）
3. 裸模块请求解析（`import xxx from '/@modules/xxx'`）
4. `SFC ` 模块请求解析（`import xxx from 'xxx.vue'`）
5. `SFC > script ` 模块请求解析（`sfc中的script标签内容`）
6. `SFC > template` 模块请求解析（`sfc中的template标签内容`）
7. `SFC > style` 模块请求解析（`sfc中的style标签内容`）

### 实现流程图

![](img/Vite/flow-chart.png)