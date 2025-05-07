const postService = require('../services/postServices');

exports.createPost = async (req, res) => {
  try {
    const { post_user_id, post_content, post_reaction } = req.body;
    const newPost = await postService.createPost({ post_user_id, post_content, post_reaction });
    res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json({ posts });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.updatePost = (req, res) => {
  const { post_id } = req.params;
  const { post_content, post_reaction } = req.body;

  postService
    .updatePost(post_id, post_content, post_reaction)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.deletePost = (req, res) => {
  const { post_id } = req.params;

  postService
    .deletePost(post_id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
};
