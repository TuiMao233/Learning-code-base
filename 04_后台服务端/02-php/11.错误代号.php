<?php
//所有看到的错误代码在php中都被定义成了系统常量（可以直接使用）
/* 1.系统错误
 *    E_PARSE:编译错误，代码不会执行
 *    E_ERROR:fatal error，致命错误，会导致代码不能正确继续执行（出错的位置断掉）
 *    E_WARNING: warning，警告错误，不会影响代码执行，但可能得到意想不到的结果
 *    E_NOTICE: notice，通知错误，不会影响代码执行
 * 2.用户错误
 *    E_USER_ERROR,E_USER_WARNING,E_USER_NOTICE
 * 3.其他
 *    E_ALL:代表着所有错误
 * 排除通知级别notice:E_ALL & ~E_NOTICE
 * 只要警告和通知: E_WARNING | E_NOTICE
 * */