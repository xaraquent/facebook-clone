const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Skapa kommentar
router.post('/comment', commentsController.createComment);

// Hämta alla kommentarer
router.get('/comments', commentsController.getAllComments);

// Hämta kommentarer för ett inlägg
router.get('/comments/post/:post_id', commentsController.getCommentsByPost);

// Uppdatera/redigera
router.put('/comment/:comment_id', commentsController.updateComment);

// Radera en kommentar
router.delete('/comment/:comment_id', commentsController.deleteComment);

module.exports = router;
