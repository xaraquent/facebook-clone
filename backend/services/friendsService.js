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

module.exports = {
  getFriends,
  friendsAndUsers,
};
