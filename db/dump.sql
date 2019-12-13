-- MySQL dump 10.13  Distrib 8.0.17, for osx10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: blockbuster
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nickname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` (`id`, `name`, `nickname`, `birthday`) VALUES (1,'Martin Scorsese','Scorsese','1942-11-17'),(2,'Todd Phillips',NULL,'1970-12-20'),(3,'Quentin Tarantino','Tarantino','1963-03-27'),(4,'J. J. Abrams',NULL,'1966-06-27'),(5,'Josh Cooley',NULL,'1980-05-23'),(6,'Joachim Ronning',NULL,'1972-05-19'),(7,'Jon Watts',NULL,'1981-06-28'),(8,'Jon Favreau',NULL,'1966-10-19'),(9,'Joe Russo',NULL,'1971-06-18');
/*!40000 ALTER TABLE `director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` (`id`, `name`) VALUES (1,'Comédia'),(2,'Drama'),(3,'Suspense'),(4,'Terror'),(5,'Ação'),(6,'Romance'),(7,'Aventura'),(8,'Ficção Científica'),(9,'Família'),(10,'Faroeste');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_director` int(11) DEFAULT NULL,
  `id_genre` int(11) DEFAULT NULL,
  `date_release` datetime DEFAULT NULL,
  `synopsis` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `filme_diretor_id_fk` (`id_director`),
  KEY `filme_genero_id_fk` (`id_genre`),
  CONSTRAINT `filme_diretor_id_fk` FOREIGN KEY (`id_director`) REFERENCES `director` (`id`),
  CONSTRAINT `filme_genero_id_fk` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` (`id`, `name`, `id_director`, `id_genre`, `date_release`, `synopsis`, `rating`) VALUES (1,'O Irlândes',1,3,'2019-11-14 00:00:00','The Irishman ou O Irlandês é um filme de crime épico americano de 2019, produzido e dirigido por Martin Scorsese.',16),(2,'Coringa',2,5,'2019-10-03 00:00:00','O comediante falido Arthur Fleck encontra violentos bandidos pelas ruas de Gotham City. Desconsiderado pela sociedade, Fleck começa a ficar louco e se transforma no criminoso conhecido como Coringa.',18),(3,'Era uma Vez em... Hollywood',3,6,'2019-08-15 00:00:00','No final da década de 1960, Hollywood começa a se transformar e o astro de TV Rick Dalton e seu dublê Cliff Booth tentam acompanhar as mudanças.',12),(4,'Star Wars: Episódio IX',4,6,'2019-12-19 00:00:00','Lucasfilm e o diretor J.J. Abrams juntam forças mais uma vez para levar os espectadores a uma jornada épica em uma galáxia muito, muito distante em Star Wars: A Ascensão Skywalker, a fascinante conclusão da saga Skywalker, na qual novas lendas nascerão e a batalha final pela liberdade ainda está por vir.',12),(5,'Toy Story 4',5,9,'2019-06-20 00:00:00','Woody, Buzz Lightyear e o resto da turma embarcam em uma viagem com Bonnie e um novo brinquedo chamado Forky. A aventura logo se transforma em uma reunião inesperada quando o ligeiro desvio que Woody faz o leva ao seu amigo há muito perdido, Bo Peep.',0),(6,'Malévola: Dona do Mal',6,6,'2019-10-17 00:00:00','Em Malévola: Dona do Mal, uma sequência do sucesso de bilheteria global de 2014, Malévola e sua afilhada Aurora começam a questionar os complexos laços familiares que as prendem à medida que são puxadas em direções diferentes por casamentos, aliados inesperados e novas forças sombrias em jogo.',10),(7,'Homem-Aranha: Longe de Casa',7,6,'2019-07-04 00:00:00','Peter Parker está em uma viagem de duas semanas pela Europa, ao lado de seus amigos de colégio, quando é surpreendido pela visita de Nick Fury. Convocado para mais uma missão heroica, ele precisa enfrentar vários vilões que surgem em cidades-símbolo do continente, como Londres, Paris e Veneza, e também a aparição do enigmático Mysterio.',12),(8,'O Rei Leão',8,9,'2019-06-18 00:00:00','Traído e exilado de seu reino, o leãozinho Simba precisa descobrir como crescer e retomar seu destino como herdeiro real nas planícies da savana africana.',0),(9,'Vingadores: Ultimato',9,8,'2019-04-25 00:00:00','Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco.',12),(21,'Taxi Driver',5,1,'1976-03-22 00:00:00','O motorista de táxi de Nova York Travis Bickle reflete constantemente sobre a corrupção da vida ao seu redor e sente-se cada vez mais perturbado com a própria solidão e alienação. Em praticamente todas as fases de sua vida, Bickle permanece isolado e não consegue fazer contato emocional com ninguém. Incapaz de dormir noite após noite, o motorista frequenta os estabelecimentos de pornografia locais em busca de diversão.',18);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_copy`
--

DROP TABLE IF EXISTS `movie_copy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_movie` int(11) DEFAULT NULL,
  `leased` tinyint(1) DEFAULT NULL,
  `id_user_leased` int(11) DEFAULT NULL,
  `leased_until` datetime DEFAULT NULL,
  `leased_when` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `copia_de_filme_cliente_id_fk` (`id_user_leased`),
  KEY `copia_de_filme_filme_id_fk` (`id_movie`),
  CONSTRAINT `copia_de_filme_cliente_id_fk` FOREIGN KEY (`id_user_leased`) REFERENCES `user` (`id`),
  CONSTRAINT `copia_de_filme_filme_id_fk` FOREIGN KEY (`id_movie`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_copy`
--

LOCK TABLES `movie_copy` WRITE;
/*!40000 ALTER TABLE `movie_copy` DISABLE KEYS */;
INSERT INTO `movie_copy` (`id`, `id_movie`, `leased`, `id_user_leased`, `leased_until`, `leased_when`) VALUES (1,1,NULL,NULL,NULL,NULL),(2,1,NULL,NULL,NULL,NULL),(3,1,NULL,NULL,NULL,NULL),(4,2,NULL,NULL,NULL,NULL),(5,2,NULL,NULL,NULL,NULL),(6,2,NULL,NULL,NULL,NULL),(7,3,NULL,NULL,NULL,NULL),(8,3,NULL,NULL,NULL,NULL),(9,3,NULL,NULL,NULL,NULL),(10,4,NULL,NULL,NULL,NULL),(11,4,NULL,NULL,NULL,NULL),(12,5,1,1,'2019-12-19 22:51:21','2019-12-12 22:51:21'),(13,5,NULL,NULL,NULL,NULL),(14,5,NULL,NULL,NULL,NULL),(15,6,NULL,NULL,NULL,NULL),(16,7,1,1,'2019-12-19 22:51:16','2019-12-12 22:51:16'),(17,8,1,1,'2019-12-12 17:45:36','2019-12-12 17:32:27'),(18,8,2,2,'2020-12-19 17:32:27','2019-12-12 17:33:01'),(19,8,3,3,'2020-12-19 17:32:27','2019-12-12 17:33:54'),(20,8,1,1,'2019-12-12 17:44:44','2019-12-12 18:13:14'),(21,8,NULL,NULL,NULL,NULL),(22,21,1,1,'2019-12-19 22:51:05','2019-12-12 22:51:05'),(23,21,1,1,'2019-12-12 21:50:21','2019-12-12 22:48:03'),(24,21,1,1,'2019-12-12 21:50:21','2019-12-12 22:48:12'),(25,21,1,1,'2019-12-12 21:50:21','2019-12-12 22:48:12'),(26,21,1,1,'2019-12-12 21:50:21','2019-12-12 22:48:13');
/*!40000 ALTER TABLE `movie_copy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount_leased` int(11) DEFAULT '0',
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `name`, `email`, `password`, `birthday`, `gender`, `amount_leased`, `admin`) VALUES (1,'Filipe Pacheco','lipe@gmail.com','$2b$10$FmCK2byXla4bCAKAKIYGv.LM9vYidqLyxSFnM34SfZSq6ho9dt13i','1998-04-19','Masculino',0,1),(2,'Maria Eduarda','madu@gmail.com','$2b$04$ExNgkn4oPEesqC5PoXL3BuJwqUnM8hGWaO4RV2ovWwbkFftB9N7rK','2000-05-01','Feminino',0,NULL),(3,'Leandro Souza','lele@gmail.com','$2b$04$g3FMkN3bLF.2UGJa1HNPZ.xYoQX5WzFJ1vfCKNT7eoBCjZbLMA/UO','1996-02-07','Masculino',0,NULL),(4,'Carmen Lucia','lulu@gmail.com','$2b$04$DVz99iegtlz.0CxWU21qaezeeS1jORbk1oJAFh61S46NHc1iwhj3K','1970-04-05','Feminino',0,NULL),(5,'Pedro Henrique','ph2008@gmail.com','$2b$04$L2V5DztlKEsTGnrAvKwGkezGHzzCcZZXFhXH2s9JFtbroMRbgguTa','2008-01-06','Masculino',0,NULL),(14,'Marcia da Silva','mmds@gmail.com','$2b$04$OiffIXT6/OAk.fdfNm6.buoQI92s/y7nfPLqm3lM82ig/850lwA.e','1996-02-04','Feminino',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-12 22:39:52
