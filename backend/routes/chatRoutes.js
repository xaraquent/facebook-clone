const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/messages', chatController.getMessages);

router.get('/message/:message_id', chatController.getMessage);

router.post('/messages', chatController.createMessage);

router.delete('/messages/:message_id', chatController.deleteMessage);

router.delete('/messages/:chat_id', chatController.deleteChat);

router.put('/messages', chatController.updateMessage);

module.exports = router;
