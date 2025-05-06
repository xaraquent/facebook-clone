const connectionMySQL = require('../connectionMySQL');

function createGroup(group_name) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Groups_chat (group_name) VALUES (?)';
    connectionMySQL.query(sql, [group_name], (err, result) => {
      if (err) reject(err);
      else resolve({ group_id: result.insertId, group_name });
    });
  });
}

function getAllGroups() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Groups_chat ORDER BY group_id DESC';
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  createGroup,
  getAllGroups,
};
