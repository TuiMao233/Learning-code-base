# 绘制海报工具简述

- 创建绘制海报`canvas`矩形方法，内置了图片绘制，圆角矩形绘制，换行字体绘制等方法。
- 接近原生开发体验，上手快，只需考虑业务逻辑，而不用考虑其他问题。
- 拥有良好的语法架构，不会在绘制`uni/wx`矩形时陷入回调地狱。
- 支持原生小程序，与`uniapp`多端应用。当是环境为原生小程序时，自动切换为性能更好的`type2d`绘制方式。
- 将复杂的逻辑组合为简单的方法，扩展性强，可使用 `use|useCtx` 引入扩展。
- 支持`typescript`，支持`vue3`模板，具体使用参考 [useDrawPoster](https://github.com/TuiMao233/u-draw-poster/tree/master/docs/use.md)。

api文档：[u-draw-poster](https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poster.html)

插件市场：[dcloud/u-draw-poster](https://ext.dcloud.net.cn/plugin?id=3237)

**npm 安装插件**

~~~
npm i --save-dev u-draw-poster
~~~

## 1. 创建海报绘制工具

~~~html
<!-- #ifdef MP-WEIXIN -->
<canvas id="canvas" type="2d" style="width:100px; height:100px" />
<!-- #endif -->
<!-- #ifndef MP-WEIXIN -->
<canvas canvas-id="canvas" id="canvas" style="width:100px; height:100px" />
<!-- #endif -->
~~~

~~~js
// 注意：如果使用HBuilder引入, 需要引入 '@/js_sdk/u-draw-poster'
import DrawPoster from 'u-draw-poster'
async onReady() {
 // 传入选择器, 初始化绘制工具(注意, 不需要传入#符号) 当微信小程序时, 将自动启用type2d绘制
 const dp = await DrawPoster.build("canvas")   
}
~~~

## 2. 设置画布尺寸
~~~js
// 设置长高为100px的矩形宽高
dp.canvas.width = 100
dp.canvas.height = 100
~~~

## 3. 绘制任意内容
~~~js
// 绘制背景与文字
dp.draw((ctx) => {
    ctx.fillStyle = "#F4F4F4";
    ctx.fillRect(0, 0, dp.canvas.width, dp.canvas.height);
    ctx.textBaseline = "top";
    ctx.textAlign = "start";
    ctx.fillStyle = "white";
    ctx.font = `bold ${22}px sans-serif`;
    ctx.fillText('周先生', dp.canvas.width/2, 38.5);
})
// 绘制图片内容
dp.draw(async (ctx) => {
    //.......
})
~~~
值得注意的是, `draw`方法会自动的执行`ctx.save/ctx.restore`, 不需要人为操纵绘画栈.
~~~js
dp.draw((ctx) => {/* ... */})
// 相当于
ctx.save()
/* ... */
ctx.restore()
~~~

## 4. 进行绘制

`dp.draw`并不会马上绘制，只是将该任务添加到了任务栈，需要使用`dp.awaitCreate`函数进行绘制，该函数在绘制完毕后将弹出所有任务。
`dp.awaitCreate`在非`2d`绘画中，执行绘画任务完毕后，将自动执行`ctx.draw`方法，并在draw绘画才算异步结束。

~~~js
dp.draw((ctx) => {/* ... */})
dp.draw(async (ctx) => {/* ... */})
// 由于每个任务都有可能会有异步的绘制任务, 所以得需要使用await等待绘制
const result = await dp.awaitCreate();
// 绘制成功将返回每个任务的绘制状况组成的数组
console.log("draw绘制状况:", result); // draw绘制状况: [true]
~~~

[^为什么这么做]: 当全部同步绘制时，将会出现绘制时间保持不一致的情况。这样就会导致一个问题，绘制图层覆盖导致显示未达到预期效果，之所以设计为异步等待，也是为了绘制图层能保持一致顺序。

## 5. 生成图片本地地址

如需要保存为图片时，可以使用`dp.createImgUrl` 进行创建图片本地地址，在由`wx`或`uni`的`api`进行保存。
~~~js
dp.draw(async (ctx) => {/* ... */})
const result = await dp.awaitCreate();
const posterImgUrl = await dp.createImagePath();
console.log("draw绘制状况:", result); // [true]
console.log("绘制生成本地地址:", posterImgUrl); // ...tmp...
~~~
你也可以不使用`dp.awaitCreate`方法，当调用`dp.createImagePath`时会自动检测任务列表，如果有则执行绘制任务后在创建地址。

~~~js
dp.draw(async (ctx) => {/* ... */})
// 跳过drawPoster.awaitCreate直接生成地址
const posterImgUrl = await dp.createImagePath();
console.log("绘制生成本地地址:", posterImgUrl);
~~~

我的博客：[Mr.Mao'blog](https://tuimao233.gitee.io/mao-blog/)

联系方式：951416545@qq.com