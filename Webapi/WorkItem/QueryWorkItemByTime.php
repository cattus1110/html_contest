<?php
include '../Database/SQLDbConnect.php';
$Starttime = $_POST["Datetime"];
$UserID = $_POST["UserID"];
$State=$_POST["State"];
$Sort=$_POST["Sort"];

$link = OpenCon();
$comments = array();
$sql = "SELECT `id`, `work_name`,
DATE_FORMAT(`work_starttime`,'%Y-%m-%dT%H:%i')as`work_starttime`, 
DATE_FORMAT(`work_endtime`,'%Y-%m-%dT%H:%i') as`work_endtime`,
 `work_state`, `work_sort`, `work_content`, `user_id` 
    FROM `work_item` 
    WHERE `work_starttime`>=?
    AND `work_endtime`<= DATE_ADD(?,INTERVAL 1 DAY)
    AND `user_id` = ?
    AND ( ? = 0 or `work_sort` = ? )
    AND ( ? = 0 or `work_state` = ? )";
$stmt = $link->prepare($sql);
$stmt->bind_param("ssiiiii",$Starttime,$Starttime,$UserID,$State,$State,$Sort,$Sort);
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