// src/pages/ChatWithFarmers.jsx
import React, { useState, useEffect, useRef } from 'react'
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
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const ChatWithFarmers = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Replace with real chat messages API
    const dummyMessages = [
      { sender: 'Farmer Rajiv', text: 'Hi! These tomatoes are freshly picked today.' },
      { sender: 'You', text: 'Great! How much for 2kg?' },
    ]
    setMessages(dummyMessages)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim() === '') return

    const updatedMessages = [
      ...messages,
      { sender: 'You', text: newMessage }
    ]
    setMessages(updatedMessages)
    setNewMessage('')
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Chat with Farmers
      </Typography>

      <Paper elevation={3} sx={{ p: 2, height: '60vh', overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={msg.text}
                secondary={msg.sender}
                sx={{
                  textAlign: msg.sender === 'You' ? 'right' : 'left',
                  '& .MuiListItemText-secondary': {
                    color: msg.sender === 'You' ? 'green' : 'gray',
                  },
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
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatWithFarmers
