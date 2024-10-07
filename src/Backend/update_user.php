<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

// Log the incoming data
file_put_contents('php://stderr', print_r($data, TRUE));

// Validate input
if (!isset($data['email']) || !isset($data['newEmail'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid input'
    ]);
    exit;
}

$email = $data['email'];
$newEmail = $data['newEmail'];
$newPassword = isset($data['newPassword']) ? $data['newPassword'] : '';

// Validate newEmail
if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email format'
    ]);
    exit;
}

// Check if the new email already exists
$checkEmailStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkEmailStmt->bind_param("s", $newEmail);
$checkEmailStmt->execute();
$checkEmailStmt->store_result();

if ($checkEmailStmt->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Email already exists'
    ]);
    $checkEmailStmt->close();
    $conn->close();
    exit;
}
$checkEmailStmt->close();

if ($newPassword) {
    // Hash the new password
    $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET email = ?, password = ? WHERE email = ?");
    $stmt->bind_param("sss", $newEmail, $passwordHash, $email);
} else {
    $stmt = $conn->prepare("UPDATE users SET email = ? WHERE email = ?");
    $stmt->bind_param("ss", $newEmail, $email);
}

if ($stmt->execute()) {
    echo json_encode([
        'success' => true
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update user'
    ]);
}

$stmt->close();
$conn->close();
?>
