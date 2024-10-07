<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Preact";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['message' => 'Connection failed: ' . $conn->connect_error]));
}

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get the `id` from the request body
    parse_str(file_get_contents("php://input"), $data);
    $id = isset($data['id']) ? intval($data['id']) : 0;

    if ($id <= 0) {
        echo json_encode(['message' => 'Invalid product ID']);
        exit();
    }

    // First, delete related records in the order_items table
    $sql = "DELETE FROM order_items WHERE product_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
        echo json_encode(['message' => 'Error deleting related order items: ' . $stmt->error]);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // Now delete the product
    $sql = "DELETE FROM products WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Product deleted successfully']);
    } else {
        echo json_encode(['message' => 'Error deleting product: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['message' => 'Invalid request method']);
}

$conn->close();
?>
