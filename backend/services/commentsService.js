const connectionMySQL = require('../connectionMySQL');

// Skapa kommentar
function createComment({ comment_post_ID, comment_user_ID, comment_reaction, comment_content }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Comments (comment_post_ID, comment_user_ID, comment_reaction, comment_content)
      VALUES (?, ?, ?, ?)
    `;
    connectionMySQL.query(
      sql,
      [comment_post_ID, comment_user_ID, comment_reaction, comment_content],
      (err, result) => {
        if (err) reject(err);
        else
          resolve({
            comment_ID: result.insertId,
            comment_post_ID,
            comment_user_ID,
            comment_reaction,
            comment_content,
          });
      }
    );
  });
}

// Hämta alla kommentarer
function getAllComments() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Comments ORDER BY comment_ID DESC';
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Hämta kommentarer för ett inlägg
function getCommentsByPost(postID) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Comments WHERE comment_post_Id = ? ORDER BY comment_ID DESC';
    connectionMySQL.query(sql, [postID], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Uppdatera/redigera kommentar
function updateComment(comment_ID, { comment_content, comment_reaction }) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Comments
      SET comment_content = ?, comment_reaction = ?
      WHERE comment_ID = ?
    `;
    connectionMySQL.query(sql, [comment_content, comment_reaction, comment_ID], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Radera kommentar
function deleteComment(comment_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM Comments WHERE comment_ID = ?';
    connectionMySQL.query(sql, [comment_ID], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  createComment,
  getAllComments,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
