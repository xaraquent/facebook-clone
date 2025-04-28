CREATE TABLE Comments(
    comment_id int AUTO_INCREMENT PRIMARY KEY,
    comment_post_id int,
    comment_reaction VARCHAR(255),
    comment_content VARCHAR(255),
    PRIMARY KEY (comment_id),
    FOREIGN KEY (comment_post_id) REFERENCES Posts(post_id)
);