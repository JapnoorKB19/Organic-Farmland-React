import React, { useState, useEffect } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import ChatInput from "../../components/chat/ChatInput";  // ✅ Correct Import

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  return (
    <Box sx={{ p: 2, maxWidth: 400, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6">Live Chat</Typography>
      <List sx={{ maxHeight: 200, overflowY: "auto", mb: 1 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>{msg}</ListItem>
        ))}
      </List>

      {/* Chat Input */}
      <ChatInput onSend={sendMessage} />
    </Box>
  );
};

export default ChatPage;
