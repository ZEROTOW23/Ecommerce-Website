<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey('sk_test_your_secret_key_here');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => 'No data received']);
    exit;
}

try {
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $data['amount'],
        'currency' => 'usd',
        'payment_method' => $data['payment_method'],
        'confirmation_method' => 'manual',
        'confirm' => true,
    ]);

    echo json_encode(['client_secret' => $paymentIntent->client_secret]);
} catch (\Stripe\Exception\ApiErrorException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
