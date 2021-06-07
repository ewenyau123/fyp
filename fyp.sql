-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2021 at 03:38 AM
-- Server version: 10.5.9-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fyp`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` int(10) NOT NULL,
  `question` varchar(400) NOT NULL,
  `answers` varchar(400) NOT NULL,
  `difficulty` int(10) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `correct` int(11) NOT NULL,
  `incorrect` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `question`, `answers`, `difficulty`, `teacher_id`, `correct`, `incorrect`) VALUES
(40001, '14+28=?', '42', 1, 10001, 3, 4),
(40002, '32+87=?', '119', 1, 10001, 10, 22),
(40003, '9/18 x 18/9 =?/?', '1', 2, 10001, 23, 44),
(40020, '14+22', '26', 1, 10001, 99, 64),
(40021, '22+20', '42', 1, 10001, 23, 11),
(40022, '22+222', '244', 1, 10001, 0, 0),
(40023, '12kg = ? (mL)', '1200', 3, 10001, 0, 0),
(40024, 'What types of the angle is 87°?', 'acute angle', 4, 10001, 0, 0),
(40025, '4.8 x 9.6=?', '46.08', 5, 10001, 0, 0),
(40026, '14² =?', '196', 6, 10001, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `station_id` int(11) NOT NULL,
  `station_name` varchar(20) NOT NULL,
  `station_price` varchar(20) NOT NULL,
  `owner` varchar(20) DEFAULT NULL,
  `current price` int(10) NOT NULL,
  `sold` tinyint(1) NOT NULL,
  `rent` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`station_id`, `station_name`, `station_price`, `owner`, `current price`, `sold`, `rent`) VALUES
(30002, 'TSIM SHA TSUI', '200', NULL, 200, 1, 120),
(30004, 'KWUN TONG', '200', NULL, 200, 1, 120),
(30005, 'MONG KOK', '200', NULL, 200, 1, 120),
(30007, 'KOWLOON TONG', '200', NULL, 200, 1, 120),
(30009, 'WONG TAI SIN', '200', NULL, 200, 1, 120),
(30010, 'YAU TONG', '200', NULL, 200, 1, 120),
(30012, 'FANLING', '200', NULL, 200, 1, 120),
(30014, 'SHAM TSENG', '200', NULL, 200, 1, 120),
(30015, 'TIN SHUI WAI', '200', NULL, 200, 1, 120),
(30017, 'SHA TIN', '200', NULL, 200, 1, 120),
(30019, 'KWAI CHUNG', '200', NULL, 200, 1, 120),
(30020, 'TSEUNG KWAU O', '200', NULL, 200, 1, 120),
(30022, 'TUNG CHUNG', '200', NULL, 200, 1, 120),
(30024, 'LANTAU', '200', NULL, 200, 1, 120),
(30025, 'Ocean Park', '200', NULL, 200, 1, 120),
(30027, 'DISCOVERY BAY', '200', NULL, 200, 1, 120),
(30029, 'MA WAN', '200', NULL, 200, 1, 120),
(30030, 'CHEUNG CHAU', '200', NULL, 200, 1, 120),
(30032, 'POKFULAM', '200', NULL, 200, 1, 120),
(30034, 'CENTRAL', '200', NULL, 200, 1, 120),
(30035, 'CAUSEWAY BAY', '200', NULL, 200, 1, 120),
(30038, 'REPULSE BAY', '200', NULL, 200, 1, 120),
(30040, 'THE PERK', '200', NULL, 200, 1, 120);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(10) NOT NULL,
  `student_name` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `saving` int(10) NOT NULL,
  `score` int(10) NOT NULL,
  `progress` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_name`, `account`, `password`, `saving`, `score`, `progress`) VALUES
(20001, 'Lam Chok', 'lamc', 'lamc', 2000, 600, 0),
(20002, 'Chan Chan', 'cc', 'cccc', 1000, 500, 1),
(20003, 'Ho Man', 'hm', 'hmhm', 1000, 500, 0),
(20004, 'Cheng Man Ho', 'cmh', 'cmhcmh', 1000, 500, 0);

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL,
  `teacher_name` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `teacher_name`, `account`, `password`) VALUES
(10001, 'Lam Ho Man', 'lhm', 'lhm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`station_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40027;

--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `station_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30042;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10002;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
