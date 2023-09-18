--
-- Drop Tables
--

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS cat_breed;
DROP TABLE IF EXISTS blog_post;
DROP TABLE IF EXISTS facts;



SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE cat_breed (
  id INTEGER NOT NULL AUTO_INCREMENT,
  cat_type VARCHAR(40) NOT NULL,
  PRIMARY KEY (id), 
   INDEX idx_cat_type (cat_type)
);


INSERT INTO cat_breed (cat_type) VALUES
        ("Abyssinian"),
        ("American Bobtail"),
        ("American Curl"),
        ("American Shorthair"),
        ("American Wirehair"),
        ("Balinese"),
        ("Bengal"),
        ("Birman"),
        ("Bombay"),
        ("British Shorthair"),
        ("Burmese"),
        ("Chartreux"),
        ("Cornish Rex"),
        ("Devon Rex"),
        ("Egyptian Mau"),
        ("Exotic Shorthair"),
        ("Himalayan"),
        ("Maine Coon"),
        ("Manx"),
        ("Norwegian Forest Cat"),
        ("Ocicat"),
        ("Persian"),
        ("Ragdoll"),
        ("Russian Blue"),
        ("Scottish Fold"),
        ("Siamese"),
        ("Siberian"),
        ("Somali"),
        ("Sphynx"),
        ("Tonkinese"),
        ("Turkish Angora"),
        ("Turkish Van");



CREATE TABLE facts (
  id INTEGER NOT NULL AUTO_INCREMENT,
  cat_name VARCHAR(40) NOT NULL,
  cat_type VARCHAR(40) NOT NULL,
  short_description VARCHAR(500) NOT NULL,
  src VARCHAR(3000) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cat_type) REFERENCES cat_breed(cat_type)
);


INSERT INTO facts (cat_name, short_description, cat_type, src) VALUES
(
  "cat_name 1",
  "short_description 1",
  "Siamese",
  "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2021/04/siames-scaled.jpg?fit=1200%2C800&quality=50&strip=all&ssl=1"
),
(
  "cat_name 2",
  "short_description 2",
  "Abyssinian",
  "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcR7SuJFd_7qVrZsyU-bYcODZag85XhiR1JK4lBifJXTPWb2G7EyeO0MazjAFlFDBegcd4p_mp6pZDv-mR4"
),
(
  "cat_name 3",
  "short_description 3",
  "American Curl",
  "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQYB7bM5avehZd2CyQS2o3MzVxM4CPw60-2xyPbjEkfQQQIjv9TA3uWwamkMndrW5h1_HEiZ_iZFReb5YQ"
);


CREATE TABLE blog_post (
  id INTEGER NOT NULL AUTO_INCREMENT,
  long_description TEXT NOT NULL,
  fact_id INTEGER,
  cat_type VARCHAR(40) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (fact_id) REFERENCES facts(id),
  FOREIGN KEY (cat_type) REFERENCES cat_breed(cat_type)
);





INSERT INTO blog_post (long_description, fact_id, cat_type) VALUES
("This is a blog post about cats.", 1, "Siamese"), 
("Another blog post about cats.", 2, "Abyssinian"), 
("My dear one.", 3, "American Curl");   



