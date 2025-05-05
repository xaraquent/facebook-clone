const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/friends', friendsController.getFriends);
router.get('/friend-and-users', friendsController.friendsAndUsers);

module.exports = router;
