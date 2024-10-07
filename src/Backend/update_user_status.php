<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['user_id'];
    $status = $_POST['status'];

    if (empty($userId) || empty($status)) {
        echo json_encode(["error" => "User ID and status are required"]);
        exit;
    }

    $stmt = $conn->prepare("UPDATE users SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $userId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User status updated successfully"]);
    } else {
        echo json_encode(["error" => "Error updating user status"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
