# zepto

## 特点：

1、体积8kb
2、针对移动端的框架
3、语法同jquery大部分一样，都是$为核心函数
4、目前功能完善的框架体积最小的左右

## 同jquery相似的语法

核心：$
    --作为函数使用
    参数：
        1、function(){}
        2、选择器字符串
        3、html标签字符串
        3、DOM code
    --作为对象使用
    方法；
        1、$.each()
        2、$.trim()
        3、$.ajax()   $.get()  $.post()
        4、$.isArray()
    jquery对象/zepto对象
    概念：$调用返回的就是 jquery对象/zepto对象 伪数组(有时候只有一个元素)

* zepto同jquery不同的API
    * attr同prop
        jquery：标签的固有属性，布尔值属性<prop>
                标签的自定义属性，用attr布尔值属性并且布尔值属性在标签体内没有定义时候<attr>
        zepto:attr同样获取布尔值属性。
        
    * DOM操作
        配置对象：
            jquery不同使用配置对象添加id，class。。。
            zepto可以使用配置对象---结构，样式分离，而且容易管理
        
    * offset()----用来获取目标元素相对于视口的偏移量  对象
        jquery：top ， left
        
        zeptop：top，left，width，height(content,补白，border)
        
    * width(),height()
        jquery:
            1、width(),height()  获取content内容区的值，没有单位
            2、.css  获取content内容区的值，有单位px
            3、 innerHeight()   content,padding没有单位
               innerHeight()   content,padding border没有单位
        zepto:
            1、width(),height()获取的content，补白，border
            2、没有innerHeight()，innerHeight()
            3、.css()
        
    * 事件委托
        原理：利用冒泡的原理将事件绑定到父元素/祖先元素身上，event.target指向的子元素
        zepto：
            1、委托同一个父元素身上
            2、同一个世界
            3、操作关联，操作对应的元素/类
            4、顺序
            5、谁操作的关联类就是谁触发的
        
    * each
        jquery：能遍历数组，对象，不能遍历字符串/json对象/json数组
        zepto：能遍历数组，对象，字符串
        
    * 隐藏元素的宽高
        jquery：能获取
        zepto： 不能宽，高
        

zepto的touch event
    * tap点击事件
    * singleTap()点击事件
    * doubleTap()双击事件
    * longTap()长按事件--连续作用750ms
    * 滑动事件(浏览器的默认行为---翻页---touch-action)
    1、swipe滑动事件 在同一个方向连续滑动30px才为滑动，否则就是点击
    2、longTap长按事件 手指在目标对象上连续作用超过750ms算长按，否则算点击
    
                
       