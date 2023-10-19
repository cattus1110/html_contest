<?php
function OpenCon()
{
    $host = 'localhost';
    $dbuser = 'admin';
    $dbpassword = '1234';
    $dbname = 'todo';
    $conn = new mysqli($host, $dbuser, $dbpassword, $dbname)
    or die('Connect failed: %s\n' . $conn->error);
    return $conn;
}

function CloseCon($conn)
{
    $conn -> close();
}
?>