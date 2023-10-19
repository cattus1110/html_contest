<?php
include '../Database/SQLDbConnect.php';
$ID = $_POST["ID"];
$Message = "Unknow Error";
$State = 4;
$link = OpenCon();
$sql = "DELETE FROM `user` WHERE `id`=?";
$stmt = $link->prepare($sql);
$stmt->bind_param("i", $ID);
if ($stmt->execute()) {
    $Message = "刪除成功";
    $State = 1;
} else {
    $Message = "刪除失敗";
    $State = 0;
}
CloseCon($link);

$json = array("Message" => $Message, "State" => $State);
$response = json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>