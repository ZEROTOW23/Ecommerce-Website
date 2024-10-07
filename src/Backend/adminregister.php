<?php
// Enable error reporting for debugging purposes
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust this to your specific domain for better security
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'db.php'; // Ensure this file correctly sets up the $conn variable

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid input'
    ]);
    exit;
}

$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash the password

// Check if username already exists
$stmt = $conn->prepare("SELECT id FROM usersadmin WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Username already exists'
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->close();

// Insert new admin
$stmt = $conn->prepare("INSERT INTO usersadmin (username, password) VALUES (?, ?)");
if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to prepare statement'
    ]);
    exit;
}
$stmt->bind_param("ss", $username, $password);
if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Admin registered successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to register admin'
    ]);
}

$stmt->close();
$conn->close();
?>
