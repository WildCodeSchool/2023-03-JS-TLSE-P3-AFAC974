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
  CONSTRAINT `fk_artwork_type1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_artwork_technique1` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_artwork_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_artwork_arttrend1` FOREIGN KEY (`art_trend_id`) REFERENCES `art_trend` (`id`)ON DELETE CASCADE ON UPDATE CASCADE
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
  `image` VARCHAR(255),
  `hashedPassword` VARCHAR(255) NOT NULL,
  `role` INT NOT NULL,
  `entity_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_entity1_idx` (`entity_id`),
  CONSTRAINT `fk_user_entity1` FOREIGN KEY (`entity_id`) REFERENCES `entity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table `artwork_favorite`
DROP TABLE IF EXISTS `artwork_favorite`;

CREATE TABLE IF NOT EXISTS `artwork_favorite` (
  `user_id` INT NOT NULL,
  `artwork_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `artwork_id`),
  INDEX `fk_user_has_artwork_artwork1_idx` (`artwork_id`),
  INDEX `fk_user_has_artwork_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_artwork_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_has_artwork_artwork1` FOREIGN KEY (`artwork_id`) REFERENCES `artwork` (`id`) ON DELETE CASCADE
);

-- Table `artist_technique`
DROP TABLE IF EXISTS `artist_technique`;

CREATE TABLE IF NOT EXISTS `artist_technique` (
  `artist_id` INT NOT NULL,
  `technique_id` INT NOT NULL,
  PRIMARY KEY (`artist_id`, `technique_id`),
  INDEX `fk_artist_has_technique_technique1_idx` (`technique_id`),
  INDEX `fk_artist_has_technique_artist1_idx` (`artist_id`),
  CONSTRAINT `fk_artist_has_technique_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_artist_has_technique_technique1` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table `art_trend_artist`
DROP TABLE IF EXISTS `art_trend_artist`;

CREATE TABLE IF NOT EXISTS `art_trend_artist` (
  `artist_id` INT NOT NULL,
  `art_trend_id` INT NOT NULL,
  PRIMARY KEY (`artist_id`, `art_trend_id`),
  INDEX `fk_artist_has_art_trend_art_trend1_idx` (`art_trend_id`),
  INDEX `fk_artist_has_art_trend_artist1_idx` (`artist_id`),
  CONSTRAINT `fk_artist_has_art_trend_artist1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_artist_has_art_trend_art_trend1` FOREIGN KEY (`art_trend_id`) REFERENCES `art_trend` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table type
INSERT INTO
  type (name)
VALUES
  ('Réalisme');

-- Table technique
INSERT INTO
  technique (name)
VALUES
  ('Dessin'),
  ('Aquarelle');

-- Table art_trend
INSERT INTO
  art_trend (name)
VALUES
  ('Primitivisme');

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
    'Mortier de Trévise',
    'Hyppolite Charles Napoléon',
    'Hyppolite Charles Napoléon Mortier de Trévise',
    'Hippolyte Charles Napoléon Mortier de Trévise, 3e duc de Trévise, naquit le 4 mai 1835 à Paris, France. Issu dune famille noble, il fut destiné à jouer un rôle important dans la société. Il embrassa une carrière diplomatique en tant que secrétaire d''ambassade sous Napoléon III et accéda aux titres de pair de France et de sénateur. En 1860, il épousa Marie Angèle Emma Le Coat de Kerveguen, mais le couple n''eut pas d''enfants. Outre ses engagements politiques, Hippolyte se révéla être un talentueux artiste, notamment dans le dessin et l''aquarelle, dont certaines œuvres sont conservées au Musée Léon-Dierx. Impliqué dans les affaires familiales, il géra un empire foncier hérité de son beau-père, comprenant des usines sucrières à La Réunion. Après la chute du Second Empire, il continua d''influencer les sphères économiques. Hippolyte décéda le 13 février 1892, laissant derrière lui un héritage artistique et un rôle marqué au sein de l''aristocratie française du XIXe siècle.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690185021/artist-afac/m8rx9vfqkgxfiktjoc8p.jpg',
    'url_large',
    'https://fr.wikipedia.org/wiki/Hippolyte_Mortier_de_Tr%C3%A9vise',
    'url_facebook',
    'url_instagram',
    'url_twitter'
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
    'Mam''zelle',
    '1866',
    'Les chevaux sont rares sur les établissements: ils font l''objet de soins attentifs, et ne sont montés que par les propriétaires des Etablissements, et les contremaîtres. Selle et cuirs peuvent être fabriqués sur place: il y eut un atelier sur l''Etablissement du Tampon.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690186385/artwork-afac/rkuswdhoyupyapfthdl0.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    19.5,
    14.5,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Charrette tirée par des mulets',
    '1861',
    '4 mulets tirent une charrette apportant des cannes frâichement coupées à l''usine. Les mulets sont nombreux dans l''île à l''époque de l''industrialisation sucrière. Importés du Poitou, ce sont des bêtes robustes, qui coûtent moins chers que des boeufs ou des chevaux, pour lesquelles on construit des écuries. Elles ont des noms: on sait que dans l''Etablissement des Casernes, Tec Tec, Langoutil, et Malheur sont des noms de mules.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690187341/artwork-afac/mmynylo6wgsh6oa9mpam.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    15.5,
    6.5,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Caille de Bourbon',
    '1861',
    'En réalité, la caille fut introduite d''Asie, Inde ou chine, vers 1850. C''est la femelle qui est colorée ainsi de rouge au bas des ailes. A l''époque de Mortier de Trévise, c''est donc une curiosité, un peu en disparition, à cause de l''extension des champs cultivés en cannes à sucre.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690187776/artwork-afac/uoiar7eawdrivqfqes0o.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    23,
    19,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Sortie du Bras de Jean Payet',
    '1865',
    'Titre complet: "Sortie du Bras de Jean Payet en allant vers le Tampon". Le tilbury à quatre roues est tiré par quatre mules (importées du Poitou). La route, encore reconnaissable aujourd''hui, reliait les chmps de canne situés entre la ravin e Jean Payet (ancienne ravine du Tampon), et la ravine des Cafres. au sommet de ces champs, une scierie fournissait le bois et les planches pour les Etablissements K/Véguen',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690190308/artwork-afac/qtkszwzbdbx4mvmhgfgr.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    22.5,
    30,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Bassin Rouge',
    '1866',
    'Titre complet: "Le bassin rouge au Tampon, la ravine descend". La cascade alimente un bassin à proximité d''un affluent de la rivière d''Abord.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690190657/artwork-afac/duv1y1has2iuhvzft4cy.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    9,
    15,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Caverne des lataniers',
    '1861',
    'Titre complet: "Excursion au volcan de Bourbon". Mortier de Trévise et sa belle-famille sont ne excursion au volcan. Il n''y avait pas de route, alors: il faut donc dormir en chemin dans cette caverne autrefois connue des noirs marrons, autrement dit fugitifs -avant  l''abolition de l''escalvage de 1848.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690191124/artwork-afac/lqgyzii6oodbhidugfyt.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    32,
    24.5,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Pas de Bellecombe',
    '1861',
    'Titre complet: "Le volcan de Bourbon vu du Pas de Bellecombre". Cela ne fait guère longtemps que le passage par le Pas de Bellecombe a été trouvé. Le lieu porte le nom du gouverneur présent au moment de la découverte du passage, mais c''est un esclave, Jacob, qui l''a découvert, en réalité. Bellecombe avait commandité l''expédition.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690191463/artwork-afac/xqajbrmyloaultudyq7w.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    24,
    18,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Boutchiana-Casernes',
    '1865',
    'Travailleur engagé depuis l''Inde à l''Etablissement des Casernes, il tient une lance, peut-être a-t-il une fonction de gardien? Sur sa fiche d''engagement, il était recensé comme tailleur.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690193260/artwork-afac/vxise3al67sjtu2ht6wm.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    11,
    19.5,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Boutchiana-Casernes de face',
    '1865',
    'Complète la précédente aquarelle. On devine la jeunesse de Boutchiana, engagé à l''adolescence. Arrivé à bord de Yanaon, en Inde, à bord du navire de la famille Kerveguen, Le Canova, on le dit âgé de 17 ans.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690193061/artwork-afac/ykcj4lecgbufxyyfr01n.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    8.5,
    19.5,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Cafrine et son petit au Tampon',
    '1861',
    'C''est une engagée, ou alors une affranchie. Elle porte la robe de toile bleue, dont la fourniture est obligatoire par l''employeur, selon les termes du contrat d''engagement. La pratique ne change guère de ce qui était déjà prévu avant 1848 pour les esclaves, par le "Code noir" de 1723.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690193413/artwork-afac/kiyatmpq9nkfubedmpin.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    13,
    18,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Jamali, Cafre, Gardien',
    '1861',
    '"Cafre" veut dire que Jamali n''est pas né sur l''Habitation, mais qu''il a vraisemblablement été recruté comme engagé. Il est armé d''une lance, et surveille l''orée des champs, ou les abords du camp des travailleurs.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690193712/artwork-afac/gxedvk3j83lgjai1qwop.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    16.5,
    26,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Le parapluie du pauvre citoyen',
    '1861',
    'Le titre de citoyen est une fierté pour les affranchis de 1848 qui travaillent sur la propriété ou dans les Etablissements K/Véguen. La pluie est rare à Saint-Pierre, beaucoup plus fréquente au Tampon (pluies orographiques pendant la saison chaude, celle de la coupe des cannes). Ici, le créole engagé dispose d''une maigre rémunération, juste suffisante pour sa nourriture et de menus frais à la "boutique". Depuis 1859, le salaire est en outre versé en kreutzers ( démonétisés, au cours forcé de 1 franc. A l''arrière-plan, sur la droite, la silhouette d''une cheminée d''usine, peut-être celle de Bel-Air, au Tampon.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690193877/artwork-afac/blgq0sfrgpgmoucpdby6.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    11.5,
    19,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'La vieille (Victorine) Mme Samsi Casernes',
    '1865',
    'La vieille dame est assise sur une natte, vêtue de la traditionnelle robe de toile bleue fournie par l''employeur. Son foulard noué sur la tête est taillé dans la même toile.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690194094/artwork-afac/awv20udptijd8bqamsjq.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    12,
    18,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'La pli y fait pas rien, ça ! Tampon',
    '1866',
    'La suite du commentaire est: "Ca ne lui fait rien,... tant pis pour lui ! mais aux cannes ça leur fait du bien tant mieux pour elles !...." Le jeune créole porte un chapeau de feutre déformé, pas de chaussures, comme la majorité des travailleurs. Janvier est en pleine période cyclonique: est-ce le cas ici?',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690194286/artwork-afac/orvy6dwnxwjwfenpgug3.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    20,
    30,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'La belle Tina',
    '1866',
    'Visiblement, Mortier de Trévise a été impressionné par la chevelure de Tina. Encore une petite fille de Victorine, plus jeune. il semble que les fillettes fassent leur apprentissage de domestiques dans la propriété des Kerveguen.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690194430/artwork-afac/t6dcwhif9xh1mjzkxh0a.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    null,
    null,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Elise',
    '1861',
    'Elise est une petite fille de Victorine, issue de sa fille Coralie.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690195206/artwork-afac/zxnspqtjhkfbnebjtz2d.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    null,
    null,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Lucie le ventre plein de cari',
    '1866',
    'Une autre petite fille de Victorine, sans doute dans la maison des Casernes.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690195309/artwork-afac/thtydkj36zcoh8l9mham.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    null,
    null,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Monsieur Bourrayne dans le jardin des Casernes',
    '1861',
    'La suite du commentaire est: "Allons, Virasami, vivement mettre la racine de ce plant (?) comme à Madras!".',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690200618/artwork-afac/vnwqiqooukn4cdcfrk8g.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    12.5,
    20,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Boutchiana Indien',
    '1871',
    'Boutchiana est devenu le domestique personnel de Ch.Mortier de Trévise, et il a vieilli de 6 ans.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690201122/artwork-afac/rxqximl3g9julw6am3je.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    null,
    null,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Golo et Chanvert',
    '1861',
    'Titre complet: "Chanvert descend le chemin de la Plaine, Golo est à ses côtés". Chanvert est peut-etre un ami de la famille. Golo est un domestique qui l''accompagne. A l''arrière du tilbury, il semble qu''il y ait une borne kilométrique sur le côté de la route. Le chemin de la Plaine relie Saint-Pierre à la Plaine des Cafres, et, au-delà, à Saint-Benoît. L''Etablissement de Bel-Air est situé au tiers du parcours, entre La Plaine des Cafres et Saint-Pierre.',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690202561/artwork-afac/uozfc5y8uu3yko8hoyol.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    15.5,
    8,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'L''Établissement',
    '1866',
    'Titre complet: "Arrivée à l''établissement du Tampon". Le chemin de l''Etablissement existe toujours aujourd''hui, à 400 mètres d''altitude. Les deux cavaliers sont sans doute Ch. H. N; Mortier de Trévise lui-même, et son beau-frère (Denis-André de K/véguen)? En avant, 3 autres personnages cheminent à pied. La route traverse le lit desseché de la Rivière d''Abord, et remonte légèrement vers l''Etablissement (c''est-à-dire l''ensemble du fonds avec usine, bâtiments annexes, et camp des travailleurs engagés, non représenté ici. L''usine elle-même est composée de deux corps parallèles de bâtiments, flanqués chacun d''une cheminée: l''une pour évacuer les fumées de combustion pour la batterie Gimart, l''autre la fumée de la machine à vapeur. En quinconce, un autre bâtiment à l''avant, abritant les "tables" pour le séchage du sucre?',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690202041/artwork-afac/pihnfwvfdupqqwtojtjb.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    13.5 ,
    15,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Usine du Tampon',
    '1866',
    'Titre complet: "Tampon-Une usine". Une autre vue de l''usine de Bel Air, au Tampon: on retrouve le bâtiment en quinconce accolé au corps de l''usine, avec ses deux cheminées. Au premier plan, sur le chemin de l''Etablissement (400 m. d''altitude), on distingue un groupe de travailleurs engagés, près d''un point d''eau: un homme, une femme avec un bébé qui porte une jarre sur la tête, et un autre personnage. L''auteur note le nom des arbres et plantes (aloés divers, vacoas, palmiers)',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690201503/artwork-afac/urezyrk8cczmtoametok.jpg',
    'url_large',
    1,
    1,
    1,
    1,
    20.5,
    11.5,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Cheminée du Tampon',
    '1866',
    'Titre complet: "Effet de nuit sur la Cheminée usine du Tampon". Attribuée parfois à l''usine du Grand Tampon, mais c''est peu probable: l''usine du Grand Tampon ayant été une scierie. Or, ici, il s''agit sans doute de l''usine de Bel Air: on reconnaît les deux corps principaux du bâtiment industriel (purgerie et bâtiment abritant la machine à vapeur) en parallèle, comme sur les figures 2 et 3. La cheminée carrée est sur le côté Nord, construite en basalte, avec intercalation de poutres deux côtés par deux côtés. Devant, un gardien, dont l''ombre se projette sur la cheminée. En arrière-plan, une allée de palmiers, qui semble mener vers la maison de maître. La disposition des lieux correspond à celle qui existait à Bel Air. Scène d''apparence paisible ?',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690202217/artwork-afac/oe99la7khv9rrg7iv7ur.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    14,
    20,
    0,
    'Musée Léon Dierx, La Réunion'
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
    'Établissement de la Rivière',
    '1866',
    'Titre complet: "Quartier St Pierre. Etablissement de la Rivière, montagnes de l''Entre Deux". L''usine (Etablissement) est installée rive gauche de la Rivière Saint-Etienne, au débouché du lieu-dit l''Entre-Deux. Elle semble présenter la même physionomie que les autres établissements achetés ou construits par Gabriel de K/Véguen: 2 corps principaux de bâtiments, ici décalés l''un par rapport à l''autre, avec des ouvertures en arc de cercle pou évacuer la chaleur, la cheminée qui évacue les fumées de la batterie Gimart, et, à l''arrière, un ou deux bâtiments pour le séchage du sucre. Au Premier plan, une escouade (une "bande") de travailleurs engagés effectue la "trouaison", pour la replantation de cannes à sucre, sous la direction d''un Commandeur, vêtu d''un pantalon de toile bleue. Un vacoa est ici le témoin indispensable de l''usage de ses feuilles pour le tressage de sacs, destinés ensuite à transporter le sucre produit. ',
    'url_small',
    'https://res.cloudinary.com/didpqnqdv/image/upload/v1690202313/artwork-afac/t3v72oqkupnbvp2gmvmb.jpg',
    'url_large',
    1,
    1,
    2,
    1,
    16.5,
    19.5,
    0,
    'Musée Léon Dierx, La Réunion'
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
    image,
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
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
    image,
    hashedPassword,
    role,
    entity_id
  )
VALUES
  (
    'Gulien',
    'Codeur',
    'gulieur',
    'guliencodeur@example.com',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    '$argon2id$v=19$m=65536,t=5,p=1$wmaumSok+tOezTLnTI/rhQ$Nsx6p6TBT38CBM78CJ/j5PNcw0VevGUodS5kIjGIkcY',
    1,
    NULL
  );

INSERT INTO
  user (
    lastname,
    firstname,
    pseudo,
    email,
    image,
    hashedPassword,
    role,
    entity_id
  )
VALUES
  (
    'Jaspard',
    'Codeur',
    'jaspadeur',
    'jaspardcodeur@example.com',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    '$argon2id$v=19$m=65536,t=5,p=1$1SwnI6fJ3zLhshOXM5S1RA$AhOUD7X2oQo9MVcpsJPAW02PQTONeWNKhP5JVYXM5GQ',
    1,
    NULL
  );

INSERT INTO
  user (
    lastname,
    firstname,
    pseudo,
    email,
    image,
    hashedPassword,
    role,
    entity_id
  )
VALUES
  (
    'Hujo',
    'Codeur',
    'Hujodeur',
    'hujodeur@example.com',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    '$argon2id$v=19$m=65536,t=5,p=1$dbZ4CxL35k4G+yZG8AzUIg$aOe5i3A6+RxPSHpgJimOU9Yp8kK8rKYupe5wQDIIV5s',
    1,
    NULL
  );


INSERT INTO
  user (
    lastname,
    firstname,
    pseudo,
    email,
    image,
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
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    '$argon2id$v=19$m=65536,t=5,p=1$6F4WFjpSx9bSq9k4lp2fiQ$cjVgCHF/voka5bZI9YAainiaT+LkaQxfNN638b/h4fQ',
    2,
    1
  );

INSERT INTO
  user (
    lastname,
    firstname,
    pseudo,
    email,
    image,
    hashedPassword,
    role,
    entity_id
  )
VALUES
  (
    'Istrateur',
    'Admin',
    'admin',
    'admin@admin.com',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    '$argon2id$v=19$m=65536,t=5,p=1$G/OsyV5kacbLZuo6tQKM3w$xK5B1E4vr3+xInGB5qmomg+Cpx3S46DIcdn9d5SbRYI',
    0,
    null
  );

-- Table artwork_favorite
INSERT INTO
  artwork_favorite (user_id, artwork_id)
VALUES
  (1, 1);

INSERT INTO
  artwork_favorite (user_id, artwork_id)
VALUES
  (2, 1);

-- Table artist_technique
INSERT INTO
  artist_technique (artist_id, technique_id)
VALUES
  (1, 1);

-- Table art_trend_artist
INSERT INTO
  art_trend_artist (artist_id, art_trend_id)
VALUES
  (1, 1);
