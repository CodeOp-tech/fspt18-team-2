--
-- Drop Tables
--

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS artist_profiles;
DROP TABLE IF EXISTS process_category;
DROP TABLE IF EXISTS posts;


SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE Users
(
    UserID INT NOT NULL AUTO_INCREMENT,
    username NVARCHAR(40) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    PasswordHash BINARY(64) NOT NULL,
    Salt CHAR(36) NOT NULL,
    FirstName NVARCHAR(40) NULL,
    LastName NVARCHAR(40) NULL,
    PRIMARY KEY (UserID)
);













    CREATE TABLE artist_profiles
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    username VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL,
    artist_avatar VARCHAR(600) NULL,
    artist_bio TEXT NULL,
    artist_web VARCHAR(200) NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
    

);







CREATE TABLE process_category
(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    category VARCHAR(60) NOT NULL,
    INDEX idx_category (category)
);




CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    UserID INT NOT NULL,
    post_title VARCHAR(40) NOT NULL,
    category VARCHAR(60) NOT NULL,
    post_body TEXT(1000) NOT NULL,
    post_image_1 VARCHAR(600) NOT NULL,
    post_image_2 VARCHAR(600) NULL,
    post_image_3 VARCHAR(600) NULL,
    post_video VARCHAR(600) NULL,
    FOREIGN KEY (category) REFERENCES process_category(category),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
