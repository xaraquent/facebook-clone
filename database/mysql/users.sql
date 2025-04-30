CREATE TABLE Users (
    user_id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_status BOOLEAN,
    user_group_id int,
    user_created_date TIMESTAMP,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_group_id) REFERENCES Groups_chat(group_id)
);

