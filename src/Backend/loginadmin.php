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
$password = $data['password'];

// Check usersadmin table
$stmt = $conn->prepare("SELECT id, username, password FROM usersadmin WHERE username = ?");
if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to prepare statement'
    ]);
    exit;
}
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($adminId, $adminUsername, $adminPassword);
$stmt->fetch();

if ($stmt->num_rows > 0) {
    if ($password === $adminPassword) { // Assuming password is not hashed
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $adminId,
                'username' => $adminUsername,
                'role' => 'admin'
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid credentials'
        ]);
    }
    $stmt->close();
    exit;
}

echo json_encode([
    'success' => false,
    'message' => 'User not found'
]);
$conn->close();
?>
