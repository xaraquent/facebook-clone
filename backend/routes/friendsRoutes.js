const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/friends', friendsController.getFriends);
router.get('/friends/:friend_name', friendsController.getFriend);
router.post('/friends', friendsController.createFriend);
router.delete('/friends/:friend_name', friendsController.deleteFriend);
//En endpoint som sammankopplar friends och users
router.get('/friends-and-users', friendsController.friendsAndUsers);

module.exports = router;
