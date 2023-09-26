--
-- Drop Tables
--

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS ArtistProfiles;
DROP TABLE IF EXISTS ArtCategories;
DROP TABLE IF EXISTS Posts;


SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE Users
(
    UserID INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(40) NOT NULL,
    Pronouns VARCHAR(40) NULL,
    UserCategory VARCHAR(255) NULL,
    UserAvatar VARCHAR(600) NULL,
    UserBio TEXT NULL,
    UserWeb VARCHAR(200) NULL,
    PRIMARY KEY (UserID)
);


INSERT INTO Users (Email, Password, FullName) VALUES
(
  "rosy.hunt@email.com",
  "$2b$10$HTqJU9vp4p6uW1bIqpmM1elQ5vi5soQLsbHqRdr6dgxeleZv4aL5K",
  "Rosy Hunt"
  ),


(
  "carlos.Lopez@email.com",
  "$2b$10$t5IfQ96eZFrgZ8Y57UWku.5PITs8wqAuVt4w7TC9cmjflaKlVgXOq",
  "Carlos Lopez"


  ),
(
 "hanna.artist@email.com",
 "$2b$10$fmXzrK.BB0l85WkwXcS/6.OYdrKluIZ.Q.6ktzrtmheJsejuvK2fy",
 "Hanna Sutton"


 );








CREATE TABLE ArtCategories
(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    Category VARCHAR(60) NOT NULL,
    INDEX idx_category (Category)
);

INSERT INTO ArtCategories (Category) VALUES 
("Traditional Art"), 
("Digital Art"), 
("Audiovisual");


CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    UserID INT NOT NULL,
    Title VARCHAR(40) NOT NULL,
    Category VARCHAR(60) NOT NULL,
    Body TEXT(1000) NOT NULL,
    Image1 VARCHAR(600) NOT NULL,
    Image2 VARCHAR(600) NULL,
    Image3 VARCHAR(600) NULL,
    Video VARCHAR(600) NULL,
    FOREIGN KEY (Category) REFERENCES ArtCategories (Category),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
