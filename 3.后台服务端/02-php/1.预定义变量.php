<!DOCTYPE HTML> 
	<head>
		
	</head>
	<body>
	</body>
<?php
$var1 = 50; //定义变量
$var2 = 50; //定义变量同事赋值
if($var1 == $var2 ){
	echo '瞪之隆';
	unset($var1); //删除$var1;
	echo $var1;
}
$a = 'b';
$b = 'bxb';
echo $$a;
/*预定义变量*/
//预定义变量，都是数组
/* $_GET:获取所有表单以get方式提交的数据   ！
 * $_POST:POST提交的数据都会保存在此     !
 * $_REQUEST:GET和POST提交的都会保存   !
 * $GLOBALS:PHP中所有的全局变量
 * $_SERVER:服务器信息 !
 * $_SESSION:session会话数据 !
 * $_COOKIE:cookie会话数据 !
 * $ENV:环境信息
 * $_FILES:用户上传的文件信息
 */
?>