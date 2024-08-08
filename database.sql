-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for lsstest
CREATE DATABASE IF NOT EXISTS `lsstest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `lsstest`;

-- Dumping structure for table lsstest.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `personId` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `age` varchar(50) DEFAULT NULL,
  `positionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`personId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table lsstest.employees: ~6 rows (approximately)
INSERT INTO `employees` (`personId`, `firstname`, `lastname`, `age`, `positionId`) VALUES
	(65, 'Adum', 'Smith', '35', 2),
	(66, 'Sam', 'Ladis', '41', 3),
	(67, 'Janny', 'Kim', '28', 4),
	(68, 'Swain', 'Loly', '24', 1),
	(69, 'Molly', 'Magnate', '28', 2),
	(70, 'Lovely', 'Lilly', '23', 4);

-- Dumping structure for table lsstest.personal
CREATE TABLE IF NOT EXISTS `personal` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '0',
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table lsstest.personal: ~4 rows (approximately)
INSERT INTO `personal` (`userId`, `username`, `password`, `email`) VALUES
	(1, 'admin', '1234', 'admin@admin.com'),
	(4, 'test', 'test', 'test@tes.com'),
	(39, 'test5', '111', 'test@tes.com'),
	(43, '2', '2', 'test@tes.com');

-- Dumping structure for table lsstest.position
CREATE TABLE IF NOT EXISTS `position` (
  `positionId` int(11) NOT NULL AUTO_INCREMENT,
  `positionName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`positionId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table lsstest.position: ~4 rows (approximately)
INSERT INTO `position` (`positionId`, `positionName`) VALUES
	(1, 'Developer'),
	(2, 'Senior Developer'),
	(3, 'Manager'),
	(4, 'Designer');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
