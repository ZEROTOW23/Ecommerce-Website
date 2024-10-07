<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$query = "
    SELECT 
        SUM(price * quantity) AS total_money
    FROM order_items
";

$result = $conn->query($query);

if ($result) {
    $data = $result->fetch_assoc();
    echo json_encode($data);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to fetch total money"]);
}

$conn->close();
?>
