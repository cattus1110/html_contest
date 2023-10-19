<?php
$Random_str=strtoupper(substr(md5(uniqid(rand(),true)),0,4));

$json=array("datas"=>$Random_str);
$response=json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>