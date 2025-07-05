import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext'; // Assuming you have this
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatWithFarmers = () => {
  const { socket } = useChat();
  const { user } = useAuth(); // logged in user
  const params = useParams();

  // Farmer ID from URL param (adjust route to include farmerId)
  const farmerId = params.farmerId;

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load or create conversation when user or farmer changes
  useEffect(() => {
    if (!user?._id || !farmerId) return;

    const getOrCreateConversation = async () => {
      try {
        const res = await axios.post('/api/chat/conversation', {
          senderId: user._id,
          receiverId: farmerId,
        });
        setConversation(res.data);
      } catch (err) {
        console.error('Failed to get/create conversation', err);
      }
    };

    getOrCreateConversation();
  }, [user, farmerId]);

  // Load messages once conversation is set
  useEffect(() => {
    if (!conversation?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chat/messages/${conversation._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    fetchMessages();

    // Join socket room for this conversation
    socket.emit('joinRoom', { chatId: conversation._id });

    // Listen for new messages from socket
    socket.on('receiveMessage', (message) => {
      if (message.chatId === conversation._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [conversation, socket]);

  // Send message handler
  const handleSend = async () => {
    if (newMessage.trim() === '' || !conversation?._id) return;

    const messageToSend = {
      chatId: conversation._id,
      senderId: user._id,
      text: newMessage,
    };

    try {
      // Persist message in DB
      const res = await axios.post('/api/chat/message', messageToSend);

      // Optimistically update UI
      setMessages((prev) => [...prev, res.data]);

      // Emit message via socket
      socket.emit('sendMessage', {
        chatId: conversation._id,
        message: res.data,
      });

      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Chat with Farmer
      </Typography>

      <Paper elevation={3} sx={{ p: 2, height: '60vh', overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg) => (
            <ListItem
              key={msg._id}
              sx={{ justifyContent: msg.senderId === user._id ? 'flex-end' : 'flex-start' }}
            >
              <ListItemText
                primary={msg.text}
                sx={{
                  maxWidth: '70%',
                  bgcolor: msg.senderId === user._id ? 'primary.main' : 'grey.300',
                  color: msg.senderId === user._id ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 2,
                  px: 1,
                  py: 0.5,
                }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      <Divider sx={{ mb: 2 }} />

      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWithFarmers;
