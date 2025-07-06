// src/api/chatAPI.js

import axios from "axios";

// 1. Create or get a conversation
export const createConversation = (senderId, receiverId) =>
  axios.post("/api/chat/conversation", { senderId, receiverId });

// 2. Get conversations for a user
export const getConversations = (userId) =>
  axios.get(`/api/chat/conversations/${userId}`);

// 3. Create a new message
export const sendMessage = (chatId, senderId, text) =>
  axios.post("/api/chat/message", { chatId, senderId, text });

// 4. Get messages for a conversation
export const getMessages = (chatId) =>
  axios.get(`/api/chat/messages/${chatId}`);
