# 全局实例 API

## 绘画构建(DrawPoster.build)

`DrawPoster.build(string|object)`

初始化构建绘制工具，传入查询字符串与配置对象，当配置字符串时，则直接查询该字符串的`canvas`，当配置对象时，`object.selector`则为必选项，以下是`options`的配置项，需要注意的是，返回值为`Promise`，返回绘制构建对象`dp`。

~~~js
/** DrawPoster.build 构建配置 */
interface DrawPosterBuildOpts {
    // 查询字符串(必须), 注意不要写错对应canvas id, 不需要传入#符号
    selector: string;
    // 选取组件范围
    componentThis?: any;
    // 类型为2d绘制, 默认开启, 在微信小程序的时候动态加载
    type2d?: boolean;
    // 是否在绘制的过程中, 显示加载框, 默认关闭
    loading?: boolean,
    // 当存在绘制图片时, 等待绘画完毕的时间（毫秒），仅在App中生效
    drawImageTime?: 100,
    // 加载提示文字
    loadingText?: '绘制海报中...',
    // 创建图片加载提示文字
    createText?: '生成图片中...'
}
~~~

## 多绘画构建(DrawPoster.buildAll)

`DrawPoster.buildAll(Array<string|object>)`

构建多个绘画工具，传入build函数中参数string | options构成的数组，返回多个绘制工具组成的对象。key为canvasId，value为构建对象。

## 挂载全局扩展(DrawPoster.use)

`DrawPoster.use(object)`

传入挂载配置对象，添加全局扩展方法，一般可用于海报绘制模板的封装，在不同页面有一样的海报模板时可以有效的减少代码量，使用方式如下。

一、在任意位置添加扩展（建议放在`main.js`中执行）

~~~js
import DrawPoster from 'u-draw-poster'
// 全局添加绘制个人海报的扩展实现
DrawPoster.use({
  name: "createMyCardImagePath",
  // dp为当前实例, 其余参数为自定义传入参数
  handle: async (dp, opts) => {
    // ..自定义构建内容..
    return await dp.createImagePath()
  }
})
~~~

二、页面中使用自定义扩展

~~~js
import DrawPoster from 'u-draw-poster'
async onReady() {
 const dp = await DrawPoster.build("canvas")
 dp.canvas.width = 100; dp.canvas.height = 100
 const posterImg = await dp.createMyCardImagePath({/*...*/})
}
~~~

## 挂载绘制扩展(DrawPoster.useCtx)

`DrawPoster.useCtx(object)`

传入挂载配置对象，添加全局绘制扩展方法，用于自定义绘制方法的定义，使用方式如下。

一、在任意位置添加扩展（建议放在`main.js`中执行）

~~~js
// 全局添加绘制二维码的绘画扩展实现
DrawPoster.useCtx({
  name: "drawQrCode",
  // canvas(绘制节点), ctx(绘制画笔), 其余参数为自定义传入参数
  handle: async (canvas, ctx, url, x, y, w, h) => {
    // ..自定义绘制内容..
  },
});
~~~

二、绘制中使用自定义扩展

~~~js
dp.draw(ctx=> {
  const url = 'http://www.baidu.com'
  await ctx.drawQrCode(url, 0, 0, 50, 50)
 })
~~~

## 绘制节点(dp.canvas)

`dp.canvas | dp.canvas.width | dp.canvas.height | ...`

`dp.canvas`为全局的绘制根节点，在微信小程序中拥有独享`API`。在其他端将作为全局宽高容器使用。当`dp.createImagePath`未传入参数时，默认使用 `dp.canvas.width | dp.canvas.height` 创建图片，以下是`dp.canvas`对象中存在的`api`与属性。

~~~js
interface Canvas {
  width: number;
  height: number;
  // 剩余参数为微信小程序独享API，只有微信小程序才拥有的API
  // 具体参考微信小程序文档：https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.html
}
~~~

## 创建绘制(dp.draw)

`dp.draw(async callback(ctx))`

绘制器, 接收执行器函数, 添加到绘制容器中，可改装为异步函数处理图片绘制，也可以为同步函数。

## 全局画笔(dp.ctx)

`dp.ctx`

全局绘制画笔，特殊情况可以使用，推荐只使用`dp.draw`函数进行绘制。

## 等待绘制(dp.awaitCreate)

`dp.awaitCreate()`

异步绘制绘制器堆栈，成功后清空绘制器容器，返回成功堆栈状况的数组(`boolean[]`)。

## 停止绘画(dp.stop)

`dp.stop()`

停止当前绘画栈，调用后将停止`dp.awaitCreate |dp.createImagePath `的执行。

## 创建图片(dp.createImagePath)

`dp.createImagePath(options)`

创建当前`canvas`绘制后的本地图片地址，如绘制器堆栈未清空时，会自动调用`dp.awaitCreate()`清空堆栈。`createImagePath` 会根据 `canvas.width` 与 `canvas.height` 进行创建图片。如果你想自定义参数，`awaitCreate` 方法可以接受一个配置对象，返回图片地址，以下为可配置项。

~~~js
interface CreateImagePathOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  destWidth?: number;
  destHeight?: number;
}
~~~
