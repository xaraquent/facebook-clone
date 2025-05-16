const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/messages', chatController.getMessages);

router.get('/message/:message_ID', chatController.getMessage);

router.post('/messages', chatController.createMessage);

router.delete('/messages/:message_ID', chatController.deleteMessage);

router.delete('/messages/:chat_ID', chatController.deleteChat);

router.put('/messages', chatController.updateMessage);

module.exports = router;
