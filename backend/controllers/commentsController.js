const commentService = require('../services/commentsService');

// Skapa en ny kommentar
exports.createComment = async (req, res) => {
  try {
    const { comment_post_id, comment_user_id, comment_reaction, comment_content } = req.body;
    const newComment = await commentService.createComment({
      comment_post_id,
      comment_user_id,
      comment_reaction,
      comment_content,
    });
    res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//uppdatera/redigera kommentar
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment_content, comment_reaction } = req.body;

    const updated = await commentService.updateComment(commentId, {
      comment_content,
      comment_reaction,
    });

    res.json({ message: updated });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Hämta alla kommentarer
exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.json({ comments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Hämta kommentarer till ett inlägg
exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await commentService.getCommentsByPost(postId);
    res.json({ comments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Radera en kommentar
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    await commentService.deleteComment(commentId);
    res.json({ message: 'Kommentaren raderades' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
