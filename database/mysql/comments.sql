CREATE TABLE Comments(
    comment_ID INT AUTO_INCREMENT NOT NULL,
    comment_post_ID INT,
    comment_user_ID INT,
    comment_reaction VARCHAR(255),
    comment_content VARCHAR(255),
    PRIMARY KEY (comment_ID),
    FOREIGN KEY (comment_post_ID) REFERENCES Posts(post_id),
    FOREIGN KEY (comment_user_ID) REFERENCES Users(user_id)
);