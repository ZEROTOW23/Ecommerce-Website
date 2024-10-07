<?php
// UserhistoryOrder.php

require_once 'db.php';

header('Content-Type: application/json');

$response = ['success' => false, 'message' => '', 'orders' => []];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['orderId'])) {
        $orderId = $input['orderId'];
        $createdAt = date('Y-m-d H:i:s');

        // Update the order status to shipped and record the date
        $query = "UPDATE orders SET shipped = 1, created_at = '$createdAt' WHERE order_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $orderId);

        if ($stmt->execute()) {
            $response['success'] = true;

            // Fetch the updated order details
            $query = "SELECT order_id, product_name, price, created_at FROM orders WHERE order_id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('i', $orderId);
            $stmt->execute();
            $result = $stmt->get_result();
            $order = $result->fetch_assoc();
            $response['orders'] = $order;
        } else {
            $response['message'] = 'Failed to update order status.';
        }

        $stmt->close();
    } else {
        $response['message'] = 'Order ID is missing.';
    }
} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);

$conn->close();
?>
