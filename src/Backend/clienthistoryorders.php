<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Retrieve the email from the GET request
$email = $conn->real_escape_string($_GET['email']);

// Query to fetch order history details
$query = "
    SELECT orders.id AS order_id, 
           order_items.product_id, 
           products.name AS product_name, 
           products.description AS product_description, 
           products.photo AS product_photo, 
           order_items.price AS product_price, 
           orders.order_date, 
           orders.shipped
    FROM orders
    LEFT JOIN order_items ON orders.id = order_items.order_id
    LEFT JOIN products ON order_items.product_id = products.id
    WHERE orders.user_email = '$email'
    ORDER BY orders.order_date DESC
";

$result = $conn->query($query);

// Check if query was successful
if ($result) {
    $orders = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($orders);
} else {
    http_response_code(500);
    echo json_encode([
        "message" => "Failed to fetch order history",
        "error" => $conn->error
    ]);
}

// Close the database connection
$conn->close();
?>
