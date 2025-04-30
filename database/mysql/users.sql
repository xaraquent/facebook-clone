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

INSERT INTO Users(user_name, user_password, user_email) VALUES 
('Hampus123', 'KaKa123!', 'hampus@gmail.com'), 
('CatLOVER', 'Cat20love*', 'cat@gmail.com'),
('xX_Hate_Xx', 'Hate!123', 'hate@gmail.com');

SELECT COUNT(user_id)
FROM Users;