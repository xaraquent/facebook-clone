const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/friends', friendsController.getFriends);
router.get('/friends-and-users', friendsController.friendsAndUsers);

module.exports = router;
