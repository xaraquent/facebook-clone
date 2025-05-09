const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/post', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.put('/post/:post_id', postController.updatePost);
router.delete('/post/:post_id', postController.deletePost);

module.exports = router;
