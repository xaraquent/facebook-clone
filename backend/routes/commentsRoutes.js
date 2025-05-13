const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Skapa kommentar
router.post('/comments', commentsController.createComment);

// Hämta alla kommentarer
router.get('/comments', commentsController.getAllComments);

// Hämta kommentarer för ett inlägg
router.get('/comment/:post_id', commentsController.getCommentsByPost);

// Uppdatera/redigera
router.put('/comments', commentsController.updateComment);

// Radera en kommentar
router.delete('/comments/:comment_id', commentsController.deleteComment);

module.exports = router;
