const connectionMySQL = require('../connectionMySQL');

function createPost({ post_user_ID, post_content, post_reaction }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Posts (post_user_ID, post_content, post_reaction)
      VALUES (?, ?, ?)
    `;
    connectionMySQL.query(sql, [post_user_ID, post_content, post_reaction], (err, result) => {
      if (err) reject(err);
      else resolve({ post_ID: result.insertId, post_user_ID, post_content, post_reaction });
    });
  });
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Posts ORDER BY post_ID DESC';
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function updatePost(post_ID, post_content, post_reaction) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Posts 
      SET post_content = ?, post_reaction = ? 
      WHERE post_ID = ?
    `;
    connectionMySQL.query(sql, [post_content, post_reaction, post_ID], (err, result) => {
      if (err) reject(err);
      else resolve({ message: 'Post updated successfully', post_ID, post_content, post_reaction });
    });
  });
}

function deletePost(post_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM Posts WHERE post_ID = ?';
    connectionMySQL.query(sql, [post_ID], (err, result) => {
      if (err) reject(err);
      else resolve({ message: 'Post deleted successfully', post_ID });
    });
  });
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
