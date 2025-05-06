const connectionMySQL = require('../connectionMySQL');

function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM Users';
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  getUsers,
};