<?php
//基本用来输出数组
//print_r();

//时间函数
//date()：按照指定格式对对应的时间戳(从1970年格林威治时间开始计算的秒数)
//没有输入指定时间戳，则默认当前的时间戳
//time()：获取当前时间对应的时间戳
//microtime()：获取微妙级别的时间
//Strtotime()：获取指定时间

echo date('Y 年 m 月 d 日 H:i:s').'<br>';
echo time().'<br>';
echo microtime().'<br>';
echo strtotime('tomorrow 10 hours');