CREATE TABLE Posts(
    post_ID INT AUTO_INCREMENT NOT NULL,
    post_user_ID INT,
    post_reaction VARCHAR(255),
    post_content VARCHAR(1000) NOT NULL,
    PRIMARY KEY (post_ID),
    FOREIGN KEY (post_user_ID) REFERENCES Users(user_ID)
);