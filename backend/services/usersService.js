const connectionMySQL = require('../connectionMySQL');

// Hämta alla konton
function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT * FROM Users ORDER BY user_id DESC
    `;
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Hämta ett konto
function getUser() {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT * FROM Users WHERE user_id = ?
    `;
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Skapar konto
function createUser({ user_id, user_name, user_password, user_emil, user_created_date}) {
  return new Promise((resolve, reject) => {
    let sql = `
    INSERT INTO Users (user_id, user_name, user_password, user_emil, user_created_date) VALUES (?, ?, ?, ?, ?)
    `;
    connectionMySQL.query(
      sql, 
      [user_id, user_name, user_password, user_emil, user_created_date],
      (err, result) => {
        if (err) reject(err);
        else resolve({
        user_id: result.insertId, 
        user_name, 
        user_password, 
        user_emil, 
        user_created_date
        });
      }
    );
  });
}

// ta bort konto
function deleteUser() {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM Users WHERE user_id = ?
    `;
    connectionMySQL.query(sql, [user_id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Uppdatera sit konto
function updateUser(user_id, {user_name,user_password, user_emil}){
  return new Promise((resolve, reject) => {
    const sql = `
    UPDATE Users 
    SET user_name = ?, user_password = ?, user_emil = ? 
    WHERE user_id = ?
    `;
    connectionMySQL.query(sql,[user_id, user_name, user_password, user_emil], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
module.exports = {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser
};