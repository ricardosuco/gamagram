-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gamagram
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamagram` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `gamagram` ;

-- -----------------------------------------------------
-- Table `gamagram`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamagram`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `email` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `site` VARCHAR(100) NULL DEFAULT NULL,
  `bio` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `gender` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamagram`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamagram`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `caption` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `posts_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamagram`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamagram`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamagram`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `content` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`post_id`)
    REFERENCES `gamagram`.`posts` (`id`),
  CONSTRAINT `comments_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamagram`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamagram`.`photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamagram`.`photos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  CONSTRAINT `photos_ibfk_1`
    FOREIGN KEY (`post_id`)
    REFERENCES `gamagram`.`posts` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamagram`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamagram`.`likes` (
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `likes_ibfk_1`
    FOREIGN KEY (`post_id`)
    REFERENCES `gamagram`.`posts` (`id`),
  CONSTRAINT `likes_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamagram`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
