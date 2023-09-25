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
    ArtistAvatar VARCHAR(600) NULL,
    ArtistBio TEXT NULL,
    ArtistWeb VARCHAR(200) NULL,
    PRIMARY KEY (UserID)
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
