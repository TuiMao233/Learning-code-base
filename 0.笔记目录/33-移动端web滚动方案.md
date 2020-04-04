# 移动web滚动问题

在移动端如果使用局部滚动，意思就是我们的滚动在一个固定宽高的div内触发，将该div设置成overflow:scroll/auto;来形成div内部的滚动，这时我们监听div的onscroll发现触发的时机区分android和ios两种情况，具体可以看下面表格:

|    机型(内核)     |   body滚动   |   局部滚动   |
| :---------------: | :----------: | :----------: |
|        ios        | 不能实时触发 | 不能实时触发 |
|      android      |   实时触发   |   实时触发   |
| ios wkwebview内核 |   实时触发   |   实时触发   |

不能实时触发表现：只在手指触摸的屏幕上一直滑动时和滚动停止的那一刻才触发。

# 关于模拟滚动

## 概念

正常的滚动：我们平时使用的scroll，包括上面讲的滚动都属于正常滚动，利用浏览器自身提供的滚动条来实现滚动，底层是由浏览器内核控制。

模拟滚动：最典型的例子就是iscroll了，原理一般有两种：

- 监听滚动元素的touchmove事件，当事件触发时修改元素的transform属性来实现元素的位移，让手指离开时触发touchend事件，然后采用requestanimationframe来在一个线型函数下不断的修改元素的transform来实现手指离开时的一段惯性滚动距离。
- 监听滚动元素的touchmove事件，当事件触发时修改元素的transform属性来实现元素的位移，让手指离开时触发touchend事件，然后给元素一个css的animation，并设置好duration和function来实现手指离开时的一段惯性距离。

## 方案比较

第一种方案由于惯性滚动的时机时由js自己控制所以可以拿到滚动触发阶段的scrolltop值，并且滚动的回调函数onscroll在滚动的阶段都会触发。第二种方案相比第一种要劣势一些，区别在于手指离开时，采用的时css的animation来实现惯性滚动，所以无法直接触发惯性滚动过程中的onscroll事件，只有在animation结束时才可以借助animationend来获取到事件，当然也有一种方法可以实时获取滚动事件，也是借助于requestanimationframe来不断的去读取滚动元素的transform来拿到scrolltop同时触发onscroll回调。

## 正常滚动和模拟滚动的性能比较

模拟滚动的fps值波动较大，这样滚动起来会有明显的卡顿感觉，各位体验的时候如果滚动超过10屏之后就可以明显感觉到两着的区别。

在使用模拟滚动时，浏览器在js层面会消耗更多的性能去改变dom元素的位置，在dom复杂层级深的页面更为高，所以在长列表滚动时还要使用正常滚动更好。

# 滚动和下拉刷新

方案1：借助iscroll的原理，整个页面使用模拟滚动，将下拉刷新元素放在顶部，当页面滚动到顶部下拉时，下拉刷新元素随着页面的滚动出现，当手指离开时收回，此方案实现起来较为简单直接借助iscoll即可，但是使用了模拟滚动之后在正常的列表滚动时性能上不如正常滚动。

方案2：页面使用正常滚动，将下拉刷新元素放置在顶部top值为负值（正常情况下不可见），当页面处于顶部时下拉，这时监听touchmove事件，修改scrollcontent的tranlateY值，同时修改下拉刷新元素的tranlateY值，将两者同时位移来将下拉刷新元素显示出来，手指离开时（touchend）收回，这种方案满足了在正常列表滚动时使用原生的滚动节省性能，只在下拉刷新时使用模拟滚动来实现效果。

方案3：方案2的改良版，唯一不同是将下拉刷新元素和scrollcontent放在一个div里，将下拉刷新元素的margintop设为负值，在下拉刷新时，只需要修改scrollcontent一个元素的tranlateY值即可实现下拉，在性能上要比方案2好。

还会有一个性能上的问题就是：当页面的列表过长，dom元素过多时，在模拟滚动，下拉刷新这段时间内，页面也会有卡顿现象，这里采取了一个优化策略即：

- 列表较长时dom数量较多时，在触发下拉刷新的时机时将页面视窗之外的dom元素隐藏或者存放在fragment里面。
- 在刷新完成之后手指离开（touchend）时将隐藏的元素显示出来。
- 需要注意的是，隐藏和显示视窗外的元素这个操作在下拉刷新时只会执行一次，并且只有在下拉刷新时才会执行。

**下面介绍如何去优化scroll事件的触发，避免scroll事件过度消耗资源：**

# 防抖（Debouncing）和节流（Throttling）

scroll 事件本身会触发页面的重新渲染，同时 scroll 事件的 handler 又会被高频度的触发, 因此事件的 handler 内部不应该有复杂操作，例如 DOM 操作就不应该放在事件处理中。 特别是针对此类高频度触发事件问题（例如页面 scroll ，屏幕 resize，监听用户输入等）。

## 防抖（Debouncing）

防抖技术即是可以把多个顺序地调用合并成一次，也就是在一定时间内，规定事件被触发的次数。

## 节流（Throttling）

防抖函数确实不错，但是也存在问题，譬如图片的懒加载，我希望在下滑过程中图片不断的被加载出来，而不是只有当我停止下滑时候，图片才被加载出来。又或者下滑时候的数据的 ajax 请求加载也是同理。这个时候，我们希望即使页面在不断被滚动，但是滚动 handler 也可以以一定的频率被触发（譬如 250ms 触发一次），这类场景，就要用到另一种技巧，称为节流函数（throttling）。

节流函数，只允许一个函数在 X 毫秒内执行一次。

与防抖相比，节流函数最主要的不同在于它保证在 X 毫秒内至少执行一次我们希望触发的事件 handler。

关于[防抖动与节流](https://link.juejin.im/?target=http%3A%2F%2Fblog.zhangbing.club%2FJavascript%2F%E9%98%B2%E6%8A%96%E5%8A%A8%E4%B8%8E%E8%8A%82%E6%B5%81%2F)，我的博客文章也有提及。

# 使用rAF（requestAnimationFrame）触发滚动事件

如果页面只需要兼容高版本浏览器或应用在移动端，又或者页面需要追求高精度的效果，那么可以使用浏览器的原生方法 rAF（requestAnimationFrame）。

window.requestAnimationFrame() 这个方法是用来在页面重绘之前，通知浏览器调用一个指定的函数。这个方法接受一个函数为参，该函数会在重绘前调用。

rAF 常用于 web 动画的制作，用于准确控制页面的帧刷新渲染，让动画效果更加流畅，当然它的作用不仅仅局限于动画制作，我们可以利用它的特性将它视为一个定时器。（当然它不是定时器）

通常来说，rAF 被调用的频率是每秒 60 次，也就是 1000/60 ，触发频率大概是 16.7ms 。（当执行复杂操作时，当它发现无法维持 60fps 的频率时，它会把频率降低到 30fps 来保持帧数的稳定。）

```js
var ticking = false; // rAF 触发锁
function onScroll(){
  if(!ticking) {
    requestAnimationFrame(realFunc);
    ticking = true;
  }
}
function realFunc(){
	// do something...
	console.log("Success");
	ticking = false;
}
// 滚动事件监听
window.addEventListener('scroll', onScroll, false);
```

实现以16.7ms 触发一次 handler，降低了可控性，但是提升了性能和精确度。

**从本质上而言，我们应该尽量去精简 scroll 事件的 handler ，将一些变量的初始化、不依赖于滚动位置变化的计算等都应当在 scroll 事件外提前就绪。**

# 避免在scroll 事件中修改样式属性 / 将样式操作从 scroll 事件中剥离



输入事件处理函数，比如 scroll / touch 事件的处理，都会在 requestAnimationFrame 之前被调用执行。

因此，如果你在 scroll 事件的处理函数中做了修改样式属性的操作，那么这些操作会被浏览器暂存起来。然后在调用 requestAnimationFrame 的时候，如果你在一开始做了读取样式属性的操作，那么这将会导致触发浏览器的强制同步布局。

# 滑动过程中尝试使用 pointer-events: none 禁止鼠标事件

pointer-events 是一个 CSS 属性，可以有多个不同的值,大概的意思就是禁止鼠标行为，应用了该属性后，譬如鼠标点击，hover 等功能都将失效，即是元素不会成为鼠标事件的 target。

pointer-events: none 可用来提高滚动时的帧频。的确，当滚动时，鼠标悬停在某些元素上，则触发其上的 hover 效果，然而这些影响通常不被用户注意，并多半导致滚动出现问题。对 body 元素应用 pointer-events: none ，禁用了包括 hover 在内的鼠标事件，从而提高滚动性能。

大概的做法就是在页面滚动的时候, 给 添加上 .disable-hover 样式，那么在滚动停止之前, 所有鼠标事件都将被禁止。当滚动结束之后，再移除该属性。

```js
// css 代码
.disable-hover,
.disable-hover * {
  pointer-events: none !important;
}
// js 代码
var body = document.body,
timer;
window.addEventListener('scroll', function() {
	clearTimeout(timer);
	if(!body.classList.contains('disable-hover')) {
		body.classList.add('disable-hover')
	}
	timer = setTimeout(function(){
		body.classList.remove('disable-hover')
	},500);
}, false);
```