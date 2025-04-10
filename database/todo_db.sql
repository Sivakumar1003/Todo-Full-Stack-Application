CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `tasks` varchar(150) NOT NULL,
  `status` enum('Pending','Completed') NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  KEY `fk_tasks_1_idx` (`userId`),
  CONSTRAINT `fk_tasks_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
);
