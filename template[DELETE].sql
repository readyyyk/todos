SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `data` (
  `id` int(255) NOT NULL,
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `data` (`id`, `login`, `password`, `data`) VALUES
(1, 'admin', 'admin', '[[{\"id\":0,\"title\":\"first group\",\"bgColor\":\"#BFBFBF\",\"textColor\":\"#0D6EFD\"}],[{\"id\":1,\"groupId\":0,\"title\":\"First todo\",\"text\":\"First todo text\",\"startDate\":\"2022-10-22\",\"endDate\":\"2022-11-16\",\"status\":\"in progress\"}]]'),
(2, 'test', 'test', '[[{\"id\":0,\"title\":\"test updated group\",\"bgColor\":\"#BFBFBF\",\"textColor\":\"#0D6EFD\"}],[{\"id\":1,\"groupId\":0,\"title\":\"test updated todo\",\"text\":\"First todo text\",\"startDate\":\"2022-10-22\",\"endDate\":\"2022-11-16\",\"status\":\"IMPORTANT\"}]]');

ALTER TABLE `data`
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `password` (`password`),
  ADD KEY `id` (`id`);

ALTER TABLE `data`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;