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
  const { messageID } = req.params;
  try {
    const Message = await chatController.find({ message_ID: messageID });
    return res.status(200).json(Message);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateMessage = async (req, res) => {
  const { messageID, content, reaction } = req.body;
  try {
    const UpdateMessage = await chatController.updateOne(
      { message_ID: messageID },
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
  const { messageID } = req.params;
  try {
    const DeleteMessage = await chatController.deleteOne({ message_ID: messageID });
    return res.status(200).json(DeleteMessage);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteChat = async (req, res) => {
  const { chatID } = req.params;
  try {
    const DeleteChat = await chatController.deleteOne({ chat_ID: chatID });
    return res.status(200).json(DeleteChat);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.createMessage = async (req, res) => {
  const { chatID, messageID, messageContent, messageReaction, messageUserID } = req.body;
  // console.log('Data lagt till POST', req.body);
  try {
    const newMessage = new chatController({
      chat_ID: chatID,
      message_ID: messageID,
      message_content: messageContent,
      message_user_ID: messageUserID,
      message_reaction: messageReaction,
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
