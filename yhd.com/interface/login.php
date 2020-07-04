<?php
include('./conn.php');
$username=$_REQUEST['username'];
$password=$_REQUEST['password'];
$sql="select * from registry where username='$username' and password='$password'";
$res=$mysqli->query($sql);

if($res->num_rows>0){
    echo 1;
   
}else{
    echo 0;
  
}
$mysqli->close();
?>