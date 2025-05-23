const connectionMySQL = require('../connectionMySQL');

// Hämta alla konton
function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT * FROM Users ORDER BY user_ID DESC
    `;
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Hämta ett konto
function getUser(user_ID) {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT * FROM Users WHERE user_ID = ?
    `;
    connectionMySQL.query(sql, [user_ID], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Skapar konto
function createUser({ user_name, user_password, user_email, user_created_date }) {
  return new Promise((resolve, reject) => {
    let sql = `
    INSERT INTO Users (user_name, user_password, user_email, user_created_date) VALUES (?, ?, ?, ? )
    `;
    connectionMySQL.query(
      sql,
      [user_name, user_password, user_email, user_created_date],
      (err, result) => {
        if (err) reject(err);
        else
          resolve({
            user_ID: result.insertId,
            user_name,
            user_password,
            user_email,
            user_created_date,
          });
      }
    );
  });
}

// ta bort konto
function deleteUser(user_ID) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM Users WHERE user_ID = ?
    `;
    connectionMySQL.query(sql, [user_ID], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Uppdatera sit konto
function updateUser(user_ID, { user_name, user_password, user_email }) {
  return new Promise((resolve, reject) => {
    let sql = `
    UPDATE Users 
    SET user_name = ?, user_password = ?, user_email = ? 
    WHERE user_ID = ?
    `;
    connectionMySQL.query(sql, [user_ID, user_name, user_password, user_email], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

//Route för att kunna logga med en redan skapad användare
function loginUser(user_email, user_password) {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT * FROM Users WHERE user_email = ? AND user_password = ? `;
    connectionMySQL.query(sql, [user_email, user_password], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length === 0) {
        resolve(null);
      } else resolve(rows[0]);
    });
  });
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser,
  loginUser,
};
