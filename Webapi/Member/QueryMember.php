<?php
include '../Database/SQLDbConnect.php';
$link = OpenCon();
$comments = array();
$sql = "SELECT id,account,password,role FROM user";
$result = $link->query($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($comments,
            array("id" => $row["id"],
                "account" => $row["account"],
                "password" => $row["password"],
                "role"=>$row ["role"]));
    }
}
CloseCon($link);

$json=array("datas"=>$comments);
$response=json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>