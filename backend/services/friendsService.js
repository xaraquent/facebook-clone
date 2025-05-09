const connectionMySQL = require('../connectionMySQL');

function getFriends() {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM Friends';
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function friendsAndUsers() {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT Users.user_name, Friends.friend_name
    FROM Friend_list
    INNER JOIN Users ON Friend_list.friend_user_ID = Users.user_ID
    INNER JOIN Friends On Friend_list.friend_friend_ID = Friends.friend_ID
    `;
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getFriend(friend_name) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM Friends WHERE friend_name = ?`;
    connectionMySQL.query(sql, [friend_name], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function createFriend(friend_name, friend_created_date) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO Friends(friend_name, friend_created_date)
    VALUES (?,?)`;
    let params = [friend_name, friend_created_date];
    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function deleteFriend(friend_name) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM Friends WHERE friend_name = ?`;

    connectionMySQL.query(sql, [friend_name], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  getFriends,
  friendsAndUsers,
  getFriend,
  createFriend,
  deleteFriend,
};
