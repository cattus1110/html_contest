<?php
include '../Database/SQLDbConnect.php';
$ID=$_POST["ID"];
$Account = $_POST["Account"];
$Password = $_POST["Password"];
$Role = $_POST["Role"];
$Message = "Unknow Error";
$State = 4;
$link = OpenCon();
$sql = "UPDATE `user` SET`account`=?,`password`=?,`role`=? 
        WHERE `id`=?";
$stmt = $link->prepare($sql);
$stmt->bind_param("ssii", $Account, $Password, $Role,$ID);
if ($stmt->execute()) {
    $Message = "修改成功";
    $State = 1;
} else {
    $Message = "修改失敗";
    $State = 0;
}
CloseCon($link);

$json = array("Message" => $Message, "State" => $State);
$response = json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>