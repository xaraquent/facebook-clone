CREATE TABLE Comments(
    comment_id INT AUTO_INCREMENT NOT NULL,
    comment_post_id INT,
    comment_user_id INT,
    comment_reaction VARCHAR(255),
    comment_content VARCHAR(255),
    PRIMARY KEY (comment_id),
    FOREIGN KEY (comment_post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (comment_user_id) REFERENCES Users(user_id)
);