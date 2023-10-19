<?php
include '../Database/SQLDbConnect.php';
$id = $_POST["id"];
$user_id = $_POST["user_id"];
$Message = "Unknow Error";
$State = 4;
$link = OpenCon();
$sql = "DELETE FROM `work_item` WHERE `id`=? AND `user_id`=?";
$stmt = $link->prepare($sql);
$stmt->bind_param("ii", $id, $user_id);
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