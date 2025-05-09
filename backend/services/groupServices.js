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

function updateGroup(group_id, group_name) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE Groups_chat SET group_name = ? WHERE group_id = ?';
    connectionMySQL.query(sql, [group_name, group_id], (err, result) => {
      if (err) reject(err);
      else resolve({ message: 'Group updated successfully', group_id, group_name });
    });
  });
}

function deleteGroup(group_id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM Groups_chat WHERE group_id = ?';
    connectionMySQL.query(sql, [group_id], (err, result) => {
      if (err) reject(err);
      else resolve({ message: 'Group deleted successfully', group_id });
    });
  });
}

module.exports = {
  createGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
};
