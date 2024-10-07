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
$name = $conn->real_escape_string($_POST['name']);
$description = $conn->real_escape_string($_POST['description']);
$price = $conn->real_escape_string($_POST['price']);
$stock = $conn->real_escape_string($_POST['stock']);
$category = $conn->real_escape_string($_POST['category']);
$size = $conn->real_escape_string($_POST['size']);
$photoPath = '';

// Validate the input
if (empty($name) || empty($description) || empty($price) || empty($stock) || empty($category) || empty($size)) {
    echo json_encode(['message' => 'Missing required fields']);
    exit();
}

// File upload handling
if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
    $photo = $_FILES['photo'];
    $uploadDir = 'uploads/';
    $photoPath = $uploadDir . basename($photo['name']);

    // Ensure upload directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Move uploaded file to server
    if (move_uploaded_file($photo['tmp_name'], $photoPath)) {
        $photoUrl = '../src/Backend/' . $photoPath;
        $sql = "INSERT INTO products (name, description, price, stock, photo, category, size) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssdisss", $name, $description, $price, $stock, $photoUrl, $category, $size);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Product uploaded successfully']);
        } else {
            echo json_encode(['message' => 'Error uploading product details']);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'Error uploading photo']);
    }
} else {
    echo json_encode(['message' => 'No photo provided']);
}

// Close database connection
$conn->close();
?>
