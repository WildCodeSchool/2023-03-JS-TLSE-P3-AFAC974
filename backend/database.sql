-- Table `type`
DROP TABLE IF EXISTS `type`;

CREATE TABLE IF NOT EXISTS `type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Table `technique`
DROP TABLE IF EXISTS `technique`;

CREATE TABLE IF NOT EXISTS `technique` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Table `art_trend`
DROP TABLE IF EXISTS `art_trend`;

CREATE TABLE IF NOT EXISTS `art_trend` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Table `artist`
DROP TABLE IF EXISTS `artist`;

CREATE TABLE IF NOT EXISTS `artist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Table `artwork`
DROP TABLE IF EXISTS `artwork`;

CREATE TABLE IF NOT EXISTS `artwork` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `type_id` INT NOT NULL,
  `technique_id` INT NOT NULL,
  `artist_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_artwork_type1_idx` (`type_id`),
  INDEX `fk_artwork_technique1_idx` (`technique_id`),
  INDEX `fk_artwork_artist1_idx` (`artist_id`),
  CONSTRAINT `fk_artwork_type1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  CONSTRAINT `fk_artwork_technique1` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`),
  CONSTRAINT `fk_artwork_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
);

-- Table `entity`
DROP TABLE IF EXISTS `entity`;

CREATE TABLE IF NOT EXISTS `entity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Table `user`
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `pseudo` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` INT NOT NULL,
  `entity_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_entity1_idx` (`entity_id`),
  CONSTRAINT `fk_user_entity1` FOREIGN KEY (`entity_id`) REFERENCES `entity` (`id`)
);

-- Table `artwork_favorite`
DROP TABLE IF EXISTS `artwork_favorite`;

CREATE TABLE IF NOT EXISTS `artwork_favorite` (
  `user_id` INT NOT NULL,
  `artwork_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `artwork_id`),
  INDEX `fk_user_has_artwork_artwork1_idx` (`artwork_id`),
  INDEX `fk_user_has_artwork_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_artwork_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_user_has_artwork_artwork1` FOREIGN KEY (`artwork_id`) REFERENCES `artwork` (`id`)
);

-- Table `artist_technique`
DROP TABLE IF EXISTS `artist_technique`;

CREATE TABLE IF NOT EXISTS `artist_technique` (
  `artist_id` INT NOT NULL,
  `technique_id` INT NOT NULL,
  PRIMARY KEY (`artist_id`, `technique_id`),
  INDEX `fk_artist_has_technique_technique1_idx` (`technique_id`),
  INDEX `fk_artist_has_technique_artist1_idx` (`artist_id`),
  CONSTRAINT `fk_artist_has_technique_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_artist_has_technique_technique1` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`)
);

-- Table `type_artist`
DROP TABLE IF EXISTS `type_artist`;

CREATE TABLE IF NOT EXISTS `type_artist` (
  `artist_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  PRIMARY KEY (`artist_id`, `type_id`),
  INDEX `fk_artist_has_type_type1_idx` (`type_id`),
  INDEX `fk_artist_has_type_artist1_idx` (`artist_id`),
  CONSTRAINT `fk_artist_has_type_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_artist_has_type_type1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`)
);

-- Table `art_trend_artist`
DROP TABLE IF EXISTS `art_trend_artist`;

CREATE TABLE IF NOT EXISTS `art_trend_artist` (
  `artist_id` INT NOT NULL,
  `art_trend_id` INT NOT NULL,
  PRIMARY KEY (`artist_id`, `art_trend_id`),
  INDEX `fk_artist_has_art_trend_art_trend1_idx` (`art_trend_id`),
  INDEX `fk_artist_has_art_trend_artist1_idx` (`artist_id`),
  CONSTRAINT `fk_artist_has_art_trend_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_artist_has_art_trend_art_trend1` FOREIGN KEY (`art_trend_id`) REFERENCES `art_trend` (`id`)
);