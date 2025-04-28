CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_status BOOLEAN(false),
    -- user_friends int,
    user_group_id int,
    user_created_date TIMESTAMP DEFAULT,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_group_id) REFERENCES Groups(group_id)
);