CREATE TABLE Posts(
    post_id int AUTO_INCREMENT PRIMARY KEY,
    post_user_id int,
    post_reaction VARCHAR(255),
    post_content VARCHAR(1000),
    PRIMARY KEY (post_id),
    FOREIGN KEY (post_user_id) REFERENCES Users(user_id)
);