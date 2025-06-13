const connectionMySQL = require('../connectionMySQL');

function createPost({ post_user_id, post_content, post_reaction }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO Posts (post_user_id, post_content, post_reaction)
      VALUES (?, ?, ?)
    `;
    connectionMySQL.query(
      sql,
      [parseInt(post_user_id), post_content, post_reaction],
      (err, result) => {
        if (err) reject(err);
        else resolve({ post_id: result.insertId, post_user_id, post_content, post_reaction });
      }
    );
  });
}

/*function getAllPosts() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Posts ORDER BY post_id DESC';
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}*/

//ändrade till denna
function getAllPosts() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT Posts.*, Users.user_name
      FROM Posts
      JOIN Users ON Posts.post_user_id = Users.user_id
      ORDER BY Posts.post_id DESC
    `;
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function updatePost(post_id, post_content, post_reaction) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Posts 
      SET post_content = ?, post_reaction = ? 
      WHERE post_id = ?
    `;
    connectionMySQL.query(sql, [post_content, post_reaction, post_id], (err, result) => {
      if (err) reject(err);
      else resolve({ message: 'Post updated successfully', post_id, post_content, post_reaction });
    });
  });
}

function deletePost(post_id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM Posts WHERE post_id = ?';
    connectionMySQL.query(sql, [post_id], (err, result) => {
      if (err) reject(err);
      else resolve({ message: 'Post deleted successfully', post_id });
    });
  });
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
