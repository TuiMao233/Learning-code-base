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