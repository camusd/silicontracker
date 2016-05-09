CREATE DATABASE  IF NOT EXISTS `tracker` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tracker`;
-- MySQL dump 10.13  Distrib 5.7.9, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: tracker
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Board`
--

DROP TABLE IF EXISTS `Board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Board` (
  `product_id` int(11) unsigned NOT NULL,
  `fpga` varchar(30),
  `bios` varchar(75),
  `mac` varchar(17),
  `fab` varchar(10),
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `product_id_INDEX` (`product_id`),
  CONSTRAINT `fk_Board_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Board`
--

LOCK TABLES `Board` WRITE;
/*!40000 ALTER TABLE `Board` DISABLE KEYS */;
/*!40000 ALTER TABLE `Board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Checkout`
--

DROP TABLE IF EXISTS `Checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Checkout` (
  `product_id` int(11) unsigned NOT NULL,
  `user` varchar(8) NOT NULL,
  `checkout_date` datetime NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `id_UNIQUE` (`product_id`),
  KEY `user_INDEX` (`user`),
  CONSTRAINT `fk_Checkout_Owners1` FOREIGN KEY (`user`) REFERENCES `Owners` (`wwid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Checkout_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE
    NO ACTION
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Checkout`
--

LOCK TABLES `Checkout` WRITE;
/*!40000 ALTER TABLE `Checkout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Checkout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dropdown_Attributes`
--

DROP TABLE IF EXISTS `Dropdown_Attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dropdown_Attributes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `attr_type` varchar(20) NOT NULL,
  `attr_value` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dropdown_Attributes`
--

LOCK TABLES `Dropdown_Attributes` WRITE;
/*!40000 ALTER TABLE `Dropdown_Attributes` DISABLE KEYS */;
INSERT INTO `Dropdown_Attributes` VALUES (1,'codename','Sandy Bridge'),(2,'codename','Jaketown'),(3,'codename','Haswell'),(4,'codename','Crystal Well'),(5,'codename','Bay Trail'),(6,'codename','Haswell Server'),(7,'codename','Broadwell'),(8,'codename','Skylake'),(9,'cpu class','Mobile'),(10,'cpu class','EP'),(11,'cpu class','Desktop'),(12,'cpu class','Atom'),(13,'cpu class','ULT');
/*!40000 ALTER TABLE `Dropdown_Attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flash_Drive`
--

DROP TABLE IF EXISTS `Flash_Drive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Flash_Drive` (
  `product_id` int(11) unsigned NOT NULL,
  `manufacturer` varchar(45) NOT NULL,
  `capacity` int(5) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `id_UNIQUE` (`product_id`),
  CONSTRAINT `fk_Flash_Drive_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flash_Drive`
--

LOCK TABLES `Flash_Drive` WRITE;
/*!40000 ALTER TABLE `Flash_Drive` DISABLE KEYS */;
/*!40000 ALTER TABLE `Flash_Drive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Items` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `serial_num` varchar(20) NOT NULL,
  `item_type` varchar(30) NOT NULL,
  `notes` text NOT NULL,
  `checked_in` tinyint(1) NOT NULL DEFAULT '1',
  `scrapped` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `serial_num_UNIQUE` (`serial_num`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Items`
--

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
INSERT INTO `Items` VALUES (1,'2V127163B0897','cpu','',1,0),(2,'35127210J0054','cpu','',1,0),(3,'35127210J0084','cpu','',1,0),(4,'2V127163B0110','cpu','',1,0),(5,'35127210J0092','cpu','',1,0),(6,'2V127163B0675','cpu','',1,0),(7,'35125272R0021','cpu','',1,0),(8,'2V127163B0804','cpu','',1,0),(9,'35127210J0029','cpu','',1,0),(10,'35127210J0062','cpu','',1,0),(11,'2V127163B0872','cpu','',1,0),(12,'2V127163B0686','cpu','',1,0),(13,'35127210J0078','cpu','',1,0),(14,'35127210J0055','cpu','',1,0),(15,'35127210J0083','cpu','',1,0);
/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Log`
--

DROP TABLE IF EXISTS `Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned NOT NULL,
  `user` varchar(8) NOT NULL,
  `log_date` datetime NOT NULL,
  `checked_in` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_INDEX` (`user`),
  KEY `product_id_INDEX` (`product_id`),
  CONSTRAINT `fk_Log_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Log_Owners1` FOREIGN KEY (`user`) REFERENCES `Owners` (`wwid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Log`
--

LOCK TABLES `Log` WRITE;
/*!40000 ALTER TABLE `Log` DISABLE KEYS */;
/*!40000 ALTER TABLE `Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Owners`
--

DROP TABLE IF EXISTS `Owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Owners` (
  `wwid` varchar(8) NOT NULL,
  `idsid` varchar(12) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `email_address` varchar(60) NOT NULL,
  `is_admin` tinyint(1) unsigned DEFAULT '0',
  `overdue_item_email_setting` tinyint(1) unsigned DEFAULT '1',
  `overdue_item_email_frequency` int(3) unsigned DEFAULT '30',
  `cart_summary_email_setting` tinyint(1) unsigned DEFAULT '1',
  PRIMARY KEY (`wwid`),
  UNIQUE KEY `wwid_UNIQUE` (`wwid`),
  UNIQUE KEY `idsid_UNIQUE` (`idsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Owners`
--

LOCK TABLES `Owners` WRITE;
/*!40000 ALTER TABLE `Owners` DISABLE KEYS */;
INSERT INTO `Owners` VALUES ('1','1','test_user','test_user', 'test.silicon.tracker@gmail.com',0, 1, 30, 1),('123','123','Hayes','Brett','test.silicon.tracker@gmail.com',1, 1, 30, 1),('222','222','User','NonAdmin','test.silicon.tracker@gmail.com',0, 1, 30, 1),('456','456','Camus','Dylan','test.silicon.tracker@gmail.com', 1, 1, 30, 0),('789','789','Cronise','Joseph','test.silicon.tracker@gmail.com',1, 1, 30, 1),('282','282','Oehrlein','Scott','test.silicon.tracker@gmail.com',1, 1, 30, 1);
/*!40000 ALTER TABLE `Owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Processor`
--

DROP TABLE IF EXISTS `Processor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Processor` (
  `product_id` int(11) unsigned NOT NULL,
  `spec` varchar(5) NOT NULL,
  `mm` varchar(7) NOT NULL,
  `frequency` varchar(5) NOT NULL,
  `stepping` varchar(6) NOT NULL,
  `llc` float NOT NULL,
  `cores` int(4) NOT NULL,
  `codename` varchar(25) NOT NULL,
  `cpu_class` varchar(10) NOT NULL,
  `external_name` varchar(25) DEFAULT NULL,
  `architecture` varchar(25) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `product_id_INDEX` (`product_id`),
  CONSTRAINT `fk_Processor_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Processor`
--

LOCK TABLES `Processor` WRITE;
/*!40000 ALTER TABLE `Processor` DISABLE KEYS */;
INSERT INTO `Processor` VALUES (1,'SR02U','910244','2.5','D2',3,2,'Sandy Bridge','Mobile','Core i5-2510E','Sandy Bridge'),(2,'SR02T','910243','2.1','D2',6,4,'Sandy Bridge','Mobile','Core i7-2710QE','Sandy Bridge'),(3,'SR1XV','935852','2.2','M1',30,12,'Haswell Server','EP','Xeon E5-2658 v3','Haswell'),(4,'SR195','929620','1.8','C0',6,4,'Crystal Well','Mobile','Core i7-4860EQ','Haswell'),(5,'SR0KQ','919841','2','C2',20,8,'Jaketown','EP','Xeon E5-2650','Sandy Bridge'),(6,'SR2F1','944341','2.6','D1',4,2,'Skylake','ULT','Core i7-6600U','Skylake'),(7,'SR2E8','944076','2.7','G1',6,4,'Broadwell','Mobile','Core i7-5850EQ','Broadwell'),(8,'SR1W5','934898','1.58','C0',1,2,'Bay Trail','Atom','Celeron N2807','Silvermont'),(9,'SR2E9','944077','1.8','G1',6,4,'Broadwell','Mobile','Xeon E3-1258L v4','Broadwell'),(10,'SR268','939656','1.8','F0',3,2,'Broadwell','ULT','Core i5-5350U','Broadwell'),(11,'SR268','939656','1.8','F0',3,2,'Broadwell','ULT','Core i5-5350U','Broadwell'),(12,'SR2E7','944075','2','G1',6,4,'Broadwell','Mobile','Xeon E3-1278L v4','Broadwell'),(13,'SR180','929227','2.4','C0',4,2,'Haswell','Desktop','Core i3-4330TE','Haswell'),(14,'SR17N','929207','2.4','C0',3,2,'Haswell','Mobile','Core i3-4100E','Haswell'),(15,'SR17N','929207','2.4','C0',3,2,'Haswell','Mobile','Core i3-4100E','Haswell');
/*!40000 ALTER TABLE `Processor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RAM`
--

DROP TABLE IF EXISTS `RAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RAM` (
  `product_id` int(11) unsigned NOT NULL,
  `manufacturer` varchar(45) NOT NULL,
  `physical_size` varchar(15) NOT NULL,
  `memory_type` varchar(12) NOT NULL,
  `capacity` int(5) NOT NULL,
  `speed` int(5) NOT NULL,
  `ecc` varchar(12) NOT NULL,
  `ranks` int(3) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `product_id_INDEX` (`product_id`),
  CONSTRAINT `fk_RAM_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RAM`
--

LOCK TABLES `RAM` WRITE;
/*!40000 ALTER TABLE `RAM` DISABLE KEYS */;
/*!40000 ALTER TABLE `RAM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservations`
--

DROP TABLE IF EXISTS `Reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reservations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned NOT NULL,
  `current_user` varchar(8) NOT NULL,
  `waiting_user` varchar(8) NOT NULL,
  `reservation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `product_id_INDEX` (`product_id`),
  KEY `current_user_INDEX` (`current_user`),
  KEY `waiting_user_INDEX` (`waiting_user`),
  CONSTRAINT `fk_Reservations_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservations_Owners1` FOREIGN KEY (`current_user`) REFERENCES `Owners` (`wwid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservations_Owners2` FOREIGN KEY (`waiting_user`) REFERENCES `Owners` (`wwid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservations`
--

LOCK TABLES `Reservations` WRITE;
/*!40000 ALTER TABLE `Reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SSD`
--

DROP TABLE IF EXISTS `SSD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SSD` (
  `product_id` int(11) unsigned NOT NULL,
  `manufacturer` varchar(45) NOT NULL,
  `model` varchar(15) NOT NULL,
  `capacity` int(5) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `product_id_INDEX` (`product_id`),
  CONSTRAINT `fk_SSD_Items1` FOREIGN KEY (`product_id`) REFERENCES `Items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SSD`
--

LOCK TABLES `SSD` WRITE;
/*!40000 ALTER TABLE `SSD` DISABLE KEYS */;
/*!40000 ALTER TABLE `SSD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `System`
--

DROP TABLE IF EXISTS `System`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `System` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cpu_serial_num` varchar(14) NOT NULL,
  `board_serial_num` varchar(9) NOT NULL,
  `ssd_serial_num` varchar(16) NOT NULL,
  `memory_serial_num` varchar(20) NOT NULL,
  `in_use_by` varchar(30) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `since` datetime NOT NULL,
  `location` varchar(25) NOT NULL,
  `num_dimms` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `memory_serial_num_UNIQUE` (`memory_serial_num`),
  UNIQUE KEY `ssd_serial_num_UNIQUE` (`ssd_serial_num`),
  UNIQUE KEY `board_serial_num_UNIQUE` (`board_serial_num`),
  UNIQUE KEY `cpu_serial_num_UNIQUE` (`cpu_serial_num`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `System`
--

LOCK TABLES `System` WRITE;
/*!40000 ALTER TABLE `System` DISABLE KEYS */;
/*!40000 ALTER TABLE `System` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tracker'
--
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `check_type`(IN which_serial VARCHAR(20))
BEGIN
  SELECT Item.item_type, Checkout.wwid
    FROM Checkout JOIN Items ON Checkout.product_id = Items.id
    WHERE Items.serial_num = which_serial;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_serial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `check_serial`(IN which_serial VARCHAR(20))
BEGIN
  SELECT serial_num
    FROM Items
    WHERE serial_num = which_serial;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_addr` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_addr`(IN user varchar(8))
BEGIN
  SELECT
    email_address, cart_summary_email_setting, first_name, last_name, NOW() AS order_date
  FROM
    Owners
  WHERE
    wwid = user;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_board` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_board`()
BEGIN
  SELECT
    serial_num, fpga, bios, mac, fab,
    Checkout.user, checked_in, notes, scrapped
  FROM 
    Board INNER JOIN Items
        ON Board.product_id = Items.id JOIN Checkout
        ON Checkout.product_id = Items.id
    WHERE
    scrapped = 0
        AND Items.item_type = 'board';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_checkout_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_checkout_status`(IN item varchar(20))
BEGIN
  SELECT
    checked_in
  FROM
    Items
  WHERE
    serial_num = item;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_checkout_summary` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_checkout_summary`(IN user varchar(8))
BEGIN
  SELECT
    email_address, 
    first_name, 
    last_name, 
    serial_num, 
    item_type,
    TIMESTAMPDIFF(DAY, Checkout.checkout_date, NOW()) AS days
  FROM
    Owners JOIN Checkout
      ON Checkout.user = Owners.wwid LEFT JOIN Items
      ON Items.id = Checkout.product_id
  WHERE
    Owners.wwid = user;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_overdue_owner` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_overdue_owner`()
BEGIN
  SELECT 
    wwid
  FROM
    Owners JOIN Checkout
      ON Checkout.user = Owners.wwid LEFT JOIN Items
      ON Items.id = Checkout.product_id
  GROUP BY
    wwid
  HAVING
    TIMESTAMPDIFF(DAY, NOW(), Checkout.checkout_date) >= overdue_item_email_frequency AND
    overdue_item_email_setting = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cpu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_cpu`()
BEGIN
	SELECT
		serial_num, spec, mm, frequency, stepping, 
      llc, cores, codename, cpu_class, external_name,
		  architecture, Checkout.user, checked_in, notes, scrapped
	FROM 
		Processor INNER JOIN Items
        ON Processor.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
		scrapped = 0
        AND Items.item_type = 'cpu';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_cpu_by_serial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_cpu_by_serial`(IN which_serial VARCHAR(20))
BEGIN
  SELECT
    serial_num, spec, mm, frequency, stepping, 
      llc, cores, codename, cpu_class, external_name,
      architecture, Checkout.user, checked_in, notes, scrapped
  FROM 
    Processor INNER JOIN Items
        ON Processor.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    serial_num = which_serial
        AND Items.item_type = 'cpu';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_ssd_by_serial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_ssd_by_serial`(IN which_serial VARCHAR(20))
BEGIN
  SELECT
    serial_num, manufacturer, model,
        capacity, Checkout.user, checked_in, notes, scrapped
  FROM 
    SSD INNER JOIN Items
        ON SSD.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    serial_num = which_serial
        AND Items.item_type = 'ssd';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_memory_by_serial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_memory_by_serial`(IN which_serial VARCHAR(20))
BEGIN
  SELECT
    serial_num, manufacturer, physical_size,
        memory_type, capacity, speed, ecc, ranks,
        Checkout.user, checked_in, notes, scrapped
  FROM 
    RAM INNER JOIN Items
        ON RAM.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    serial_num = which_serial
        AND Items.item_type = 'memory';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_flash_by_serial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_flash_by_serial`(IN which_serial VARCHAR(20))
BEGIN
  SELECT
    serial_num, manufacturer, capacity,
        Checkout.user, checked_in, notes, scrapped
  FROM 
    Flash_Drive INNER JOIN Items
        ON Flash_Drive.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    serial_num = which_serial
        AND Items.item_type = 'flash';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_board_by_serial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_board_by_serial`(IN which_serial VARCHAR(20))
BEGIN
  SELECT
    serial_num, fpga, bios, mac, fab,
    Checkout.user, checked_in, notes, scrapped
  FROM 
    Board INNER JOIN Items
        ON Board.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    serial_num = which_serial
        AND Items.item_type = 'board';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dropdown` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_dropdown`(IN attr VARCHAR(20))
BEGIN
	SELECT 	attr_value
  FROM	Dropdown_Attributes
  WHERE	lcase(attr_type) = attr;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dropdown_keys` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_dropdown_keys`()
BEGIN
  SELECT DISTINCT attr_type
  FROM  Dropdown_Attributes;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_flash` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_flash`()
BEGIN
	SELECT
		serial_num, manufacturer, capacity,
        Checkout.user, checked_in, notes, scrapped
	FROM 
		Flash_Drive INNER JOIN Items
        ON Flash_Drive.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
		scrapped = 0
        AND Items.item_type = 'flash';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_memory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_memory`()
BEGIN
	SELECT
		serial_num, manufacturer, physical_size,
        memory_type, capacity, speed, ecc, ranks,
        Checkout.user, checked_in, notes, scrapped
	FROM 
		RAM INNER JOIN Items
        ON RAM.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
		scrapped = 0
        AND Items.item_type = 'memory';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_scanned_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_scanned_item`(IN sn VARCHAR(20))
BEGIN

SET @t := (SELECT Items.item_type FROM Items WHERE serial_num = sn);
IF @t = 'cpu' THEN
  SET @q = CONCAT("SELECT i.serial_num, c.spec, c.mm, c.frequency, c.stepping, c.llc,
    c.cores, c.codename, c.cpu_class, c.external_name, c.architecture, 
    i.item_type, i.notes, i.checked_in, i.scrapped 
    FROM Processor c
        JOIN Items i ON i.id = c.product_id
        WHERE i.serial_num='", sn, "'");
END IF;

IF @t = 'ssd' THEN
  SET @q = CONCAT("SELECT i.serial_num, d.manufacturer, d.model, d.capacity,
    i.item_type, i.notes, i.checked_in, i.scrapped
    FROM SSD d 
        JOIN Items i ON i.id = d.product_id
        WHERE i.serial_num='", sn, "'");
END IF;

IF @t = 'memory' THEN
  SET @q = CONCAT("SELECT i.serial_num, r.manufacturer, r.physical_size,
    r.memory_type, r.capacity, r.speed, r.ecc, r.ranks,
        i.item_type, i.notes, i.checked_in, i.scrapped
    FROM RAM r
        JOIN Items i ON i.id = r.product_id
        WHERE i.serial_num='", sn, "'");
END IF;

IF @t = 'flash' THEN
  SET @q = CONCAT("SELECT i.serial_num, f.manufacturer, f.capacity,
    i.item_type, i.notes, i.checked_in, i.scrapped
    FROM Flash_Drive f
        JOIN Items i ON i.id = f.product_id
        WHERE i.serial_num='", sn, "'");
END IF;

IF @t = 'board' THEN
  SET @q = CONCAT("SELECT i.serial_num, b.fpga, b.bios, b.mac, b.fab,
    i.item_type, i.notes, i.checked_in, i.scrapped
    FROM Board b
        JOIN Items i ON i.id = b.product_id
        WHERE i.serial_num='", sn, "'");
END IF;

IF @t IS NULL THEN
  SET @q = "SELECT \"NA\" AS item_type";
END IF;

PREPARE stmt FROM @q;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_scrapped_cpu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_scrapped_cpu`()
BEGIN
  SELECT
    serial_num, spec, mm, frequency, stepping, 
      llc, cores, codename, cpu_class, external_name,
      architecture, Checkout.user, checked_in, notes, scrapped
  FROM 
    Processor INNER JOIN Items
        ON Processor.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    scrapped = 1
        AND Items.item_type = 'cpu';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_scrapped_ssd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_scrapped_ssd`()
BEGIN
  SELECT
    serial_num, manufacturer, model,
        capacity, Checkout.user, checked_in, notes, scrapped
  FROM 
    SSD INNER JOIN Items
        ON SSD.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    scrapped = 1
        AND Items.item_type = 'ssd';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_scrapped_memory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_scrapped_memory`()
BEGIN
  SELECT
    serial_num, manufacturer, physical_size,
        memory_type, capacity, speed, ecc, ranks,
        Checkout.user, checked_in, notes, scrapped
  FROM 
    RAM INNER JOIN Items
        ON RAM.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    scrapped = 1
        AND Items.item_type = 'memory';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_scrapped_flash` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_scrapped_flash`()
BEGIN
  SELECT
    serial_num, manufacturer, capacity,
        Checkout.user, checked_in, notes, scrapped
  FROM 
    Flash_Drive INNER JOIN Items
        ON Flash_Drive.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    scrapped = 1
        AND Items.item_type = 'flash';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_scrapped_board` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_scrapped_board`()
BEGIN
  SELECT
    serial_num, fpga, bios, mac, fab,
    Checkout.user, checked_in, notes, scrapped
  FROM 
    Board INNER JOIN Items
        ON Board.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
    scrapped = 1
        AND Items.item_type = 'board';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_scrapped_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_scrapped_status`()
BEGIN
  SELECT 
    (SELECT COUNT(*) FROM Items WHERE scrapped=1) AS num_scrapped,
    (SELECT COUNT(*) FROM Items WHERE scrapped=0) AS num_active
  FROM Items
    GROUP BY scrapped;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_ssd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_ssd`()
BEGIN
	SELECT
		serial_num, manufacturer, model,
        capacity, Checkout.user, checked_in, notes, scrapped
	FROM 
		SSD INNER JOIN Items
        ON SSD.product_id = Items.id LEFT JOIN Checkout
        ON Checkout.product_id = Items.id
  WHERE
		scrapped = 0
        AND Items.item_type = 'ssd';


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_from_wwid` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_user_from_wwid`(IN pwwid VARCHAR(20))
BEGIN
  SELECT last_name, first_name, is_admin
    FROM Owners
    WHERE wwid = pwwid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_from_checkout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_user_from_checkout`(IN item VARCHAR(20))
BEGIN
  SELECT last_name, first_name
    FROM Checkout LEFT JOIN Owners ON
    Checkout.user = Owners.wwid LEFT JOIN Items ON
    Checkout.product_id = Items.id
    WHERE serial_num = item;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `put_board` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `put_board`(IN new_serial_num VARCHAR(20),
 IN new_fpga VARCHAR(8),
 IN new_bios VARCHAR(8),
 IN new_mac VARCHAR(17),
 IN new_fab VARCHAR(5),
 IN new_notes TEXT)
BEGIN
  INSERT INTO Items
    (item_type, serial_num, notes, scrapped, checked_in)
  VALUES
    ('board', new_serial_num, new_notes, 0, 1);
  INSERT INTO Board
    (product_id, fpga,
         bios, mac, fab)
  VALUES
    (LAST_INSERT_ID(), new_fpga,
         new_bios, new_mac, new_fab);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `put_cpu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `put_cpu`(IN `new_serial_num` VARCHAR(20), IN `new_spec` VARCHAR(5), IN `new_mm` VARCHAR(7), IN `new_frequency` VARCHAR(5), IN `new_stepping` VARCHAR(6), IN `new_llc` FLOAT, IN `new_cores` INT(4), IN `new_codename` VARCHAR(25), IN `new_cpu_class` VARCHAR(10), IN `new_external_name` VARCHAR(25), IN `new_architecture` VARCHAR(25), IN `new_notes` TEXT)
BEGIN
	INSERT INTO Items
		(item_type, serial_num, notes, scrapped, checked_in)
	VALUES
		('cpu', new_serial_num, new_notes, 0, 1);
	INSERT INTO Processor
		(product_id, spec, mm, frequency,
         stepping, llc, cores, codename, cpu_class,
         external_name, architecture)
	VALUES
		(LAST_INSERT_ID(), new_spec,
         new_mm, new_frequency, new_stepping, new_llc,
         new_cores, new_codename, new_cpu_class,
         new_external_name, new_architecture);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `put_flash_drive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `put_flash_drive`(IN new_serial_num VARCHAR(20),
 IN new_manufacturer VARCHAR(15),
 IN new_capacity INT(5),
 IN new_notes TEXT)
BEGIN
	INSERT INTO Items
		(item_type, serial_num, notes, scrapped, checked_in)
	VALUES
		('flash', new_serial_num, new_notes, 0, 1);
	INSERT INTO Flash_Drive
		(product_id, manufacturer, capacity)
	VALUES
		(LAST_INSERT_ID(),
         new_manufacturer, new_capacity);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `put_memory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `put_memory`(IN new_serial_num VARCHAR(20),
 IN new_manufacturer VARCHAR(15),
 IN new_physical_size VARCHAR(15),
 IN new_memory_type VARCHAR(12),
 IN new_capacity INT(5),
 IN new_speed INT(5),
 IN new_ecc VARCHAR(12),
 IN new_ranks INT(3),
 IN new_notes TEXT)
BEGIN
	INSERT INTO Items
		(item_type, serial_num, notes, scrapped, checked_in)
	VALUES
		('memory', new_serial_num, new_notes, 0, 1);
	INSERT INTO RAM
		(product_id, manufacturer, physical_size,
         memory_type, capacity, speed, ecc, ranks)
	VALUES
		(LAST_INSERT_ID(), new_manufacturer,
         new_physical_size, new_memory_type, new_capacity,
         new_speed, new_ecc, new_ranks);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `put_ssd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `put_ssd`(IN new_serial_num VARCHAR(20),
 IN new_manufacturer VARCHAR(15),
 IN new_model VARCHAR(15),
 IN new_capacity INT(5),
 IN new_notes TEXT)
BEGIN
	INSERT INTO Items
		(item_type, serial_num, notes, scrapped, checked_in)
	VALUES
		('ssd', new_serial_num, new_notes, 0, 1);
	INSERT INTO SSD
		(product_id, manufacturer, model, capacity)
	VALUES
		(LAST_INSERT_ID(), new_manufacturer,
         new_model, new_capacity);
         
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `scan_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `scan_item`(IN new_user VARCHAR(8),
 IN item VARCHAR(20))
BEGIN
  SET @pid = (SELECT id
    FROM Items
    WHERE serial_num = item);
  
  SET @checked_in = (SELECT checked_in
    FROM Items
    WHERE id = @pid);

  SET @user = (SELECT user
    FROM Checkout LEFT JOIN Items ON
    Checkout.product_id = Items.id
    WHERE serial_num = item);

  UPDATE Items i
    SET i.checked_in = NOT @checked_in
    WHERE i.id = @pid;

  INSERT INTO Log (product_id, user, log_date, checked_in)
  VALUES (@pid, new_user, NOW(), NOT @checked_in);

  IF @checked_in = 1 THEN CALL put_checkout(@pid, new_user);
  ELSE CALL delete_checkout(@pid);
  END IF;

  SELECT
    item_type, checked_in, @user AS user
  FROM
    Items
  WHERE
    serial_num = item;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `scrap_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `scrap_item`(IN item VARCHAR(20))
BEGIN
  UPDATE
    Items
  SET 
    Items.scrapped = 1
    WHERE
    serial_num = item;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_board` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_board`(IN `the_serial_num` VARCHAR(20), IN `new_fpga` VARCHAR(30), IN `new_bios` VARCHAR(75), IN `new_mac` VARCHAR(17), IN `new_fab` VARCHAR(10), IN `new_notes` TEXT, IN `new_scrapped` TINYINT(1))
BEGIN
    DECLARE board_id INT;
    SET board_id := (SELECT id 
           FROM Items
           WHERE serial_num = the_serial_num
          );

  UPDATE  Items i
  SET   i.notes = new_notes,
      i.scrapped = new_scrapped
    WHERE i.id = board_id;
    
    UPDATE  Board
    SET     fpga = new_fpga,
      bios = new_bios,
            mac = new_mac,
            fab = new_fab
    WHERE product_id = board_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_notes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_notes`(IN s varchar(20), IN n text)
BEGIN
  UPDATE Items i
    SET i.notes = n
    WHERE serial_num = s;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_cpu` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_cpu`(IN `the_serial_num` VARCHAR(20), IN `new_spec` VARCHAR(5), IN `new_mm` VARCHAR(7), IN `new_frequency` VARCHAR(5), IN `new_stepping` VARCHAR(6), IN `new_llc` FLOAT, IN `new_cores` INT(4), IN `new_codename` VARCHAR(25), IN `new_cpu_class` VARCHAR(10), IN `new_external_name` VARCHAR(25), IN `new_architecture` VARCHAR(25), IN `new_notes` TEXT, IN `new_scrapped` TINYINT(1))
BEGIN
  DECLARE processor_id INT;
  SET processor_id := 
    ( SELECT id 
      FROM Items
      WHERE serial_num = the_serial_num
    );

  UPDATE  Items i
  SET     i.notes = new_notes,
          i.scrapped = new_scrapped
  WHERE   i.id = processor_id;
    
  UPDATE  Processor
  SET     spec = new_spec,
          mm = new_mm,
          frequency = new_frequency,
          stepping = new_stepping,
          llc = new_llc,
          cores = new_cores,
          codename = new_codename,
          cpu_class = new_cpu_class,
          external_name = new_external_name,
          architecture = new_architecture
  WHERE   product_id = processor_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_flash` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_flash`(IN `the_serial_num` VARCHAR(20), IN `new_capacity` INT, IN `new_manufacturer` VARCHAR(45), IN `new_notes` TEXT, IN `new_scrapped` TINYINT(1))
BEGIN
    DECLARE flash_id INT;
    SET flash_id := (SELECT id
             FROM Items
                         WHERE serial_num = the_serial_num
          );

  UPDATE  Items i
  SET   i.notes = new_notes,
      i.scrapped = new_scrapped
    WHERE i.id = flash_id;
    
    UPDATE  Flash_Drive
    SET   capacity = new_capacity,
      manufacturer = new_manufacturer
    WHERE product_id = flash_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_ssd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_ssd`(IN `the_serial_num` VARCHAR(20), IN `new_capacity` INT, IN `new_manufacturer` VARCHAR(45), IN `new_model` VARCHAR(15), IN `new_notes` TEXT, IN `new_scrapped` TINYINT(1))
BEGIN
    DECLARE ssd_id INT;
    SET ssd_id := (SELECT id 
             FROM Items 
                         WHERE serial_num = the_serial_num
            );

  UPDATE  Items i
  SET   i.notes = new_notes,
      i.scrapped = new_scrapped
    WHERE i.id = ssd_id;
    
    UPDATE  SSD
    SET   capacity = new_capacity,
      manufacturer = new_manufacturer,
            model = new_model
    WHERE product_id = ssd_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_memory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE PROCEDURE `update_memory`(IN `the_serial_num` VARCHAR(20), IN `new_manufacturer` VARCHAR(45), IN `new_physical_size` VARCHAR(15), IN `new_memory_type` VARCHAR(12), IN `new_capacity` INT(5), IN `new_speed` INT(5), IN `new_ecc` VARCHAR(12), IN `new_ranks` INT(3), IN `new_notes` TEXT, IN `new_scrapped` TINYINT(1))
BEGIN
    DECLARE memory_id INT;
    SET memory_id := (SELECT id 
            FROM Items
            WHERE serial_num = the_serial_num
           );

  UPDATE  Items i
  SET   i.notes = new_notes,
      i.scrapped = new_scrapped
    WHERE i.id = memory_id;
    
    UPDATE  RAM
    SET   manufacturer = new_manufacturer,
      physical_size = new_physical_size,
            memory_type = new_memory_type,
            capacity = new_capacity,
            speed = new_speed,
            ecc = new_ecc,
            ranks = new_ranks
    WHERE product_id = memory_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `put_checkout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `put_checkout`(IN item INT(11),
 IN new_user VARCHAR(8))
BEGIN
  INSERT INTO Checkout
    (product_id, user, checkout_date)
  VALUES
    (item, new_user, NOW());

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_checkout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE PROCEDURE `delete_checkout`(IN item INT(11))
BEGIN 
  DELETE FROM Checkout WHERE Checkout.product_id = item;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-04 10:56:09
