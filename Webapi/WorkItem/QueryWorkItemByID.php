<?php
include '../Database/SQLDbConnect.php';
$ID = $_POST["ID"];

$link = OpenCon();
$comments = array();
$sql = "SELECT `id`, `work_name`, `work_starttime`, `work_endtime`, `work_state`, `work_sort`, `work_content`, `user_id` 
    FROM `work_item` 
    WHERE `id`=?";
$stmt = $link->prepare($sql);
$stmt->bind_param("i",$ID);
$stmt->execute();
$result=$stmt->get_result();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($comments,
            array("id" => $row["id"],
                "work_name" => $row["work_name"],
                "work_starttime" => $row["work_starttime"],
                "work_endtime" => $row ["work_endtime"],
                "work_state"=> $row ["work_state"],
                "work_sort"=> $row ["work_sort"],
                "work_content"=> $row ["work_content"],
                "user_id"=> $row ["user_id"]));
    }
}
CloseCon($link);

$json = array("datas" => $comments);
$response = json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>