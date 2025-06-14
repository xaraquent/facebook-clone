const { CharsetToEncoding } = require('mysql2');
const chatController = require('../mongoDB/chat');

exports.getMessages = async (req, res) => {
  try {
    const allmessages = await chatController.find();
    return res.status(200).json(allmessages);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMessage = async (req, res) => {
  const { message_id } = req.params;
  try {
    const Message = await chatController.find({ message_id: message_id });
    return res.status(200).json(Message);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateMessage = async (req, res) => {
  const { message_id, content, reaction } = req.body;
  try {
    const UpdateMessage = await chatController.updateOne(
      { message_id: message_id },
      { $set: { message_content: content } },
      { $set: { message_reaction: reaction } }
    );
    return res.status(200).json(UpdateMessage);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  const { message_id } = req.params;
  try {
    const DeleteMessage = await chatController.deleteOne({ message_id: message_id });
    return res.status(200).json(DeleteMessage);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteChat = async (req, res) => {
  const { chat_id } = req.params;
  try {
    const DeleteChat = await chatController.deleteOne({ chat_id: chat_id });
    return res.status(200).json(DeleteChat);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.createMessage = async (req, res) => {
  const {
    chat_id,
    message_id,
    message_content,
    message_reaction,
    message_user_id,
    message_user_name,
  } = req.body;
  // console.log('Data lagt till POST', req.body);
  try {
    const newMessage = new chatController({
      chat_id: chat_id,
      message_id: message_id,
      message_content: message_content,
      message_user_id: message_user_id,
      message_user_name: message_user_name,
      message_reaction: message_reaction,
    });
    const insertedMessage = await newMessage.save();
    return res.status(201).json(insertedMessage);
  } catch (error) {
    // console.error('Fel vid skapandet av meddelandet', error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
