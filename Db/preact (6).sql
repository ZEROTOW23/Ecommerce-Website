-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 07:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `preact`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `payment_method` varchar(50) NOT NULL DEFAULT 'visa',
  `card_number` varchar(20) DEFAULT NULL,
  `expiry_date` varchar(5) DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_checkout`
--

CREATE TABLE `order_checkout` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `zip` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_checkout`
--

INSERT INTO `order_checkout` (`id`, `user_email`, `name`, `address`, `city`, `zip`, `country`, `created_at`) VALUES
(1128, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:10:37'),
(2042, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:09:05'),
(2444, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:04:49'),
(2493, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:12:14'),
(3151, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:11:55'),
(3842, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:10:53'),
(4064, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:05:14'),
(4477, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:11:33'),
(5090, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:04:38'),
(5376, 'test122@gmail.com', 'malak', 'DIAR TANGIER IMM APT 12', 'TANGER', '20117', 'Morocco', '2024-07-19 05:02:13'),
(5909, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:10:37'),
(7575, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:11:02'),
(8547, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:03:46'),
(9296, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:11:45'),
(9808, 'test122@gmail.com', 'TIBARI MZGITI', 'مكناس', 'Casablanca', '40117', 'Morocco', '2024-07-19 05:05:10'),
(9979, 'test122@gmail.com', 'malak', 'DIAR TANGIER IMM APT 12', 'TANGER', '20117', 'Morocco', '2024-07-19 05:03:38');

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `order_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'Shipped',
  `payment_method` varchar(50) NOT NULL DEFAULT 'visa',
  `card_number` varchar(20) DEFAULT NULL,
  `expiry_date` varchar(5) DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_history`
--

INSERT INTO `order_history` (`order_id`, `user_email`, `name`, `address`, `city`, `state`, `zip`, `country`, `created_at`, `status`, `payment_method`, `card_number`, `expiry_date`, `cvv`) VALUES
(8573, 'test122@gmail.com', 'test 1', 'DIAR TANGIER IMM APT 12', 'Casablanca', '', '40117', 'Morocco', '2024-07-19 05:33:49', 'Shipped', 'visa', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `size` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `photo`, `category`, `size`) VALUES
(136, 'LUCENTE LINEA LINEN SHIRT', 'Stay cool and stylish this summer with the Lucente Linea Linen Shirt.', 340.00, 100, '../src/Backend/uploads/PRO3.webp', 'Homme', 'M , L , S'),
(157, 'SAM CARTER \'S BREEZY COTTON SHIRT', 'Introducing Sam Carter\'s Breezy Cotton Shirt – your ultimate summer companion.', 392.00, 23, '../src/Backend/uploads/Sfd04f82036a0404db5a652719a2bb604w.webp', 'Homme', 'M'),
(158, 'SAM CARTER\'S MIDNIGHT NOIR SILK SHIRT', 'Step into the allure of timeless elegance with Sam.', 343.00, 123, '../src/Backend/uploads/PRO1.webp', 'Homme', 'L'),
(160, 'Adidas T-shirt LOUNGEWEAR ', 'Sweatshirts Hoodies Fleece Crew Neck Pullover Sweaters Casual Comfy Fall Fashion.', 300.00, 46, '../src/Backend/uploads/J1.jpg', 'Femme', 'M'),
(161, 'Marwa Kimono avec serigraphie', 'Marwa Kimono avec serigraphie - Noir.', 199.00, 29, '../src/Backend/uploads/J2.jpg', 'Femme', 'M , L , XL'),
(162, 'VESTE DE PASS COULOIRE', 'PARTAGEZ CE PRODUIT   VESTE DE PASS COULOIRE.', 150.00, 87, '../src/Backend/uploads/J3.jpg', 'Femme', 'S'),
(164, 'Sony PlayStation 5 Digital Edition', 'Nouveau Model) Console Ultra HD 8K - AMD Ryzen 2.', 7499.00, 10, '../src/Backend/uploads/E2.jpg', 'Electronique', 'Slim,Standard'),
(165, 'Asus Pc portable G713 Ryzen 7-4800H', 'Asus Pc portable G713 GRAY RTX 3050 4G 12M.', 14499.00, 10, '../src/Backend/uploads/E1.jpg', 'Electronique', 'Basic,Ultra'),
(166, 'XIAOMI Mi Electric Scooter Pro 4', 'XIAOMI Mi -Trottinette électrique.', 21589.00, 10, '../src/Backend/uploads/1.jpg', 'Electronique', 'Basic,Ultra'),
(167, 'Adidas Ensemble short et t-shirt', 'Adidas Ensemble short et t-shirt en coton bio Essentials.', 120.00, 22, '../src/Backend/uploads/K2.jpg', 'Kids', 'S'),
(168, 'Adidas Ensemble enfant x Kevin ', 'Adidas Ensemble enfant x Kevin Lyons HC1985.', 145.00, 112, '../src/Backend/uploads/K3.jpg', 'Kids', 'S'),
(169, 'Adidas Ensemble T-shirt et short', 'Adidas Ensemble T-shirt et short adidas x Classic LEGO®.', 222.00, 10, '../src/Backend/uploads/K4.jpg', 'Kids', 'S , M');

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `shipped` tinyint(1) NOT NULL DEFAULT 0,
  `shipped_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_messages`
--

CREATE TABLE `support_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_messages`
--

INSERT INTO `support_messages` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(27, 'AHMED ', 'ahmed-sad1@gmail.com', 'salam w3alikom mazal mawslni order .\n', '2024-07-16 17:30:45'),
(28, 'AHMED ', 'ahmed-sad1@gmail.com', 'TEST', '2024-07-17 02:54:56'),
(32, 'khalid berrada', 'khalidbaer1@gmail.com', 'hey thank u for order so cool', '2024-07-17 03:51:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','blocked') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `status`) VALUES
(45, 'AAHMEDSADA@gmail.com', '$2y$10$B8dqsVWm.xyJ3OTmV7Tsk.yRp2uYw5O5XGDzPIIKRGnoaPvQoqlmm', 'active'),
(46, 'test12@gmail.com', '$2y$10$s7s2A3LIBqTcRXW0ggTFOu6911vQaCZU.faQfdzv4JQRxrz7uHCx2', 'active'),
(47, 'test122@gmail.com', '$2y$10$Q2f6T45RGScjHL0I5ncF1.lon/tGmXwgmighG.ddXiUURcQm0hkjK', 'active'),
(49, 'redahimmi@gmail.com', '$2y$10$SbRUagmaxq54SkC4i/slbus0M7zYB.6Ye9WEmhg8.vEpFG8W.lMQy', 'active'),
(50, 'ahmed-sad1@gmail.com', '$2y$10$1z4ab3nRChE6UX0npVTOi.R7QSZn54O4fghlwQmEuAjyIwSxulvYu', 'active'),
(51, 'malaksaadaoui@gmail.com', '$2y$10$ZFmqhs55Z1jU4Lt2lCyvDe1Y7eFdTuHPT7N96SK9qtm8AYBSfuh5a', 'active'),
(52, 'sarahimmi@gmail.com', '$2y$10$2a60OjpkyJcjiHHRyA/aw.04ULuBSShMht9kL9aaLKYrmsBz6tkgS', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `usersadmin`
--

CREATE TABLE `usersadmin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usersadmin`
--

INSERT INTO `usersadmin` (`id`, `username`, `password`) VALUES
(1, 'admin', '1111');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_checkout`
--
ALTER TABLE `order_checkout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `support_messages`
--
ALTER TABLE `support_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`),
  ADD KEY `email_2` (`email`);

--
-- Indexes for table `usersadmin`
--
ALTER TABLE `usersadmin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9921;

--
-- AUTO_INCREMENT for table `order_checkout`
--
ALTER TABLE `order_checkout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9980;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `support_messages`
--
ALTER TABLE `support_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `usersadmin`
--
ALTER TABLE `usersadmin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
