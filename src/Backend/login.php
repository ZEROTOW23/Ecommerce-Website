<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust this to your specific domain for better security
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'db.php'; // Include your database connection

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid input'
    ]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// Check users table
$stmt = $conn->prepare("SELECT id, email, password, status FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($userId, $userEmail, $userPasswordHash, $userStatus);
$stmt->fetch();

if ($stmt->num_rows > 0) {
    if ($userStatus === 'blocked') {
        echo json_encode([
            'success' => false,
            'message' => 'User is blocked'
        ]);
    } elseif (password_verify($password, $userPasswordHash)) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $userId,
                'email' => $userEmail,
                'role' => 'client'
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

// Check usersadmin table
$stmt = $conn->prepare("SELECT id, username, password, role FROM usersadmin WHERE username = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($adminId, $adminUsername, $adminPassword, $adminRole);
$stmt->fetch();

if ($stmt->num_rows > 0) {
    if (password_verify($password, $adminPassword)) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $adminId,
                'username' => $adminUsername,
                'role' => $adminRole
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
