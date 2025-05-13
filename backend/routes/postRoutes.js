const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/post', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.put('/post/:post_ID', postController.updatePost);
router.delete('/post/:post_ID', postController.deletePost);

module.exports = router;
