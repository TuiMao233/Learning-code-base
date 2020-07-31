# PHP 简介

PHP即“[超文本](https://baike.baidu.com/item/超文本)[预处理器](https://baike.baidu.com/item/预处理器)”，是一种通用[开源](https://baike.baidu.com/item/开源/246339)[脚本语言](https://baike.baidu.com/item/脚本语言/1379708)。PHP是在服务器端执行的脚本语言，与[C语言](https://baike.baidu.com/item/C语言/105958)类似，是常用的网站编程语言。PHP独特的语法混合了C、[Java](https://baike.baidu.com/item/Java/85979)、[Perl](https://baike.baidu.com/item/Perl/851577)以及 PHP 自创的语法。利于学习，使用广泛，主要适用于[Web](https://baike.baidu.com/item/Web/150564)开发领域。

## 主要特点

- 开源性和免费性，由于PHP的[解释器](https://baike.baidu.com/item/解释器/10418965)的源代码是公开的，所以安全系数较高的网站可以自己更改PHP的解释程序。另外，PHP 运行环境的使用也是免费的。 
- 快捷性，PHP是一种非常容易学习和使用的一门语言，它的语法特点类似于C语言，但又没有C语言复杂的地址操作，而且又加入了[面向对象](https://baike.baidu.com/item/面向对象/2262089)的概念，再加上它具有简洁的语法规则，使得它操作编辑非常简单，实用性很强
- 数据库连接的广泛性，PHP可以与很多主流的数据库建立起连接，如[MySQL](https://baike.baidu.com/item/MySQL/471251)、[ODBC](https://baike.baidu.com/item/ODBC/759553)、[Oracle](https://baike.baidu.com/item/Oracle/301207)等，PHP是利用编译的不同函数与这些数据库建立起连接的，[PHPLIB](https://baike.baidu.com/item/PHPLIB/1972303)就是常用的为一般事务提供的基库。
- 面向过程和面向对象并用，在PHP语言的使用中，可以分别使用面向过程和面向对象， 而且可以将PHP面向过程和面向对象两者一起混用，这是其它很多编程语言是做不到的。

## 主要优点

- 流行，容易上手，PHP是目前最流行的编程语言，这毋庸置疑。它驱动全球超过2亿多个网站，有全球超过81.7%的公共网站在[服务器端](https://baike.baidu.com/item/服务器端/3369401)采用PHP。PHP常用的数据结构都内置了，使用起来方便简单，也一点都不复杂，表达能力相当灵活。
- 开发职位很多，在服务器端的网站编程中PHP会更容易帮助你找到工作。很多互联网相关企业都在使用PHP开发[框架](https://baike.baidu.com/item/框架/1212667)，所以可以说市场对PHP的开发程序员的需求还是比较大的。
- 仍然在不断发展，PHP在不断兼容着类似closures和命名空间等技术，同时兼顾性能和当下流行的框架。版本是7之后，一直在提供更高性能的应用。
- 可植入性强，PHP 语言在[补丁](https://baike.baidu.com/item/补丁/89106)漏洞升级过程中，核心部分植入简单易行，且速度快。
- 拓展性强，PHP 语言在数据库应用过程中，可以从数据库调取各类数据，执行效率高。

## 主要缺点

- PHP的解释运行机制，在 PHP 中，所有的[变量](https://baike.baidu.com/item/变量/3956968)都是页面级的，无论是[全局变量](https://baike.baidu.com/item/全局变量/4725296)， 还是[类](https://baike.baidu.com/item/类/6824577)的[静态成员](https://baike.baidu.com/item/静态成员/9569025)，都会在页面执行完毕后被清空。
- 设计缺陷，缺少关注PHP被称作是不透明的语言，因为没有[堆栈](https://baike.baidu.com/item/堆栈/1682032)追踪，各种脆弱的输入。没有一个明确的设计哲学。早期的PHP受到Perl的影响，带有out参数的标准库又是有C语言引入，面向对象的部分又是从 [C++](https://baike.baidu.com/item/C%2B%2B/99272)和[Java](https://baike.baidu.com/item/Java/85979)学来的。
- 对递归的不良支持，PHP并不擅长递归。它能容忍的[递归函数](https://baike.baidu.com/item/递归函数/5634537)的数量限制和其他语言比起来明显少。

# PHP 环境配置细节

### 暂无...

# PHP 基本使用

## 基本语法

~~~php
<?php // 代表php代码的开始
// 由$为前缀定义变量
$count_1 = 50;
$count_2 = 50;
if ($count_1 == $count_2) {
  echo '数值匹配成功'; // 输出语句, 浏览器访问时自动被编译为字符串
  unset($count_1); // 卸除变量
  echo $count_1; // 变量卸除后, 变量一则不存在, echo无任何效果
    
  // 错误抑制符
  @('wadwada'+'wdwandia');
    
  // 模板字符串
  echo "count_1:{$count_1}"
}
?> // 代表php代码的结束, 不填写默认在编译时自动添加
~~~

## 操作符集

~~~php
/*
= 赋值运算

+ 累加 - 相减 * 乘法
/ 除法 % 余数

> 大于 >= 大于等于
< 小于 <= 小于等于
== 等于 != 不等于
=== 全等于 !== 不全等于

|| 逻辑或 && 逻辑且
! 取反

. 串连接 .= 拼接并赋值(js中的+=)

@ 错误抑制

xx ? xx : xx 三元表达式

++ 原值+1 -- 原值-1

+= 相加并赋值 .= 拼接并赋值
*= 相乘并赋值 /= 相除并赋值
%= 相余并赋值

& 按位与 -> 两个数都为1, 结果为1, 否则为0
| 按位或 -> 两个数应该为1, 结果为1, 否则为0
~ 按位非 -> 0/1之前取反
^ 按位异或 -> 两个相同则为0, 不同则1
<< 按位左移 -> 整个数(32位), 向左移动一位, 右边补0
>> 按位右移 -> 整个数(32位), 向右移动一位 (正数补0, 负数补1)
*/
~~~

## 变量传值

~~~php
<?php
$var1 = 50;
$var2 = $var1; // $var2引用$var1内存地址
echo $var2.'<br />'; // 50
$var2 = 60; // 当$var2重新赋值时, 将重新开辟一条内存存放数据, 与$var1完全不相干
echo '$var1:'.$var1.'$var2:'.$var2; // $var1:50$var2:60
~~~

## 常量定义

~~~php
/* 1、常量不需要'$'符号，一旦使用，系统就认为是变量
 * 2、常量的名字组成由字母、数字和下划线组合
 * 3、常量是不允许被修改的 */
<?php
// 方式一: 使用函数定义常量: define
define('PI',3.14);
echo PI.'---'; // 3.14

// 方式二: 使用count关键字定义
const PII=3;
echo PII.'---'; // 3

// count关键字不允许定义特殊字符, 定义特殊字符采用函数定义, 由constant函数输出
define('-_-', '这是一个神奇的常量');
echo constant('-_-');
~~~

## 系统/魔术变量

~~~js
echo '<br/>';
echo 'get请求参数: '.$_GET.'<br/>';
echo 'post请求参数: '.$_POST.'<br/>';
echo 'php版本号: '.PHP_VERSION.'<br/>';
echo '整形大小: '.PHP_INT_SIZE.'<br/>';
// 如带-符号的整数则为负数
echo '整形能表示的最大的数: '.PHP_INT_MAX.'<br/>';
~~~

在php中还有一些特殊的常量，他们有双下划线开始+常量名+双下划线结束，这种常量称之为系统魔术常量：魔术常量的之通常会跟着环境变化，但用户改变不了。

~~~php
echo '当前脚本执行绝对路径: '.__DIR__.'<br/>';
echo '当前脚本执行绝对路径(带文件名): '.__FILE__.'<br/>';
echo '当前所属的脚本行数: '.__LINE__.'<br/>';

echo '当前所属的命名空间: '.__NAMESPACE__.'<br/>';
echo '当前所属的类: '.__CLASS__.'<br/>';
echo '当前所属的方法: '.__METHOD__.'<br/>';
~~~

# php 数据类型

## 八种数据类型

数据类型，在php中指的是存储的数据本身类型，而本身变量的类型。php是一种弱语言，变量本身没有数据类型。

~~~php
<?php
/* 基本数据类型 */
$integer = 500; // 整数型 -> 系统分配四个字节储存,表示整数类型
$float = 4.56; // 浮点型 -> 系统分配八个字节储存，表示小数或者整数存不下的整数
$string = "啦啦啦"; // 字符型 -> 系统根据实际长度分配，表示字符串
$boolean = true; // 布尔型

/* 复合数据类型 */
// 对象型 -> 用于存放无序数据, 一个键对应一个值
$obj = new class {};
class obj {};
// 数组型 -> 用于存放有序/无序数据, 一个下标对应一个值
$arr = array( 0 => '110', 1 => '120' );
$arr2 = [32131, 123213, 12312];
$arr[3] = '1201';
$arr['numc'] = '1313'; // php允许使用字符串作为下标

/* 特殊数据类型 */
// 资源型 -> 存放资源数据（php外部数据，如数据库、文件）
// 空类型 -> null
$null = null;
~~~

## 类型转换

 在PHP中有两种类型转换方式
自动转换：系统根据需求自己判定，自己转换（用的比较多，效率偏低）
强制（手动）转换：认为根据需要的目标类型转换

在转换的过程中，用的比较多的就是转布尔类型（判断）和转数值类型（算数运算）

其他类型转布尔类型：true或flase，在php中比较少类型转换为flase

~~~php
$a = 'abc1.1.1';
$b = '1.1.1abc';
// echo $a + 600; 自动转换 -> php7会报错
// 强制转换 -> (类型)$变量;

// 字符串转数值规则: 第一个字符串是字母 则为0
echo (integer)$a; // 0
echo (integer)$b; // 1
echo '--';
// 布尔值无法正常echo显示, 当true时echo为1, false时无任何反应
echo true;
// 布尔值输出采用var_dump函数
var_dump(true); // bool(true)
var_dump(false); // bool(false)

// 使用判断类型函数 is_[类型/类型简写](值)
var_dump(is_int($a)); // bool(false)
var_dump(is_string($a)); // bool(true)
~~~

## 伪类型

~~~php
Number // -> 整数或浮点数
mixed // 任意类型
~~~

# php 函数类型

## 函数以及作用域

~~~php
// 默认的代码空间为全局空间
// 在全局空间定义常量时, 最终会被系统纳入到超全局变量中-> $GLOBALS['global']
$global = 'global area';

function echoWorld()
{
  // 在php中, 函数内部不允许直接访问全局变量
  // echo $global; // 报错

  // 需访问全局变量时, 使用$GLOBALS常量进行访问
  echo $GLOBALS['global']; // global area

  // 使用global关键字创建可访问全局变量
  global $global;
  echo $global; // global area

  // 可在函数内部使用global创建可访问全局变量(需执行该函数才会存在噢~)
  global $local;
  $local = 156156156;
}
echoWorld();

echo $local; // 156156156
~~~

## 静态变量

~~~php
<?php
/* 静态变量的使用场景->
 * 为了统计当前函数被调用的次数
 * 为了统筹函数多次调用得到的不同结果
 */
function display(){
  // 定义变量
  $local = 1;
  // 定义静态变量, 当函数再次访问时, 会寻找之前的静态变量
  // 如果查找到之前的变量, 那么该静态变量的值则为之前变量的值
  // 赋值符号将不是=1, 而是=之前的值
  static $count = 1;
  echo '<br>', $local++, '-', $count++;
}
display(); // 2-2
display(); // 2-3
display(); // 2-4
~~~

## 函数默认值

~~~php
function setCount ($number = 1) {
  echo $number; // 1
}
~~~

## 可变函数

~~~php
<?php
// 可变函数：当前有一个变量所保存到的值, 刚好是一个函数名称, 那么将可以使用变量+()来充当函数名使用
$fun_name = 'display';
function display () {
  echo 'xxx';
};
$fun_name();
~~~

## 匿名函数

`跟前端匿名函数特性一致`

# php 自带函数

## 输出与时间函数

~~~php
<?php
// print(), 类似于echo输出提供的内容, 返回1
print '161561561';
print('123123');

// print_r(), 类似于var_dump, 但比var_dump简单
// 不会输出数据的类型, 只会输出值
print_r([
  'adas' => 123, 123213, 1231
]);

// date()：按照指定格式对对应的时间戳(从1970年格林威治时间开始计算的秒数)
// 没有输入指定时间戳，则默认当前的时间戳
echo date('Y 年 m 月 d 日 H:i:s') . '<br>';
// time()：获取当前时间对应的时间戳
echo time() . '<br>';
// microtime()：获取微妙级别的时间
echo microtime() . '<br>';
// Strtotime()：获取指定时间
echo strtotime('tomorrow 10 hours');
~~~

## 数值与function函数

~~~php
/** 数值相关函数
 * max(num,num)：数之间最大的值
 * min(num,num)：比较两个数中较小的值
 * rand([,$min], [,$max])：得到一个随机数,指定区间的随机整数
 * mt_rand([,$min], [,$max])：与rand一样,只是底层结构不一样,效率比rand高（建议使用）
 * round(num)：四舍五入
 * ceil(num)：向上取整
 * floor(num)：向下取整
 * pow(num, num)：求指定数字的指定数次结果：pow(2,8) == 2^8 == 256
 * abs(num/-num)：绝对值
 * sqrt(num)：求平方根
 * */
/** 函数相关的函数
 * function_exists($function_name)：判断指定函数(名称)是否在内存中存在
 * func_get_arg($index)：获取函数中指定索引的参数
 * func_get_args(void)：函数中获取所有的参数（数组）
 * func_num_args()：函数的参数数量
 * */
function test($a,$b){
    //获取指定参数
    var_dump(func_get_arg(0));
    echo '<br>';
    //获取所有参数
    var_dump(func_get_args());
    echo '<br>';
    //获取参数数量
    var_dump(func_num_args());
};
test(60,70);
~~~

# php 文件模块

## include 与 include_once

include：系统碰到一次，执行一次；如果对同一个文件进行多次加载，那么系统就会执行多次；

lnclude_once：系统碰到多次，也会执行一次；

require：include报错并不会阻塞代码执行，但require会阻塞代码执行；

~~~php
// include_1.php
<?php
define('LOCAL_HOST', '11023612315');
~~~

~~~php
// include.php
echo LOCAL_HOST; // -> 11023612315
~~~

# 系统错误代号

php中所有看到的错误代码在php中都被定义成了系统常量（可以直接使用）

## 系统错误

~~~php
E_PARSE; // 编译错误
E_ERROR; // fatal error 致密错误, 会导致代码不能正确继续执行（出错的位置断掉）
E_WARNING; // warning 警告错误, 不会影响代码执行, 但可能得到意想不到的结果
E_NOTICE; // notice 通知错误, 不会影响代码执行
~~~

## 用户错误

用户在使用自定义错误触发的时候，会使用到的错误代号（系统不会用到）

~~~php
E_USER_ERROR;
E_USER_WARNING;
E_USER_NOTICE;
~~~

## 其他错误

~~~php
E_ALL; // 代表所有错误
E_ALL & ~E_NOTICE; // 排除通知级别
E_WARNING | E_NOTICE; // 只要警告和通知
~~~

## 触发错误函数

~~~php
header('Content-type:text/html;charset=utf-8');
$b = 0;
if ($b == 0){
  trigger_error('除数不能为0'); // 该函数默认报错为E_USER_NOTICE
  trigger_error('除数不能为0', E_USER_ERROR); // 设置为错误
}
~~~

## 错误配置

可以在运行php脚本设置，也可以在php.ini中配置，脚本中定义的配置项级别比配置文件高。

~~~php
Error_reporting(); // 设置对应错误显示级别
Ini_set('配置文件的配置项', '配置值'); // 设置脚本中配置
Ini_set('error_reporting', E_ALL); // 是否开启错误
Ini_set('display_errors', 1); // 是否开启错误
~~~

## 自定义错误处理

最简单的错误处理：trgger_errors()函数，该函数默认不会阻止系统报错。

php系统提供了一种用户处理错误的机制；用户自定义错误处理函数，然后将该函数增加到系统错误的句柄中，然后系统会在碰到错误之后，使用用户定义的错误函数。

**使用set_error_handler定义自定义错误**

~~~php
// 对应参数为错误处理回调, 第二个是错误的级别
set_error_handler(callback $error_handler, [, E_ALL | E_STRICT]);
handler(
  int $errno, // 
  string $errstr,
  [, string $errfile],
  [, int $errline],
  [, array $errcontext]
)
~~~

~~~php
function my_error($errno, $errstr, $errfile, $errline){
  // 判断: 当前会碰到的错误有哪些??
  if (!(error_reporting() & $errno)) return false;
  // 判断错误类型
  switch($errno){
    case E_ERROR:
    case E_USER_ERROR:
      echo "fatal error in file {$errfile} on line {$errline} <br/>";
      echo "error info: {$errstr}";
      break;
    case E_WARNING:
    case E_USER_WARNING:
      echo "Warning in file {$errfile} on line {$errline} <br/>";
      echo "error info: {$errstr}";
      break;
    case E_NOTICE:
    case E_USER_NOTICE:
      echo "Notice in file {$errfile} on line {$errline} <br/>";
      echo "error info: {$errstr}";
      break;
  }
}
set_error_handler('my_error');
~~~

# php 字符串扩展

~~~php
header('Content-type:text/html;charset=utf-8');
$str1 = '151651323';
$str2 = '你好中国123';
// 得到字符串字节数-> 9 15
echo strlen($str1), strlen($str2);
~~~

## 多字节字符串扩展模块

加载php mbstring扩展=>php.ini=>extension=php.mbstring.dll

~~~php
// 得到字符串长度(不指定字符集标准)-> 9 7
echo mb_strlen($str1), mb_strlen($str2);
// 指定字符集标准-> 9 7
echo mb_strlen($str1, "utf-8"), mb_strlen($str2, "utf-8");
~~~

## 相关函数

~~~php
// implode('拼接字符', [数组]) -> 数组以指定字符串进行转换拼接为字符串
var_dump(implode(',', [131,131])); // -> string "131,131"
// implode('拼接字符', [数组]) -> 数组以指定字符串进行转换拼接为字符串
var_dump(explode(',', '131,131')); // -> array [131, 131]

// trim(string, [, string]) -> 默认为去除两边空格, 也可指定去除的内容(两边)

// substr(string, start_index, [, end_index]) -> 位置开始截取字符串, 不指定截取长度默认到最后
var_dump(substr('123456', 0, 3)); // -> string "123"
// strstr(string, string [, end_index]) -> 由匹配字符开始截取, 特性与substr一致
var_dump(strstr('abcde f g', 'c')); // -> string "cde f g"

// strtoupper('abc') -> ABC
// ucfirst('abc') -> abc

// strpos(string, string) -> 字符在目标字符串出现的位置(左寻找)
var_dump(strpos('123a3b2a', 'a')); // -> int 3
// strrpos(string, string) -> 字符在目标字符串出现的位置(右寻找)
var_dump(strrpos('123a3b2a', 'a')); // -> int 7

// str_replace($匹配目标, $替换内容, 目标字符串) -> 将部分字符串替换
var_dump(str_replace('a', 'b', 'aaaaa')); // -> string bbbbb

// sprintf(特殊字符串, args....) -> 根据字符串占位符, 定义格式化字符串
$name = "王海峰";
$age = 18;
var_dump(sprintf('我叫%s, 今年%d', $name, $age)); // -> 我叫王海峰 今年18

// str_repeat(string, int) -> 字符串重复多次
var_dump(str_repeat('abc', 3)); // -> abcabcabc
// str_shuffle(string) -> 打乱字符串顺序
~~~

# php 数组扩展

## 定义数组方式

~~~php
// 1, 使用array关键字
$arr = array('y1', 'y2');
// 2, 使用中括号包裹
$arr = ['y1', 'y2'];
// 3, 隐式定义数组
$arr[] = 'y1';
$arr[0] = 'y1';
$arr[1] = 'y2';
// 多维数组定义
$arr = array(
  array(3,3,3),
  array(3,3,3)
);
// 获取数组长度
count($arr);
~~~

## 数组特点

~~~php
// 整数下标或字符串下标
$arr = [ '231' => 'y1' ];
// 不同下标可以混合存在
$arr = ['231' => 'y1', 1 => 'y2'];
// 数组顺序为放入顺序为准，跟下标无关
$arr = [1=> 'y1', 0=> 'y2'];
// 特殊下标自动进行转换
$arr[false] = false; // 0
$arr[true] = true; // 1
$arr[null] = null; // ""
~~~

## 数组遍历

~~~php
$arr = array(0,1,2,3,4,5,6);
foreach($arr as $key){
    // $key 索引值
    echo $arr[$key];
}
~~~

## 相关函数

~~~php
// list函数(解析赋值？)
$arr = array(1, 2);
list($one, $two) = $arr;
echo $one,'--',$two; // 1--2

// sort($arr)/rsort($arr) -> 顺/逆序排序(下标重排)
// asort($arr)/arsort($arr) -> 顺/逆序排序(下标保留)
// ksort($arr)/krsort($arr) -> 顺/逆序排序(按照键名)
// shuffle($arr) -> 打乱数组元素

// reset($arr) -> 将数组指针回到首位
// end($arr) -> 将数组指针指向最后一位
// next($arr) -> 指针下移, 取得下一个元素的值
// prev($arr) -> 指针上移, 取得上一个元素的值
// current($arr) -> 当前指针的元素值
// key($arr) -> 当前指针对应的下标值

// count($arr) -> 统计数组中元素的数量
// array_push($arr, $val) -> 往数组尾部添加一个元素
// array_pop($arr) -> 往数组尾部取出一个元素
// array_unshift($arr, $val) -> 往数组头部添加一个元素
// array_shift($arr) -> 往数组头部取出一个元素
// array_reverse($arr) -> 将数组元素顺序取反
// in_array($arr, $val) -> 判断数组是否存在某个个元素
// array_keys($arr) -> 获取元素的所有下标, 组成返回一个索引数组
// array_values($arr) -> 获取一个元素的所有值, 组成返回一个值数组

~~~

