<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$query = "SELECT id, email, status FROM users";
$result = $conn->query($query);

if ($result) {
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to fetch users"]);
}

$conn->close();
?>
