<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Fetch all shipped orders
$query = "SELECT * FROM shipments JOIN orders ON shipments.order_id = orders.id WHERE shipments.shipped = 1 ORDER BY shipments.shipped_at DESC";
$result = $conn->query($query);

if ($result) {
    $shippedOrders = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($shippedOrders);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to fetch shipped orders."]);
}

$conn->close();
?>
