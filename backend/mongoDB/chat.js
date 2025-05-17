const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chat_ID: {
    type: Number,
    required: true,
  },
  message_ID: {
    type: Number,
    required: true,
  },
  message_user_ID: {
    type: Number,
    required: true,
  },
  message_content: {
    type: String,
    required: true,
  },
  message_reaction: {
    type: String,
  },
});

module.exports = mongoose.model('chat', chatSchema);
