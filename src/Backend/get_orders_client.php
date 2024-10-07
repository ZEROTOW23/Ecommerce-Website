<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Include your database connection file
include 'db.php';

// SQL query to get order ID, user email, product ID, and product name
$query = "
    SELECT orders.id AS order_id, orders.user_email, order_items.product_id, products.name AS product_name, orders.address
    FROM orders
    LEFT JOIN order_items ON orders.id = order_items.order_id
    LEFT JOIN products ON order_items.product_id = products.id
    ORDER BY orders.id DESC
";

$result = $conn->query($query);

if ($result) {
    // Fetch all results as an associative array
    $orders = $result->fetch_all(MYSQLI_ASSOC);

    // Encode the results as JSON
    echo json_encode($orders);
} else {
    // Return an error response
    http_response_code(500);
    echo json_encode([
        "message" => "Failed to fetch orders",
        "error" => $conn->error
    ]);
}

// Close the database connection
$conn->close();
?>
