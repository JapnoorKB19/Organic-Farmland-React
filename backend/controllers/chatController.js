// controllers/chatController.js

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// Create or get existing conversation between sender and receiver
const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId]
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all conversations for a user
const getConversations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const conversations = await Conversation.find({
      participants: userId
    }).populate('participants', '_id name email'); // populate user details as needed

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new message in a conversation
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const message = new Message({
      chatId,
      senderId,
      text
    });

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all messages for a conversation
const getMessages = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createConversation,
  getConversations,
  createMessage,
  getMessages
};
