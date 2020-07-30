<?php
echo '<br/>';
echo 'php版本号: '.PHP_VERSION.'<br/>';
echo '整形大小: '.PHP_INT_SIZE.'<br/>';
// 如带-符号的整数则为负数
echo '整形能表示的最大的数: '.PHP_INT_MAX.'<br/>';

// 在php中还有一些特殊的常量，他们有双下划线开始+常量名+双下划线结束，这种常量称之为系统魔术常量：魔术常量的之通常会跟着环境变化，但用户改变不了。

echo '当前脚本执行绝对路径: '.__DIR__.'<br/>';
echo '当前脚本执行绝对路径(带文件名): '.__FILE__.'<br/>';
echo '当前所属的脚本行数: '.__LINE__.'<br/>';

echo '当前所属的命名空间: '.__NAMESPACE__.'<br/>';
echo '当前所属的类: '.__CLASS__.'<br/>';
echo '当前所属的方法: '.__METHOD__.'<br/>';