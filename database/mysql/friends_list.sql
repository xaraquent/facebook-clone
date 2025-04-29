-- Mellan tabellen för många till många relationen mellan friends och users
CREATE TABLE Friend_list(
    friend_list_ID INT AUTO_INCREMENT NOT NULL,
    friend_friend_ID INT,
    friend_user_ID INT,
    PRIMARY KEY (friend_list_ID),
    FOREIGN KEY (friend_friend_ID) REFERENCES Friends(friend_ID),
    FOREIGN KEY (friend_user_ID) REFERENCES Users(user_ID)
);