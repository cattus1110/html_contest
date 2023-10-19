<?php
include '../Database/SQLDbConnect.php';
$link = OpenCon();
$comments = array();
$sql = "SELECT 
       `login_event`.`user_id`, 
       `login_event`.`login_state`, 
       `login_event`.`event_time`, 
       `login_event`.`id`, 
       `user`.`account` 
    FROM 
         `login_event`
    Left Join `user` on `user`.`id`=`login_event`.`user_id`
    order by id desc;";
$result = $link->query($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($comments,
            array("user_id" => $row["user_id"],
                "login_state" => $row["login_state"],
                "event_time" => $row["event_time"],
                "id" => $row ["id"],
                "account" => $row ["account"],
            ));
    }
}
CloseCon($link);

$json = array("datas" => $comments);
$response = json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>