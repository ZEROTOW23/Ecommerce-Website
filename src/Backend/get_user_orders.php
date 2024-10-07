<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$user_email = $_GET['email'];  // Get the email from the query parameter

// SQL query to get all orders for the user along with their product details
$query = "
    SELECT o.id AS order_id, o.user_email, p.name AS product_name, p.price, p.photo, o.address, o.status AS shipped, o.created_at
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.user_email = ?
    ORDER BY o.created_at DESC
";

$stmt = $conn->prepare($query);
$stmt->bind_param('s', $user_email);
$stmt->execute();
$result = $stmt->get_result();

if ($result) {
    $orders = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(["orders" => $orders]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to fetch orders", "error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
