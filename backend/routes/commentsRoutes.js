const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Skapa kommentar
router.post('/', commentsController.createComment);

// Hämta alla kommentarer
router.get('/', commentsController.getAllComments);

// Hämta kommentarer för ett inlägg
router.get('/post/:postId', commentsController.getCommentsByPost);

// Uppdatera/redigera
router.put('/:id', commentsController.updateComment);

// Radera en kommentar
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
