<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins; change this for production
header('Access-Control-Allow-Methods: GET'); // Allow only GET requests
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$servername = "localhost";
$username = "root"; // Change if your MySQL username is different
$password = "";     // Change if your MySQL password is different
$dbname = "preact"; // Change to your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Assuming you have user ID in session or passed via query parameter
session_start();
$userId = $_SESSION['user_id']; // Make sure user ID is set in session

if (!$userId) {
    echo json_encode([
        'success' => false,
        'message' => 'User not logged in'
    ]);
    $conn->close();
    exit;
}

// Fetch cart items
$sql = "SELECT c.id, p.name, p.photo, p.price, c.quantity
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$cartItems = [];
while ($row = $result->fetch_assoc()) {
    $cartItems[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode([
    'success' => true,
    'cartItems' => $cartItems
]);
?>
