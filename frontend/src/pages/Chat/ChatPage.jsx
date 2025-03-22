import React, { useState, useEffect } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import io from "socket.io-client";
import ChatInput from "../../components/chat/ChatInput";  // ✅ Correct Import

const socket = io("http://localhost:5000"); // Update with your backend URL

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

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
