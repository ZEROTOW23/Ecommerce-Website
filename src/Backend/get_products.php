<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Preact";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Prepare SQL statement
$category = isset($_GET['category']) ? $conn->real_escape_string($_GET['category']) : '';
$sql = "SELECT * FROM products";
$params = [];
$types = '';

// Apply category filter if provided
if (!empty($category)) {
    $sql .= " WHERE category = ?";
    $params[] = $category;
    $types .= 's'; // 's' denotes string type for prepared statements
}

// Prepare and execute the statement
$stmt = $conn->prepare($sql);

if ($params) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Adjust the photo path if necessary
        $photoPath = str_replace('../src/Backend/uploads/', '', $row['photo']);

        // Add each product to the products array
        $products[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
            'price' => $row['price'],
            'stock' => $row['stock'],
            'photo' => $photoPath,
            'category' => $row['category'],
            'size' => $row['size']  // Include size in the response
        );
    }
    // Return the products array as JSON
    echo json_encode($products);
} else {
    // No products found
    echo json_encode(['message' => 'No products found']);
}

// Close database connection
$stmt->close();
$conn->close();
?>
