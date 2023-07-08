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
  `lastname` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45),
  `description` VARCHAR(1000),
  `image_url_small` VARCHAR(255),
  `image_url_medium` VARCHAR(255),
  `image_url_large` VARCHAR(255),
  `website_url` VARCHAR(255),
  `facebook_url` VARCHAR(255),
  `instagram_url` VARCHAR(255),
  `twitter_url` VARCHAR(255),
  PRIMARY KEY (`id`)
);

-- Table `artwork`
DROP TABLE IF EXISTS `artwork`;

CREATE TABLE IF NOT EXISTS `artwork` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `year` INT,
  `description` VARCHAR(1000),
  `image_url_small` VARCHAR(255),
  `image_url_medium` VARCHAR(255),
  `image_url_large` VARCHAR(255),
  `art_trend_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  `technique_id` INT NOT NULL,
  `artist_id` INT NOT NULL,
  `width_cm` INT,
  `height_cm` INT,
  `depth_cm` INT,
  `artwork_location` VARCHAR(255),
  PRIMARY KEY (`id`),
  INDEX `fk_artwork_type1_idx` (`type_id`),
  INDEX `fk_artwork_technique1_idx` (`technique_id`),
  INDEX `fk_artwork_artist1_idx` (`artist_id`),
  INDEX `fk_artwork_arttrend1_idx` (`art_trend_id`),
  CONSTRAINT `fk_artwork_type1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  CONSTRAINT `fk_artwork_technique1` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`),
  CONSTRAINT `fk_artwork_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`),
  CONSTRAINT `fk_artwork_arttrend1` FOREIGN KEY (`art_trend_id`) REFERENCES `art_trend` (`id`)
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
  `hashedPassword` VARCHAR(255) NOT NULL,
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

-- Table type
INSERT INTO
  type (name)
VALUES
  ('Abstract'),
  ('Realism');

INSERT INTO
  type (name)
VALUES
  ('Impressionism'),
  ('Cubism');

-- Table technique
INSERT INTO
  technique (name)
VALUES
  ('Oil painting'),
  ('Watercolor');

INSERT INTO
  technique (name)
VALUES
  ('Sculpture'),
  ('Photography');

-- Table art_trend
INSERT INTO
  art_trend (name)
VALUES
  ('Impressionism'),
  ('Cubism');

INSERT INTO
  art_trend (name)
VALUES
  ('Abstract Expressionism'),
  ('Pop Art');

-- Table artist
INSERT INTO
  artist (
    lastname,
    firstname,
    nickname,
    description,
    image_url_small,
    image_url_medium,
    image_url_large,
    website_url,
    facebook_url,
    instagram_url,
    twitter_url
  )
VALUES
  (
    'Picasso',
    'Pablo',
    'Pablo Picasso',
    'Spanish painter, sculptor, printmaker, ceramicist, and stage designer',
    'url_small',
    'url_medium',
    'url_large',
    'https://www.pablopicasso.org/',
    'https://www.facebook.com/pablopicasso',
    'https://www.instagram.com/pablopicasso',
    'https://twitter.com/picasso'
  );

INSERT INTO
  artist (
    lastname,
    firstname,
    nickname,
    description,
    image_url_small,
    image_url_medium,
    image_url_large,
    website_url,
    facebook_url,
    instagram_url,
    twitter_url
  )
VALUES
  (
    'Monet',
    'Claude',
    'Claude Monet',
    'French painter and a founder of the Impressionist movement',
    'url_small',
    'url_medium',
    'url_large',
    'https://www.claudemonet.org/',
    'https://www.facebook.com/claudemonet',
    'https://www.instagram.com/claudemonet',
    'https://twitter.com/monet'
  );

-- Table artwork
INSERT INTO
  artwork (
    name,
    year,
    description,
    image_url_small,
    image_url_medium,
    image_url_large,
    art_trend_id,
    type_id,
    technique_id,
    artist_id,
    width_cm,
    height_cm,
    depth_cm,
    artwork_location
  )
VALUES
  (
    'Les Demoiselles d''Avignon',
    1907,
    'Oil painting on canvas',
    'url_small',
    'url_medium',
    'url_large',
    1,
    1,
    1,
    1,
    244,
    233,
    0,
    'Museum of Modern Art, New York'
  );

INSERT INTO
  artwork (
    name,
    year,
    description,
    image_url_small,
    image_url_medium,
    image_url_large,
    art_trend_id,
    type_id,
    technique_id,
    artist_id,
    width_cm,
    height_cm,
    depth_cm,
    artwork_location
  )
VALUES
  (
    'Water Lilies',
    1914,
    'Oil painting on canvas',
    'url_small',
    'url_medium',
    'url_large',
    2,
    1,
    2,
    2,
    200,
    180,
    0,
    'Musée de l''Orangerie, Paris'
  );

-- Table entity
INSERT INTO
  entity (name)
VALUES
  ('Company A'),
  ('Company B');

INSERT INTO
  entity (name)
VALUES
  ('Organization X'),
  ('Organization Y');

-- Table user
INSERT INTO
  user (
    lastname,
    firstname,
    pseudo,
    email,
    hashedPassword,
    role,
    entity_id
  )
VALUES
  (
    'Doe',
    'John',
    'johndoe',
    'johndoe@example.com',
    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA',
    1,
    NULL
  );

INSERT INTO
  user (
    lastname,
    firstname,
    pseudo,
    email,
    hashedPassword,
    role,
    entity_id
  )
VALUES
  (
    'Smith',
    'Jane',
    'janesmith',
    'janesmith@example.com',
    '$argon2id$v=19$m=65536,t=5,p=1$6F4WFjpSx9bSq9k4lp2fiQ$cjVgCHF/voka5bZI9YAainiaT+LkaQxfNN638b/h4fQ',
    2,
    1
  );

-- Table artwork_favorite
INSERT INTO
  artwork_favorite (user_id, artwork_id)
VALUES
  (1, 1);

INSERT INTO
  artwork_favorite (user_id, artwork_id)
VALUES
  (2, 2);

-- Table artist_technique
INSERT INTO
  artist_technique (artist_id, technique_id)
VALUES
  (1, 1);

INSERT INTO
  artist_technique (artist_id, technique_id)
VALUES
  (2, 2);

-- Table type_artist
INSERT INTO
  type_artist (artist_id, type_id)
VALUES
  (1, 1);

INSERT INTO
  type_artist (artist_id, type_id)
VALUES
  (2, 2);

-- Table art_trend_artist
INSERT INTO
  art_trend_artist (artist_id, art_trend_id)
VALUES
  (1, 1);

INSERT INTO
  art_trend_artist (artist_id, art_trend_id)
VALUES
  (2, 2);