-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2023 a las 01:22:28
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ping`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `name` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `address` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `type` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `conf_file` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultimo_ping` datetime DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `addresses`
--

INSERT INTO `addresses` (`id`, `name`, `address`, `type`, `conf_file`, `date`, `ultimo_ping`, `status`) VALUES
(3, 'AP CARDENAS-ENVIA A MECATEPEC', '192.168.2.251', 'Normal', '', '2022-03-17 06:00:00', '2022-03-17 02:03:25', 0),
(4, 'ESTACION MECA-RECIBE DE CARDENAS', '192.168.2.252', 'Normal', '1921680252-ESTACION MECA-RECIBE DE CARDENAS.json', '2020-05-16 17:59:02', '2022-03-16 12:44:54', 0),
(20, 'ESTACION R-7', '192.168.1.126', 'Normal', 'XW-F492BFFEDACB.cfg', '2020-05-28 15:57:23', '2023-03-03 09:03:48', 1),
(51, 'RKT-M2 OMNI OBRERA', '192.168.15.4', 'Normal', NULL, '2020-05-28 16:31:45', '2022-03-16 12:44:54', 0),
(52, 'PWB- ISIS OBRERA ', '192.168.15.6', 'Normal', NULL, '2020-05-28 16:34:44', '2022-03-16 12:44:54', 0),
(56, 'PWB- BAJIO CBTIS', '192.168.80.153', 'Normal', '19216880153-PWB- BAJIO CBTIS.cfg', '2020-05-28 16:38:23', '2022-01-03 01:01:11', 0),
(70, 'RKT-M5 AP ASX', '192.168.1.25', 'Normal', NULL, '2020-05-28 08:37:52', '2023-03-03 09:03:48', 1),
(75, 'AP TIEERA COLORADA', '192.168.1.15', 'Normal', 'b079aec2-a7b7-4296-a571-09f35eb7c1f4.pdf', '2020-05-28 09:02:15', '2023-03-03 09:03:48', 1),
(79, 'AP VINAGRE', '192.168.4.10', 'Normal', '192168410-AP VINAGRE.cfg', '2020-05-28 09:12:52', '2022-11-04 03:11:29', 0),
(80, 'ap dalmacio', '192.168.15.8', 'Normal', NULL, '2020-05-28 09:14:43', '2022-01-03 01:01:13', 0),
(86, 'ESTACION OCUAPAN', '192.168.1.31', 'Normal', '192168131-ESTACION OCUAPAN.json', '2020-05-28 09:19:38', '2023-03-03 09:03:48', 1),
(92, 'AP OCUAPAN', '192.168.1.38', 'Normal', '192168130-AP OCUAPAN.json', '2020-05-28 09:21:46', '2023-03-03 09:03:53', 1),
(96, 'AP SANTA ROSA', '192.168.5.125', 'Normal', NULL, '2020-05-28 09:22:59', '2022-03-18 02:03:27', 0),
(97, 'ESTACION SAN XAVIER', '192.168.0.91', 'Normal', NULL, '2020-05-28 09:23:44', '2022-01-03 01:01:50', 0),
(98, 'ESTACION ASP', '192.168.1.6', 'Normal', '19216816-ESTACION ASP.json', '2020-05-28 09:24:16', '2023-03-03 09:03:02', 1),
(99, 'MECATEPEC SAN XAVIER', '192.168.0.90', 'Normal', NULL, '2020-05-28 09:24:51', '2022-01-03 01:01:51', 0),
(100, 'AP ASP', '192.168.1.5', 'Normal', '19216815-AP ASP.json', '2020-05-28 09:25:06', '2023-03-03 09:03:02', 1),
(106, 'SANTA ROSA', '192.168.5.124', 'Normal', '', '2022-03-17 06:00:00', '2022-03-18 02:03:27', 0),
(119, 'AP OBRERA', '192.168.15.3', 'Normal', NULL, '2020-08-03 13:03:53', '2022-01-03 01:01:13', 0),
(120, 'ESTACION OBRERA', '192.168.15.2', 'Normal', NULL, '2020-08-03 13:04:07', '2022-01-03 01:01:15', 0),
(123, 'Ubiquti networks', '192.168.1.20', 'Scan', NULL, '2020-08-04 11:05:40', '2023-03-03 08:03:42', 0),
(124, 'Cambiun', '192.168.0.2', 'Scan', NULL, '2020-08-04 11:06:35', '2023-03-03 09:03:39', 1),
(125, 'Cambiun', '192.168.0.1', 'Scan', NULL, '2020-08-04 11:06:43', '2023-03-03 09:03:44', 1),
(126, 'Ligo', '192.168.2.66', 'Scan', NULL, '2020-08-04 11:07:08', '2023-03-03 09:03:39', 1),
(129, 'Central telefonica 200', '192.168.11.200', 'Normal', NULL, '2020-08-11 08:22:35', '2022-01-03 01:01:16', 0),
(130, 'Central telefonica 100', '192.168.11.100', 'Normal', NULL, '2020-08-11 08:22:46', '2021-12-28 01:12:50', 0),
(131, 'GATEWAY telefonica SN XAVIER 1', '192.168.11.202', 'Normal', NULL, '2020-08-11 08:23:19', '2021-09-28 11:09:55', 0),
(132, 'GATEWAY telefonica SN XAVIER 2', '192.168.11.104', 'Normal', '132-DETALLLES DE SISTEMAS.docx', '2020-08-11 08:23:31', '2021-08-08 13:02:44', 0),
(133, 'MODEM 24', '192.168.24.254', 'Normal', NULL, '2020-08-18 12:30:39', '2022-11-04 03:11:29', 0),
(135, 'MODEM 1', '192.168.1.254', 'Normal', NULL, '2020-08-18 12:31:06', '2023-03-03 09:03:53', 1),
(138, 'MODEM 5', '192.168.5.254', 'Normal', NULL, '2020-08-18 12:31:36', '2022-03-18 02:03:27', 0),
(141, 'OBRERA- UPCH Power beam', '192.168.15.5', 'Normal', NULL, '2020-08-24 16:37:32', '2022-01-03 01:01:15', 0),
(143, 'Airfiber Ap', '192.168.5.126', 'Normal', '143-ePMP-Backup AP -ISIS-ELPASO-00_04_56_EF_6B_81.json', '2020-08-25 09:27:58', '2022-03-18 02:03:38', 0),
(156, 'ROUTER TABAFRESH WAN1', '192.168.48.50', 'Normal', 'Tabafresh.backup', '2020-09-25 17:53:52', '2022-11-04 03:11:29', 0),
(159, 'AP C33 CAMBIUM', '192.168.15.16', 'Normal', NULL, '2020-12-21 20:04:37', '2022-01-03 01:01:15', 0),
(160, 'MODEM 6', '192.168.6.254', 'Normal', NULL, '2020-12-22 00:14:23', '2022-01-03 01:01:53', 0),
(162, 'AP RECURSOS', '192.168.15.9', 'Normal', NULL, '2020-12-23 00:32:57', '2022-01-03 01:01:15', 0),
(163, 'sectorial c33 sector 60', '192.168.15.10', 'Normal', NULL, '2020-12-23 00:34:14', '2022-01-03 01:01:18', 0),
(165, 'ESTACION TABAFRESH CAMBIUM', '192.168.2.71', 'Normal', 'ESTACION TABAFRESH CAMBIUM', '2021-01-05 21:29:59', '2022-01-03 01:01:53', 0),
(170, 'ESTACION C33 CAMBIUM', '192.168.15.17', 'Normal', NULL, '2021-01-05 21:53:10', '2022-01-03 01:01:18', 0),
(171, 'WIFI C33 M5 2', '192.168.15.12', 'Normal', NULL, '2021-01-05 21:56:05', '2022-01-03 01:01:18', 0),
(172, 'c33LiteAP AC', '192.168.15.15', 'Normal', NULL, '2021-01-05 21:58:09', '2022-01-03 01:01:18', 0),
(173, ' OMNI C33 ISIS', '192.168.15.11', 'Normal', NULL, '2021-01-05 21:58:50', '2022-01-03 01:01:18', 0),
(174, 'AP C33-SECTOR1', '192.168.15.13', 'Normal', NULL, '2021-01-05 22:01:28', '2022-01-03 01:01:18', 0),
(175, 'ROUTER TABAFRESH WAN2', '192.168.6.29', 'Normal', 'b079aec2-a7b7-4296-a571-09f35eb7c1f4.pdf', '2021-01-05 22:04:54', '2022-01-03 01:01:18', 0),
(184, 'AP CANALES-C17', '192.168.2.210', 'Normal', NULL, '2021-03-24 21:35:16', '2022-01-03 01:01:53', 0),
(185, 'ESTACION CANALES-C17', '192.168.2.211', 'Normal', '1921682211-ESTACIÓN C17.json', '2021-03-24 21:44:12', '2022-01-03 01:01:53', 0),
(186, 'SECTOR 2 C17', '192.168.2.244', 'Normal', '1921682244-isis-sec-2.cfg', '2021-03-25 19:15:09', '2022-01-03 01:01:53', 0),
(187, 'MIKROTIK LOCAL', '192.168.16.1', 'Normal', NULL, '2021-03-25 20:10:16', '2022-11-04 03:11:29', 0),
(188, 'MIKROTIK CANALES', '192.168.32.1', 'Normal', NULL, '2021-03-25 20:10:30', '2022-11-04 03:11:29', 0),
(190, 'PBEM C17 2', '192.168.2.245', 'Normal', '1921682245-PBEM C17 2.cfg', '2021-03-26 21:06:53', '2022-01-03 01:01:54', 0),
(191, 'AP GRAVERA', '192.168.2.3', 'Normal', 'ePMP-Backup-ISIS Centro.Gravera-00 04 56 FE 17 F5.json', '2021-04-14 20:58:47', '2022-01-03 01:01:54', 0),
(192, 'AP PINO ZUAREZ', '192.168.2.77', 'Normal', NULL, '2021-04-14 21:21:43', '2022-01-03 01:01:43', 0),
(193, 'ESTACION PINO ZUAREZ', '192.168.2.78', 'Normal', NULL, '2021-04-14 21:21:55', '2022-03-17 11:03:36', 0),
(194, 'LITE C34-SECTOR 2', '192.168.2.117', 'Normal', '1921682117-ISIS-C34-SECTOR 2.cfg', '2021-04-15 12:52:21', '2022-01-03 01:01:39', 0),
(197, 'AP C20', '192.168.24.213', 'Normal', 'ap c20.cfg', '2021-04-23 17:21:05', '2022-11-04 03:11:29', 0),
(198, 'SAN FER SEC1', '192.168.2.83', 'Normal', 'XW-788A203E6391.cfg', '2021-04-24 15:36:06', '2022-01-03 01:01:54', 0),
(199, 'SAN FER SEC 2', '192.168.2.84', 'Normal', 'SAN FER SEC 2.cfg', '2021-04-24 15:42:26', '2022-01-03 01:01:54', 0),
(200, 'AP SAN FERNADO LOCOM2', '192.168.2.82', 'Normal', 'AP SAN FERNADO LOCOM2.cfg', '2021-04-24 15:46:37', '2022-01-03 01:01:55', 0),
(201, 'ROCKET WIFI C17', '192.168.2.243', 'Normal', 'ROCKET WIFI C17.cfg', '2021-04-24 16:14:54', '2022-01-03 01:01:43', 0),
(202, 'isis-c17 sector 3', '192.168.2.246', 'Normal', 'isis-c17 sector 3.cfg', '2021-04-24 16:16:26', '2022-01-03 01:01:55', 0),
(203, 'AP A SAN FERNANDO', '192.168.2.158', 'Normal', 'AP A SAN FERNANDO.cfg', '2021-04-24 16:50:22', '2022-01-03 01:01:55', 0),
(204, 'AP WARICHO', '192.168.2.180', 'Normal', 'AP WARICHO.cfg', '2021-04-24 16:51:50', '2022-01-03 01:01:56', 0),
(206, 'EIGSA', '192.168.2.208', 'Normal', NULL, '2021-04-30 16:42:19', '2022-01-03 01:01:56', 0),
(207, 'SECTORIAL 1 C34', '192.168.2.171', 'Normal', '1921682171-RKTM5 SECTOR 1 C34.cfg', '2021-05-14 13:14:59', '2022-01-03 01:01:39', 0),
(209, 'AP HUIMAN - RELOJ', '192.168.2.33', 'Normal', NULL, '2021-05-14 13:17:44', '2022-01-03 01:01:56', 0),
(210, 'AP C41', '192.168.15.22', 'Normal', NULL, '2021-05-20 13:47:19', '2022-01-03 01:01:18', 0),
(211, 'ESTACION C41', '192.168.15.23', 'Normal', NULL, '2021-05-20 13:47:42', '2022-01-03 01:01:41', 0),
(212, 'OMNI NARANJO', '192.168.2.67', 'Normal', '192168267-OMNI NARANJOS.cfg', '2021-05-20 14:00:29', '2022-01-03 01:01:44', 0),
(213, 'RCKM5 MECA - LA CEIBA', '192.168.2.113', 'Normal', 'RCKM5 MECA - ISIS LA CEIBA.cfg', '2021-05-20 20:58:38', '2022-01-03 01:01:56', 0),
(214, 'ap tabafresh ubiquiti', '192.168.2.7', 'Normal', NULL, '2021-05-21 12:57:36', '2022-01-03 01:01:56', 0),
(215, 'ESTACION TABAFRESH', '192.168.2.8', 'Normal', 'Bastian Schweinsteiger - Sel. Alemania.png', '2021-05-24 13:52:33', '2022-01-03 01:01:41', 0),
(216, 'sectorial zamora', '192.168.2.157', 'Normal', '1921682157-sectorial zamora.cfg', '2021-05-24 13:54:54', '2022-01-03 01:01:56', 0),
(217, 'ESTACION GRAVERA', '192.168.2.4', 'Normal', NULL, '2021-05-24 15:01:56', '2022-01-03 01:01:44', 0),
(218, 'AP HUIMAN-NARANJOS', '192.168.2.166', 'Normal', '1921682166-AP NARANJOS EPMP 1000.json', '2021-05-25 13:24:41', '2022-01-03 01:01:57', 0),
(219, 'ESTACION HUIMAN-NARANJOS', '192.168.2.167', 'Normal', '1921682167-ESTACIÒN NARANJOS EPMP 1000.json', '2021-05-25 13:24:52', '2022-01-03 01:01:57', 0),
(220, 'sectorial wifi PINO SUAREZ', '192.168.2.212', 'Normal', 'sectorial wifi PINO SUAREZ.cfg', '2021-05-25 21:05:55', '2022-01-03 01:01:44', 0),
(222, 'PWBM5 AP2 PINO', '192.168.2.213', 'Normal', 'PWBMS AP2 PINO.cfg', '2021-05-25 21:29:22', '2022-01-03 01:01:44', 0),
(223, 'PW WIFI NARANJOS M5 ', '192.168.1.69', 'Normal', 'PW WIFI NARANJOS M5 ', '2021-05-25 21:36:19', '2023-03-03 09:03:39', 1),
(224, 'AP A ZAMORA', '192.168.2.115', 'Normal', 'AP A ZAMORA.cfg', '2021-05-26 19:08:48', '2022-01-03 01:01:57', 0),
(225, 'ESTACION ZAMORA', '192.168.2.116', 'Normal', 'ESTACION ZAMORA.cfg', '2021-05-26 19:10:32', '2022-01-03 01:01:57', 0),
(226, 'AP polleros', '192.168.2.121', 'Normal', 'AP polleros.cfg', '2021-05-27 18:53:23', '2022-01-03 01:01:44', 0),
(227, 'PWBM5 AL PASO ', '192.168.2.142', 'Normal', 'PWBM5 AL PASO.cfg', '2021-05-27 19:05:46', '2021-12-28 01:12:52', 0),
(228, 'RKT5AC OMNI OCUAPAN', '192.168.2.31', 'Normal', 'RKT5AC OMNI OCUAPAN.cfg', '2021-05-27 19:10:08', '2022-01-03 01:01:57', 0),
(229, 'PWBM5 WIFI OCUAPAN A QUESERO', '192.168.2.35', 'Normal', 'PWBM5 WIFI OCUAPAN A QUESERO.cfg', '2021-05-27 19:18:25', '2022-01-03 01:01:57', 0),
(231, 'RKTM2 OMNI C34', '192.168.2.56', 'Normal', 'RKTM2 OMNI C34.cfg', '2021-05-27 19:39:21', '2022-01-03 01:01:41', 0),
(232, 'PWBM5 ISIS-C34-SECT.3', '192.168.2.137', 'Normal', 'PWBM5 ISIS-C34-SECT.3.cfg', '2021-05-27 19:45:34', '2022-01-03 01:01:41', 0),
(233, 'LOCOM2 WIFI MECA 2', '192.168.2.118', 'Normal', 'LOCOM2 WIFI MECA 2.cfg', '2021-05-27 19:49:12', '2022-01-03 01:01:58', 0),
(236, 'RKTM5 AP RANCHO EL 7', '192.168.2.79', 'Normal', 'RKTM5 AP RANCHO EL 7.cfg', '2021-05-27 20:06:00', '2022-01-03 01:01:58', 0),
(237, 'ROKTM5 AP -C-33', '192.168.2.103', 'Normal', 'RKTM5 AP -C-33.cfg', '2021-05-27 20:12:20', '2022-01-03 01:01:58', 0),
(238, 'PWB-MECA-SECT.4', '192.168.2.203', 'Normal', 'PWB-MECA-SECT.4.cfg', '2021-05-27 20:33:46', '2022-01-03 01:01:58', 0),
(239, 'WIFI MECA SECTOR SUR', '192.168.2.114', 'Normal', 'WIFI MECA SECTOR SUR', '2021-05-27 20:45:52', '2022-01-03 01:01:59', 0),
(240, 'RKTM5 ESTACION TECO', '192.168.2.160', 'Normal', 'RKTM5 ESTACION TECO.cfg', '2021-05-27 21:11:41', '2022-01-03 01:01:59', 0),
(241, 'ePMP 1000 // AP CAÑALES  -A LA - AZUCENA', '192.168.2.154', 'Normal', '1921682154-ePMP-Backup-Caniales.Azucena-00 04 56 DA CE AF.json', '2021-06-01 16:56:47', '2022-01-03 01:01:13', 0),
(242, 'AP TABAFRESH CAMBIUM', '192.168.2.70', 'Normal', '192168270-ePMP-Backup-AP-ISIS-TEBAFRESH-00 04 56 D9 63 B0.json', '2021-06-05 14:58:31', '2022-01-03 01:01:00', 0),
(246, 'AP MATERIALES EL PASO', '192.168.2.10', 'Normal', '192168210-ePMP-Backup-AP-ISIS-ELPASO-1-00 04 56 FE 17 D3.json', '2021-06-15 12:45:25', '2022-01-03 01:01:00', 0),
(247, 'ESTACION MATERIALES EL PASO', '192.168.2.11', 'Normal', '192168311-ePMP-Backup-ISIS-ELPASO-00 04 56 EF 6B 81.json', '2021-06-15 12:45:58', '2022-01-03 01:01:00', 0),
(248, 'ESTACION PROGRESO', '192.168.2.100', 'Normal', NULL, '2021-06-15 12:47:26', '2022-01-03 01:01:00', 0),
(249, 'airROUTER COYMA', '192.168.6.13', 'Normal', '192168513-ROUTER COYMA.cfg', '2021-06-15 13:20:46', '2022-01-03 01:01:00', 0),
(250, 'AP COYMA CAMBIUM ', '192.168.2.6', 'Normal', NULL, '2021-06-15 13:24:35', '2022-01-03 01:01:00', 0),
(251, 'ESTACION COYMA CAMBIUM ', '192.168.0.27', 'Normal', '192168027-ePMP-Backup-ESTACION COYMA-00 04 56 DA 39 D6.json', '2021-06-15 13:26:18', '2022-01-03 01:01:01', 0),
(253, 'ESTACIÓN C34', '192.168.2.141', 'Normal', NULL, '2021-06-16 15:21:15', '2022-01-03 01:01:41', 0),
(254, 'AP TRANSPORTES LORO', '192.168.2.139', 'Normal', NULL, '2021-06-23 14:30:20', '2022-01-03 01:01:01', 0),
(255, 'ESTACION TRANSPORTES LORO', '192.168.10.41', 'Normal', NULL, '2021-06-23 14:30:55', '2022-08-24 09:08:57', 0),
(259, 'ESTACION  ALAMEDA', '192.168.2.176', 'Normal', '', '2021-06-25 15:06:33', '2022-03-17 01:03:42', 0),
(260, 'MTK AZUCENA', '192.168.9.7', 'Normal', '', '2021-06-28 19:07:23', '2022-11-04 03:11:29', 0),
(262, 'AP - TCP ', '192.168.2.144', 'Normal', 'AP - TCP ', '2021-06-29 18:27:45', '2022-01-03 01:01:46', 0),
(264, 'ROUTER LORO', '192.168.33.3', 'Normal', 'ROUTER LORO', '2021-07-07 17:53:48', '2022-11-04 03:11:29', 0),
(265, 'Modem 22', '192.168.22.254', 'Normal', '', '2021-07-20 02:01:10', '2022-11-04 03:11:29', 0),
(268, 'LUZ CAÑALES', '192.168.9.10', 'Normal', '', '2021-08-06 20:42:36', '2022-11-04 03:11:29', 0),
(280, 'ESTACION BAJIO', '192.168.2.150', 'Normal', 'CAMBIUM ESTACION BAJIO.cfg', '2021-08-28 14:17:46', '2022-01-03 01:01:46', 0),
(281, 'Estación pequeña', '192.168.9.132', 'Normal', NULL, '2021-09-05 03:35:25', '2022-11-04 03:11:29', 0),
(282, 'Pequeña ap', '192.168.9.131', 'Normal', NULL, '2021-09-05 03:37:01', '2022-11-04 03:11:29', 0),
(283, 'AP C40', '192.168.15.18', 'Normal', NULL, '2021-09-09 01:25:01', '2022-01-03 01:01:07', 0),
(284, 'Estacion C40', '192.168.15.19', 'Normal', NULL, '2021-09-09 01:26:00', '2022-01-03 01:01:09', 0),
(285, 'AP C32', '192.168.2.88', 'Normal', 'IMG_20211222_100247.jpg', '2021-09-09 17:55:02', '2021-12-29 09:12:42', 0),
(286, 'AP GP-VILLA', '192.168.5.171', 'Normal', NULL, '2021-09-11 01:05:00', '2022-01-03 01:01:46', 0),
(287, 'ESTACION GP-VILLA mafra', '192.168.17.37', 'Normal', NULL, '2021-09-11 01:06:30', '2022-11-04 03:11:29', 0),
(300, 'modem3', '192.168.3.254', 'Normal', NULL, '2021-09-29 03:57:58', '2022-03-18 02:03:27', 0),
(301, 'Ap-c17 Pw400', '192.168.2.247', 'Normal', 'XW.v6.3.6.33330.210818.1930 (2).bin', '2021-10-06 16:53:37', '2022-01-03 01:01:43', 0),
(303, 'AP lite ap ac Clientes WIFI ISIS TECOMINOACAN', '192.168.2.161', 'Normal', 'WA-18E8297CFD8E.cfg', '2021-10-21 23:35:36', '2022-01-03 01:01:46', 0),
(304, 'AP roket clientes WIFI2teco', '192.168.2.162', 'Normal', 'XW-18E8297CF7BE.cfg', '2021-10-21 23:37:15', '2022-01-03 01:01:46', 0),
(305, 'AP PwBm clientes wifi-teco ', '192.168.2.164', 'Normal', 'XW-18E829DEE68C.cfg', '2021-10-21 23:39:02', '2022-01-03 01:01:47', 0),
(306, 'AP Cañales-Santarosa Cambium F200', '192.168.9.121', 'Normal', 'ePMP-Backup-peque-00_04_56_FE_1A_43.json', '2021-10-21 23:46:39', '2022-11-04 03:11:29', 0),
(307, 'Estacion cañales-santarosa cambium f200', '192.168.9.120', 'Normal', 'ePMP-Backup-SANTA ROSA-00_04_56_EF_6B_81.json', '2021-10-21 23:48:06', '2022-11-04 03:11:29', 0),
(308, 'Estacion cañales-km10 F200', '192.168.9.125', 'Normal', 'ePMP-Backup-SANTA ROSA-00_04_56_EC_36_09.json', '2021-10-21 23:51:14', '2022-11-04 03:11:29', 0),
(309, 'AP cañales-km10', '192.168.9.124', 'Normal', 'ePMP-Backup-Santarosa-00_04_56_E1_CB_1B.json', '2021-10-21 23:51:54', '2022-11-04 03:11:29', 0),
(310, 'AP Pequeña-cañales F200', '192.168.6.131', 'Normal', 'ePMP-Backup-PEQUE28-58_C1_7A_4C_AC_2D.json', '2021-10-21 23:54:36', '2022-01-03 01:01:11', 0),
(311, 'Estacion Pequeña-cañales F200', '192.168.6.132', 'Normal', 'ePMP-Backup-pequenia-00_04_56_EF_6F_55.json', '2021-10-21 23:55:29', '2022-01-03 01:01:47', 0),
(312, 'AP Cardenas-Tecominoacan AirF', '192.168.15.250', 'Normal', 'af5xhd_f492bf2f97be_211029-173156.cfg', '2021-10-29 21:35:39', '2022-01-03 01:01:11', 0),
(313, 'Estacion Cardenas-Tecominoacan AirF', '192.168.15.249', 'Normal', 'af5xhd_f492bf2f8b56_211029-173631.cfg', '2021-10-29 21:36:47', '2022-03-17 12:03:46', 0),
(314, 'AP sectorial 3 ocuapan', '192.168.2.34', 'Normal', 'XW-245A4CBE2E29.cfg', '2021-10-30 16:29:05', '2022-03-16 12:44:54', 0),
(315, 'Teco AP', '192.168.2.250', 'Normal', '1478029345_177355_1478029781_album_grande.jpg', '2021-11-02 20:36:33', NULL, 0),
(316, 'TCP WAN 2 DE CARDENAS', '192.168.6.239', 'Normal', 'TCP MKT.backup', '2021-11-11 22:08:23', '2022-03-17 12:03:37', 0),
(317, 'ESTACIÓN LBE M5 CAPRICHO.', '192.168.48.3', 'Normal', 'XW-7483C250AE64.cfg', '2021-12-13 15:00:21', '2022-11-04 03:11:29', 0),
(318, 'AP CAMBIUM C17 - Azucena', '192.168.2.155', 'Normal', 'AP Azucena cambium.json', '2021-12-18 19:16:48', '2022-01-03 01:01:47', 0),
(319, 'ESTACION CAMBIUM', '192.168.2.156', 'Normal', 'ePMP-Backup-ESTACION AZUCENA-00 04 56 DA C8 E9.bin', '2021-12-18 19:18:16', '2022-03-16 03:03:45', 0),
(320, 'AP MIMOSA AZUCENA', '192.168.2.154', 'Normal', 'AP MIMOSA AZUCENA', '2021-12-18 19:22:23', '2022-01-03 01:01:13', 0),
(337, 'ESTACION_PRUBA', '192.168.5.25', 'Normal', 'IMG_20211222_094933.jpg', '2021-12-29 15:54:26', '2022-01-03 01:01:49', 0),
(338, 'ESTACION_PRUBA', '192.168.5.25', 'Normal', 'IMG_20211222_094933.jpg', '2021-12-29 16:05:03', '2022-01-03 01:01:49', 0),
(339, 'ESTACION_PRUBA', '192.168.5.25', 'Normal', 'IMG_20211222_094929.jpg', '2021-12-29 16:16:29', '2022-03-16 12:44:56', 0),
(340, 'ESTACION_PRUBA', '192.168.5.25', 'Normal', 'IMG_20211222_100247.jpg', '2021-12-29 16:17:30', '2022-01-03 01:01:49', 0),
(341, 'ESTACION PRUEBA 2', '192.168.5.20', 'Normal', 'IMG_20211222_094933.jpg', '2021-12-29 17:31:26', '2022-01-03 01:01:13', 0),
(342, 'LAPTOP', '127.0.0.1', 'Normal', 'IMG_20211222_094926.jpg', '2021-12-31 02:29:54', '2023-03-03 09:03:53', 1),
(343, 'TUNNER ISIS', '192.168.16.216', 'Normal', '', '2022-03-17 06:00:00', '2022-11-04 03:11:29', 0),
(346, 'AP VINAGRE', '192.168.4.10', 'Normal', '', '2022-03-17 06:00:00', '2022-11-04 03:11:29', 0),
(347, 'AP VINAGRE', '192.168.16.215', 'Normal', '', '2022-03-17 06:00:00', '2022-11-04 03:11:29', 0),
(352, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 05:39:42', NULL, 0),
(353, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 05:41:01', NULL, 0),
(354, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 05:41:26', NULL, 0),
(355, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 05:41:38', NULL, 0),
(356, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 05:43:26', NULL, 0),
(357, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 06:12:50', NULL, 0),
(358, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 06:12:57', NULL, 0),
(359, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 06:12:57', NULL, 0),
(360, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 06:13:35', NULL, 0),
(361, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 06:13:35', NULL, 0),
(362, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 06:13:43', NULL, 0),
(899898, 'carlos', '192.168.15.112', 'normal', '', '2022-11-03 06:14:06', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagrama`
--

CREATE TABLE `diagrama` (
  `id_diagrama` int(11) NOT NULL,
  `ip_cliente` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ip_ap` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ip_router` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ip_estacion` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ip_isp` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `operation` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `operation`, `value`) VALUES
(1, 'reload', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_addresses`
--

CREATE TABLE `failed_addresses` (
  `id` int(11) NOT NULL,
  `addresses_id` int(11) NOT NULL,
  `status` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `lost` int(11) NOT NULL,
  `response_time` int(11) NOT NULL,
  `failed_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `failed_addresses`
--

INSERT INTO `failed_addresses` (`id`, `addresses_id`, `status`, `lost`, `response_time`, `failed_date`) VALUES
(172871761, 3, 'Correcto', 3, 0, '2021-08-10 22:33:26'),
(172871762, 56, 'Correcto', 3, 0, '2021-08-10 22:33:26'),
(172871763, 52, 'Correcto', 3, 0, '2021-08-10 22:33:26'),
(172871764, 51, 'Correcto', 3, 0, '2021-08-10 22:33:26'),
(172871765, 4, 'Correcto', 3, 0, '2021-08-10 22:33:26'),
(172871766, 20, 'Correcto', 3, 0, '2021-08-10 22:33:26'),
(172871767, 80, 'Correcto', 3, 0, '2021-08-10 22:33:28'),
(172871768, 96, 'Correcto', 3, 0, '2021-08-10 22:33:28'),
(172871769, 75, 'Correcto', 3, 0, '2021-08-10 22:33:28'),
(172871770, 70, 'Correcto', 3, 0, '2021-08-10 22:33:28'),
(172871771, 86, 'Correcto', 3, 0, '2021-08-10 22:33:28'),
(172871772, 92, 'Correcto', 3, 0, '2021-08-10 22:33:28'),
(172871773, 97, 'Correcto', 3, 0, '2021-08-10 22:33:30'),
(172871774, 99, 'Correcto', 3, 0, '2021-08-10 22:33:30'),
(172871775, 98, 'Correcto', 3, 0, '2021-08-10 22:33:30'),
(172871776, 106, 'Correcto', 3, 0, '2021-08-10 22:33:30'),
(172871777, 100, 'Correcto', 3, 0, '2021-08-10 22:33:30'),
(172871778, 119, 'Correcto', 3, 0, '2021-08-10 22:33:30'),
(172871779, 120, 'Correcto', 3, 0, '2021-08-10 22:33:32'),
(172871780, 129, 'Correcto', 3, 0, '2021-08-10 22:33:32'),
(172871781, 123, 'Correcto', 0, 0, '2021-08-10 22:33:33'),
(172871782, 124, 'Correcto', 0, 0, '2021-08-10 22:33:33'),
(172871783, 126, 'Correcto', 0, 0, '2021-08-10 22:33:33'),
(172871784, 133, 'Correcto', 3, 0, '2021-08-10 22:33:34'),
(172871785, 135, 'Correcto', 3, 0, '2021-08-10 22:33:34'),
(172871786, 125, 'Correcto', 0, 0, '2021-08-10 22:33:35'),
(172871787, 138, 'Correcto', 3, 0, '2021-08-10 22:33:35'),
(172871788, 141, 'Correcto', 3, 0, '2021-08-10 22:33:35'),
(172871789, 137, 'Correcto', 3, 0, '2021-08-10 22:33:35'),
(172871790, 156, 'Correcto', 3, 0, '2021-08-10 22:33:36'),
(172871791, 159, 'Correcto', 3, 0, '2021-08-10 22:33:36'),
(172871792, 160, 'Correcto', 3, 0, '2021-08-10 22:33:37'),
(172871793, 162, 'Correcto', 3, 0, '2021-08-10 22:33:37'),
(172871794, 170, 'Correcto', 3, 0, '2021-08-10 22:33:37'),
(172871795, 163, 'Correcto', 3, 0, '2021-08-10 22:33:37'),
(172871796, 171, 'Correcto', 3, 0, '2021-08-10 22:33:38'),
(172871797, 172, 'Correcto', 3, 0, '2021-08-10 22:33:38'),
(172871798, 173, 'Correcto', 3, 0, '2021-08-10 22:33:39'),
(172871799, 184, 'Correcto', 3, 0, '2021-08-10 22:33:39'),
(172871800, 185, 'Correcto', 3, 0, '2021-08-10 22:33:39'),
(172871801, 174, 'Correcto', 3, 0, '2021-08-10 22:33:39'),
(172871802, 186, 'Correcto', 3, 0, '2021-08-10 22:33:40'),
(172871803, 187, 'Correcto', 3, 0, '2021-08-10 22:33:41'),
(172871804, 188, 'Correcto', 3, 0, '2021-08-10 22:33:41'),
(172871805, 190, 'Correcto', 3, 0, '2021-08-10 22:33:41'),
(172871806, 191, 'Correcto', 3, 0, '2021-08-10 22:33:41'),
(172871807, 192, 'Correcto', 3, 0, '2021-08-10 22:33:41'),
(172871808, 193, 'Correcto', 3, 0, '2021-08-10 22:33:43'),
(172871809, 194, 'Correcto', 3, 0, '2021-08-10 22:33:43'),
(172871810, 197, 'Correcto', 3, 0, '2021-08-10 22:33:43'),
(172871811, 198, 'Correcto', 3, 0, '2021-08-10 22:33:43'),
(172871812, 199, 'Correcto', 3, 0, '2021-08-10 22:33:43'),
(172871813, 200, 'Correcto', 3, 0, '2021-08-10 22:33:44'),
(172871814, 201, 'Correcto', 3, 0, '2021-08-10 22:33:45'),
(172871815, 202, 'Correcto', 3, 0, '2021-08-10 22:33:45'),
(172871816, 203, 'Correcto', 3, 0, '2021-08-10 22:33:45'),
(172871817, 206, 'Correcto', 3, 0, '2021-08-10 22:33:45'),
(172871818, 207, 'Correcto', 3, 0, '2021-08-10 22:33:46'),
(172871819, 209, 'Correcto', 3, 0, '2021-08-10 22:33:46'),
(172871820, 210, 'Correcto', 3, 0, '2021-08-10 22:33:47'),
(172871821, 211, 'Correcto', 3, 0, '2021-08-10 22:33:47'),
(172871822, 213, 'Correcto', 3, 0, '2021-08-10 22:33:48'),
(172871823, 212, 'Correcto', 3, 0, '2021-08-10 22:33:48'),
(172871824, 214, 'Correcto', 3, 0, '2021-08-10 22:33:48'),
(172871825, 216, 'Correcto', 3, 0, '2021-08-10 22:33:48'),
(172871826, 218, 'Correcto', 3, 0, '2021-08-10 22:33:49'),
(172871827, 219, 'Correcto', 3, 0, '2021-08-10 22:33:50'),
(172871828, 217, 'Correcto', 2, 0, '2021-08-10 22:33:50'),
(172871829, 220, 'Correcto', 3, 0, '2021-08-10 22:33:50'),
(172871830, 222, 'Correcto', 3, 0, '2021-08-10 22:33:50'),
(172871831, 223, 'Correcto', 3, 0, '2021-08-10 22:33:50'),
(172871832, 224, 'Correcto', 3, 0, '2021-08-10 22:33:51'),
(172871833, 225, 'Correcto', 3, 0, '2021-08-10 22:33:52'),
(172871834, 226, 'Correcto', 3, 0, '2021-08-10 22:33:52'),
(172871835, 229, 'Correcto', 3, 0, '2021-08-10 22:33:52'),
(172871836, 228, 'Correcto', 3, 0, '2021-08-10 22:33:52'),
(172871837, 231, 'Correcto', 3, 0, '2021-08-10 22:33:52'),
(172871838, 232, 'Correcto', 3, 0, '2021-08-10 22:33:53'),
(172871839, 233, 'Correcto', 3, 0, '2021-08-10 22:33:54'),
(172871840, 236, 'Correcto', 3, 0, '2021-08-10 22:33:54'),
(172871841, 239, 'Correcto', 3, 0, '2021-08-10 22:33:54'),
(172871842, 237, 'Correcto', 2, 0, '2021-08-10 22:33:55'),
(172871843, 238, 'Correcto', 2, 0, '2021-08-10 22:33:55'),
(172871844, 240, 'Correcto', 3, 0, '2021-08-10 22:33:55'),
(172871845, 241, 'Correcto', 3, 0, '2021-08-10 22:33:56'),
(172871846, 242, 'Correcto', 3, 0, '2021-08-10 22:33:56'),
(172871847, 243, 'Correcto', 3, 0, '2021-08-10 22:33:56'),
(172871848, 246, 'Correcto', 3, 0, '2021-08-10 22:33:56'),
(172871849, 250, 'Correcto', 3, 0, '2021-08-10 22:33:56'),
(172871850, 258, 'Correcto', 3, 0, '2021-08-10 22:33:56'),
(172871851, 264, 'Correcto', 3, 0, '2021-08-10 22:33:56'),
(172871852, 248, 'Correcto', 3, 0, '2021-08-10 22:33:57'),
(172871853, 253, 'Correcto', 3, 0, '2021-08-10 22:33:57'),
(172871854, 51, 'Incorrecto', 0, 0, '2021-08-10 22:33:59');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `diagrama`
--
ALTER TABLE `diagrama`
  ADD PRIMARY KEY (`id_diagrama`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_addresses`
--
ALTER TABLE `failed_addresses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=899899;

--
-- AUTO_INCREMENT de la tabla `diagrama`
--
ALTER TABLE `diagrama`
  MODIFY `id_diagrama` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `failed_addresses`
--
ALTER TABLE `failed_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172871855;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
