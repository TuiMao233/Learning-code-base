---
title: Zepto 前端框架开发
date: 2020-11-01
categories:
  - 前端学习笔记
tags: 
  - zepto
---
## zepto 特点：

1、体积 8kb
2、针对移动端的框架
3、语法同`jquery`大部分一样，都是`$`为核心函数
4、目前功能完善的框架

## 同 jquery 相似的API

### 作为函数使用

1. Fucntion
2. 选择器字符串
3. html 标签字符串
4. DOM code

### 作为对象使用

1. $.each()
2. $.trim()
3. ajax()，$.get()，$.post()
4. $.isArray(),....

概念：$调用返回的就是 jquery对象/zepto对象 伪数组(有时候只有一个元素)

## 与 jquery 不相同的 API

1. **标签属性 attr 与 prop**

   jquery：标签的固有属性，布尔值属性

   zepto：标签的自定义属性，用attr布尔值属性并且布尔值属性在标签体内没有定义时候`zepto:attr` 同样获取布尔值属性

2. **配置对象 jquery | zepto**

   jquery：不同使用配置对象添加id，class。。。

   zepto：可以使用配置对象---结构，样式分离，而且容易管理

3. offset 获取目标元素相对于视口的偏移量

   jquery：top ， left

   zeptop：top，left，width，height，content，padding，border

4. **元素操控 width | height | css | innerHeight |　innerWidth**

   jquery：

   - width() | height()：获取content内容区的值，没有单位
   - css()：获取content内容区的值，有单位
   - innerHeight()：content，padding，borde，没有单位

   zepto：

   - width() | height()：获取的content，补白，border
   - 没有innerHeight()，innerWidth()
   - css()：需要而外引入插件，语法也不一样

5. **通用遍历 each**
   jquery：能遍历数组，对象，不能遍历字符串，json
   zepto：能遍历数组，对象，字符串，json

6. **获取隐藏元素的宽高**

   jquery：能
   zepto： 不能

## zepto的 touch event

- tap 点击事件
- singleTap 点击事件
- longTap 长按事件，连续作用 `750ms`
- swipe 滑动事件，在同一个方向连续滑动`30px`才为滑动，否则就是点击
- longTap 长按事件 手指在目标对象上连续作用超过`750ms`算长按，否则算点击