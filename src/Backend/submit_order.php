<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: *');  // Allow requests from any origin
header('Access-Control-Allow-Methods: POST');  // Allow POST requests
header('Access-Control-Allow-Headers: Content-Type');  // Allow specific headers
header('Content-Type: application/json');

// Database connection settings
$servername = "localhost";
$username = "root";  // Change if your MySQL username is different
$password = "";  // Change if your MySQL password is different
$dbname = "preact";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => 'No data received']);
    exit;
}

// Extract data
$cartItems = $data['cartItems'];
$userEmail = $data['userEmail'];
$name = $data['name'];
$address = $data['address'];
$city = $data['city'];
$zip = $data['zip'];
$country = $data['country'];

// Generate order ID and code
$orderId = generateOrderId();
$orderCode = generateOrderCode();

// Example function to insert the order into the database
$stmt = $conn->prepare("
    INSERT INTO orders (id, user_email, name, address, city, zip, country, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
");
$stmt->bind_param('issssss', $orderId, $userEmail, $name, $address, $city, $zip, $country);

if ($stmt->execute()) {
    // Insert successful, now save cart items
    foreach ($cartItems as $item) {
        $stmt = $conn->prepare("
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        ");
        $stmt->bind_param('iiid', $orderId, $item['id'], $item['quantity'], $item['price']);
        $stmt->execute();
    }

    echo json_encode(['orderId' => $orderId, 'orderCode' => $orderCode]);
} else {
    echo json_encode(['error' => 'Failed to save order']);
}

$stmt->close();
$conn->close();

// Function to generate a new order ID
function generateOrderId() {
    return rand(1000, 9999);
}

// Function to generate a new order code
function generateOrderCode() {
    return 'ORD-' . strtoupper(bin2hex(random_bytes(4)));
}
?>
