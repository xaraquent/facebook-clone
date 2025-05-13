const commentService = require('../services/commentsService');

// Skapa en ny kommentar
exports.createComment = async (req, res) => {
  try {
    const { comment_post_ID, comment_user_ID, comment_reaction, comment_content } = req.body;
    const newComment = await commentService.createComment({
      comment_post_ID,
      comment_user_ID,
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
    const commentId = req.params.comment_ID;
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
    const postID = req.params.post_ID;
    const comments = await commentService.getCommentsByPost(postID);
    res.json({ comments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Radera en kommentar
exports.deleteComment = async (req, res) => {
  try {
    const commentID = req.params.comment_ID;
    await commentService.deleteComment(commentID);
    res.json({ message: 'Kommentaren raderades' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
