<?php
include '../Database/SQLDbConnect.php';
$Account = $_POST["Account"];
$Password = $_POST["Password"];
$Message = "Unknow Error";
$Role = 99;
$State = 4;
$ID = 0;
$link = OpenCon();
$sql = "SELECT `id`, `account`, `password`, `role` FROM `user` WHERE account=?";
$stmt = $link->prepare($sql);
$stmt->bind_param("s", $Account);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows == 1) {
    while ($row = $result->fetch_assoc()) {
        if ($row["account"] == $Account) {
            $State = $row["password"] == $Password ? 3 : 2;
            $ID = $row["password"] == $Password ? $row["id"] : 0;
            $Message = ($row["password"] == $Password ? "登入成功" : "密碼有誤");
            $Role = $row["password"] == $Password ? $row["role"] : 99;
            $loginState = $row["password"] == $Password ? 1 : 0;
            $sql = "INSERT INTO `login_event`(`user_id`, `login_state`, `event_time`) 
                    VALUES (?,?,NOW())";
            $etmt = $link->prepare($sql);
            $etmt->bind_param(
                "ii",
                $row["id"],
                $loginState,
            );
            $etmt->execute();
        }
    }
} else {
    $Message = "帳號錯誤";
    $State = 1;
}
CloseCon($link);

$json = array("Message" => $Message, "State" => $State, "Role" => $Role,"id" => $ID);
$response = json_encode($json);
header('Content-Type:application/json;charset=utf-8');
echo $response;
?>