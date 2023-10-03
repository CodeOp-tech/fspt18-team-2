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
 ),


 (
 "janedoe@hotmail.com",
 "$2b$10$Hn3IVV6SLf.pPd4DZHTwUeuQaKJYZVr/whYfYiS2Sru8soh5iLeX6",
 "Jane Doe"
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


CREATE TABLE Posts (
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

INSERT INTO Posts(UserID, Title, Category, Body, Image1, Video) VALUES 
(1, "We talk about Digital Art", "Digital Art", "In an age where technology continues to reshape our lives, art too has embraced the digital frontier, giving birth to an awe-inspiring realm of creativity known as digital art. This ever-evolving medium transcends the traditional confines of canvas and paint, inviting artists to explore endless possibilities and redefine the very essence of visual expression. In this post, we embark on a journey through the captivating world of digital art, where pixels become pigments and imagination knows no bounds.", "https://img.freepik.com/premium-photo/woman-s-face-is-made-up-geometric-shapes-cyberpunk-colorful-fractalism-cubism_834088-1.jpg", "https://youtu.be/2RWop0Gln24?si=y5wjQ2XRqeLmEPuS");


INSERT INTO Posts(UserID, Title, Category, Body, Image1, Image2) VALUES 
(2, "My Studio Time", "Traditional Art", "My Atlanta studio, a cozy space under 500 sq. ft., is my artistic haven. Its intimate size challenges me to be resourceful and focus solely on my art. Large windows let in Atlanta's soft sunlight, casting a warm glow on my creations. Weathered wooden floors tell stories of artistic growth. This space has been witness to my journey, from tentative strokes to bold brushwork, from self-doubt to self-assurance. It's where I confront fears and doubts, bear my soul on canvas, and discover the depths of my own creativity. My studio isn't just a place; it's a spiritual connection, a sanctuary for my artistry.","https://static.timesofisrael.com/atlantajewishtimes/uploads/2020/11/chai-style_DSC_1310_1-1.jpg" , "https://i.etsystatic.com/41069558/r/il/4e6525/4658628669/il_fullxfull.4658628669_bo06.jpg");