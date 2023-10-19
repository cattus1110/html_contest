<?php
include '../Database/SQLDbConnect.php';
$Account = $_POST["Account"];
$Password = $_POST["Password"];
$Role = $_POST["Role"];
$Message = "Unknow Error";
$State = 4;
$link = OpenCon();
$sql = "INSERT INTO `user`(`account`, `password`, `role`) VALUES (?,?,?)";
$stmt = $link->prepare($sql);
$stmt->bind_param("ssi", $Account, $Password, $Role);
if ($stmt->execute()) {
    $Message = "新增成功";
    $State = 1;
} else {
    $Message = "新增失敗";
    $State = 0;
}
CloseCon($link);

$json = array("Message" => $Message, "State" => $State);
$response = json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>