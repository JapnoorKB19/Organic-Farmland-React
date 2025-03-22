import React, { useState, useEffect } from "react";
import { Box, TextField, Button, List, ListItem, Typography } from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Update with your backend URL

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6">Live Chat</Typography>
      <List sx={{ maxHeight: 200, overflowY: "auto", mb: 1 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>{msg}</ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        sx={{ mb: 1 }}
      />
      <Button variant="contained" fullWidth onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default ChatComponent;