<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Preact";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from the request
    $id = isset($_POST['id']) ? $conn->real_escape_string($_POST['id']) : '';
    $name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
    $price = isset($_POST['price']) ? $conn->real_escape_string($_POST['price']) : '';
    $stock = isset($_POST['stock']) ? $conn->real_escape_string($_POST['stock']) : '';
    $category = isset($_POST['category']) ? $conn->real_escape_string($_POST['category']) : '';
    $photoPath = '';

    // Validate the input
    if (empty($id) || empty($name) || empty($price) || empty($stock) || empty($category)) {
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
            // Construct the photo URL
            $photoUrl = '../src/Backend/' . $photoPath;

            // Update product details in the database
            $sql = "UPDATE products SET name=?, price=?, stock=?, photo=?, category=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sdisss", $name, $price, $stock, $photoUrl, $category, $id);
        } else {
            echo json_encode(['message' => 'Error uploading photo']);
            exit();
        }
    } else {
        // If no new photo is provided, use the existing photo
        $photoUrl = '';

        // Fetch current photo path from the database
        $result = $conn->query("SELECT photo FROM products WHERE id=$id");
        if ($result && $row = $result->fetch_assoc()) {
            $photoUrl = $row['photo'];
        } else {
            echo json_encode(['message' => 'Failed to fetch current photo path']);
            exit();
        }

        // Update product details in the database
        $sql = "UPDATE products SET name=?, price=?, stock=?, category=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sdiss", $name, $price, $stock, $category, $id);
    }

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Product updated successfully']);
    } else {
        echo json_encode(['message' => 'Error updating product details']);
    }

    $stmt->close();
} else {
    echo json_encode(['message' => 'Invalid request method']);
}

// Close database connection
$conn->close();
?>
