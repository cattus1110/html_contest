<?php
$host = 'localhost';
$dbuser ='admin';
$dbpassword = '1234';
$dbname = 'todo';
$link = mysqli_connect($host,$dbuser,$dbpassword,$dbname);
if($link){
	// mysqli_query($link,'SET NAMES utf8mb4');
	$sql = "SELECT id, account, password, role FROM user ";
	$result = $link->query($sql);
    if ($result->num_rows > 0) {
		// 输出数据
		while($row = $result->fetch_assoc()) {
			echo "id: " . $row["id"]. " - account: " . $row["account"]. " password: " . $row["password"]. " role: " . $row["role"]. "<br>";
		}
	} 
	else 
	{
		echo "0 结果";
	}
}
else {
    echo "不正確連接資料庫</br>" . mysqli_connect_error();
}
mysqli_close($link);
?>