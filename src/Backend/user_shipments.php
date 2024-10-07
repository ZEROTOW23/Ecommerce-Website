<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Include your database connection file
include 'db.php';

// Get the user email from the query string
$user_email = $_GET['user_email'] ?? null;

if (!$user_email) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "User email is required."]);
    exit;
}

// SQL query to get orders and their shipment status for a specific user
$query = "
    SELECT o.id AS order_id, oi.product_id, p.name AS product_name, o.address, 
           IFNULL(s.shipped, 0) AS shipped, IFNULL(s.shipped_at, NULL) AS shipped_at
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    LEFT JOIN shipments s ON o.id = s.order_id
    WHERE o.user_email = ?
    ORDER BY o.created_at DESC
";

$stmt = $conn->prepare($query);
$stmt->bind_param('s', $user_email);
$stmt->execute();
$result = $stmt->get_result();

if ($result) {
    $orders = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($orders);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to fetch orders", "error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
