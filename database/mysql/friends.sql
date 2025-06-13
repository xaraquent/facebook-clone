CREATE TABLE Friends(
    friend_id INT AUTO_INCREMENT NOT NULL,
    friend_name varchar(255) NOT NULL UNIQUE,
    friend_created_date TIMESTAMP,
    PRIMARY KEY (friend_id)
);