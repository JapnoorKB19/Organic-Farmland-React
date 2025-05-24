import React, { useState, useEffect } from "react";
import { Box, TextField, Button, List, ListItem, Typography } from "@mui/material";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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