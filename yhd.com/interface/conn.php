<?php
 header('content-type:text/html;charset=utf-8');
 $mysql_conf=array(
     'host'=>'chensir.icu:3306',
     'db_username'=>'root',
     'db_password'=>123456,
     'db'=>'yhd'
 );
 // 连接数据库（登录）mysqli
 $mysqli=new mysqli($mysql_conf['host'],$mysql_conf['db_username'],$mysql_conf['db_password']);
 // var_dump($mysqli);
if($mysqli->connect_errno){//判断是否连接成功
 // die()函数  用于终止代码执行
 die('连接错误'.$mysqli->connect_errno);
}

// 设置查询字符集
$mysqli->query('set names utf8');
// 选择数据库
$select_db=$mysqli->select_db($mysql_conf['db']);
// 判断数据库是否选择成功
if(!$select_db){
 die('数据库选择错误'.$mysqli->error);
}

?>