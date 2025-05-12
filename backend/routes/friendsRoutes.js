const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/friends', friendsController.getFriends);
router.get('/friend/:friend_name', friendsController.getFriend);
router.post('/friends', friendsController.createFriend);
router.delete('/friend/:friend_name', friendsController.deleteFriend);
//En endpoint som sammankopplar friends och users
router.get('/friends-and-users', friendsController.friendsAndUsers);

module.exports = router;
