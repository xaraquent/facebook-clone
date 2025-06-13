-- Mellan tabellen för många till många relationen mellan friends och users
CREATE TABLE Friend_list(
    friend_list_id INT AUTO_INCREMENT NOT NULL,
    friend_friend_id INT,
    friend_user_id INT,
    PRIMARY KEY (friend_list_id),
    FOREIGN KEY (friend_friend_id) REFERENCES Friends(friend_id),
    FOREIGN KEY (friend_user_id) REFERENCES Users(user_id)
);