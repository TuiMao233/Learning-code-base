## 嵌套式编程

~~~less
#box1{
  ...
  #box2{
    ...
  }
}
~~~

## 注释

~~~less
// 这是见不得人的注释
/* 这是想给人看见的注释 */
~~~

## 变量

~~~less
@color: pink;			/* 变量可以是css属性值 */
@m: margin;				/* 变量可以是css属性 */
@selector: #wrap;	/* 变量可以是选择器 */
~~~

## hover使用

默认情况下添加:hover编译时会认为这个是inner的子元素 **例.inner :hover{}**
加上&后让:hover{}可以让前面的空格不保留 **例.inner:hover{}**

~~~less
#warp {&:hover{...}}
~~~

## 普通混合

~~~less
.center(){
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
// 可以插入选择器大括号内
#warp {
  .center
}
~~~

## 参数混合

~~~less
.size(@width:10px,@height:10px) { // 可以带默认值
  width: @width;
  height: @height;
}
#warp {.size(60px,60px)}
~~~

## 引入外部less文件

~~~less
@import "triangle.less";// 引用库文件
~~~

## 匹配模式

~~~less
.triangle(T, 15px, 15rpx){
    
}
.triangle(B){} // 匹配B
.triangle(C){}

#warp {.triangle(T, 15px, 15px)}
~~~

## less运算

~~~less
/* 		  + - * /  		*/
#warp {widrh:(100 +100px)}
~~~

## less扩展

~~~less
//在#wrap选择器后面加入,sjx
.a { &:extend(.b)}   // ---> .a{color:red}
.b {color: red}
~~~

