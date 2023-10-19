<?php
include '../Database/SQLDbConnect.php';
$work_name = $_POST["work_name"];
$work_starttime = $_POST["work_starttime"];
$work_endtime = $_POST["work_endtime"];
$work_state = $_POST["work_state"];
$work_sort = $_POST["work_sort"];
$work_content = $_POST["work_content"];
$id = $_POST["id"];
$user_id = $_POST["user_id"];
$Message = "Unknow Error";
$State = 4;
$link = OpenCon();
$sql = "UPDATE `work_item` SET `work_name`=?, `work_starttime`=?,
        `work_endtime`=?, `work_state`=?, `work_sort`=?, `work_content`=? 
        WHERE `id`=? AND `user_id`=?";
$stmt = $link->prepare($sql);
$stmt->bind_param("sssiisii", $work_name, $work_starttime,
    $work_endtime, $work_state, $work_sort, $work_content, $id,$user_id);

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