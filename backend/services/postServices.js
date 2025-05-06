const connectionMySQL = require('../connectionMySQL');

function createPost({ post_user_id, post_content, post_reaction }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Posts (post_user_id, post_content, post_reaction)
      VALUES (?, ?, ?)
    `;
    connectionMySQL.query(sql, [post_user_id, post_content, post_reaction], (err, result) => {
      if (err) reject(err);
      else resolve({ post_id: result.insertId, post_user_id, post_content, post_reaction });
    });
  });
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Posts ORDER BY post_id DESC';
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  createPost,
  getAllPosts,
};
