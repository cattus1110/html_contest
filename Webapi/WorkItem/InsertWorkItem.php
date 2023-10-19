<?php
include '../Database/SQLDbConnect.php';
$work_name = $_POST["work_name"];
$work_starttime = $_POST["work_starttime"];
$work_endtime = $_POST["work_endtime"];
$work_state = $_POST["work_state"];
$work_sort = $_POST["work_sort"];
$work_content = $_POST["work_content"];
$user_id = $_POST["user_id"];
$Message = "Unknow Error";
$State = 4;
$link = OpenCon();
$sql = "INSERT INTO `work_item`(`work_name`, `work_starttime`, `work_endtime`, 
        `work_state`, `work_sort`, `work_content`, `user_id`) VALUES (?,?,?,?,?,?,?)";
$stmt = $link->prepare($sql);
$stmt->bind_param("sssiisi", $work_name, $work_starttime,
    $work_endtime, $work_state, $work_sort, $work_content, $user_id);
    
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