<?php
 include('./conn.php');
 $sid = $_REQUEST['sid'];
$sql="select * from goods where sid='$sid'";
$res=$mysqli->query($sql);
$row=$res->fetch_assoc();
$json=json_encode($row);
echo $json;
$mysqli->close();
?>