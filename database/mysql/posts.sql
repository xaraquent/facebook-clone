CREATE TABLE Posts(
    post_id INT AUTO_INCREMENT NOT NULL,
    post_user_id INT,
    post_reaction VARCHAR(255),
    post_content VARCHAR(1000),
    PRIMARY KEY (post_id),
    FOREIGN KEY (post_user_id) REFERENCES Users(user_id)
);