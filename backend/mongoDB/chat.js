const mongoose =require("mongoose");

const chatSchema = new mongoose.Schema({
  chat_id: {
    type: Number,
    required: true,
    unique: true,
  },
  message_id: {
    type: Number,
    required: true, 
    unique: true,    
  },
  message_user_id: {
    type: Number,
    required: true, 
    unique: true,  
  },
  message_content: {
    type: String,
    required: true,
  },
  message_reaction: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("chat", chatSchema)