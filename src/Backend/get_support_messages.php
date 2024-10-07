<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$sql = "SELECT id, name, email, message, created_at FROM support_messages ORDER BY created_at DESC";
$result = $conn->query($sql);

$supportMessages = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $supportMessages[] = $row;
    }
}

echo json_encode($supportMessages);

$conn->close();
?>
