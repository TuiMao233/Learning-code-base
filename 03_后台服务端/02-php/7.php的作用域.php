<?php
// PHP的作用域
// 默认的代码空间，全局空间
$global = 'global area';        //最终会被系统纳入到超全局变量中：$GLOBALS['global']

function world (){
//    echo $global;             //php中局部不可直接访问全局变量
      echo $GLOBALS['global'];  //可以访问
    /* 使用globals关键字创建的变量到哪里都可以访问 */
    global $global; //利用关键字创建一个外部名字一样，局部也可以访问的变量
    echo  $global;

    global $local; //创建一个外部也可以访问的局部变量 ,此版本无效
    $local = 568415315;
}
global $local;
echo  $local;
world();