const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/friends', friendsController.getFriends);
router.get('/friendsandusers', friendsController.friendsAndUsers);

module.exports = router;
