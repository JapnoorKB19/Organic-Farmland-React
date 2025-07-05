const express = require('express');
const {
  createConversation,
  getConversations,
  createMessage,
  getMessages
} = require('../controllers/chatController');

const router = express.Router();

router.post('/conversation', createConversation);
router.get('/conversations/:userId', getConversations);
router.post('/message', createMessage);
router.get('/messages/:chatId', getMessages);

module.exports = router;
