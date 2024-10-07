<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'];
$status = $data['status'];

$query = "UPDATE orders SET status = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('ii', $status, $order_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update order status.']);
}

$stmt->close();
$conn->close();
?>
