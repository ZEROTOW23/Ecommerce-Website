<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$order_id = $_GET['order_id'];
$status = $_GET['status'];

if ($order_id && ($status === 'Shipped' || $status === 'Pending')) {
 
    $query = "UPDATE orders SET status = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('si', $status, $order_id);
    $stmt->execute();
    $stmt->close();

    if ($status === 'Shipped') {
        
        $query = "INSERT INTO order_history (order_id, user_email, name, address, city,  zip, country, created_at, status, payment_method, card_number, expiry_date, cvv) 
                  SELECT id, user_email, name, address, city,  zip, country, created_at, status, payment_method, card_number, expiry_date, cvv 
                  FROM orders 
                  WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $order_id);
        $stmt->execute();
        $stmt->close();
        
   
        $query = "DELETE FROM orders WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $order_id);
        $stmt->execute();
        $stmt->close();
    }

    echo json_encode(["success" => true, "status" => $status]);
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid order ID or status."]);
}

$conn->close();
?>
