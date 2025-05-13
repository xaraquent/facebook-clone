const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/messages', chatController.getMessages);

router.get('/message/:message_id', chatController.getMessage);

router.post('/messages', chatController.createMessage);

router.delete('/messages', chatController.deleteMessage);

router.delete('/messages', chatController.deleteChat);

router.put('/messages', chatController.updatemessage);

module.exports = router;