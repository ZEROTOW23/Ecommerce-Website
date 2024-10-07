<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Include your database connection file
include 'db.php';

// SQL query to get all orders along with their shipment status
$query = "
    SELECT o.id AS order_id, o.user_email, oi.product_id, p.name AS product_name, o.address, 
           IFNULL(s.shipped, 0) AS shipped, IFNULL(s.shipped_at, NULL) AS shipped_at
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    LEFT JOIN shipments s ON o.id = s.order_id
    ORDER BY o.created_at DESC
";

$result = $conn->query($query);

if ($result) {
    $orders = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($orders);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to fetch orders", "error" => $conn->error]);
}

$conn->close();
?>
