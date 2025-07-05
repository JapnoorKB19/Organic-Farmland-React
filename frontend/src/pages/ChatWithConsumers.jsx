import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Divider,
  Drawer,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext"; // your auth context
import axios from "axios";

export default function ChatWithConsumers() {
  const { socket } = useChat();
  const { user } = useAuth(); // logged-in farmer
  const farmerId = user?._id;

  const [conversations, setConversations] = useState([]); // array of { _id, participants }
  const [messagesMap, setMessagesMap] = useState({}); // convoId -> messages[]
  const [currentConvoId, setCurrentConvoId] = useState(null);
  const [newMsg, setNewMsg] = useState("");

  const bottomRef = useRef(null);

  // Scroll chat to bottom on messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesMap, currentConvoId]);

  // 1️⃣ Load conversations on mount
  useEffect(() => {
    if (!farmerId) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(`/api/chat/conversations/${farmerId}`);
        setConversations(res.data);

        // Auto-select first conversation if none selected
        if (res.data.length > 0 && !currentConvoId) {
          setCurrentConvoId(res.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };

    fetchConversations();
  }, [farmerId, currentConvoId]);

  // 2️⃣ Load messages for current convo & join socket room
  useEffect(() => {
    if (!currentConvoId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chat/messages/${currentConvoId}`);
        setMessagesMap((prev) => ({ ...prev, [currentConvoId]: res.data }));
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();

    // Join socket room for real-time updates
    socket.emit("joinRoom", { chatId: currentConvoId });

    // Listen for messages for this convo
    socket.on("receiveMessage", (message) => {
      if (message.chatId === currentConvoId) {
        setMessagesMap((prev) => {
          const msgs = prev[currentConvoId] ?? [];
          return { ...prev, [currentConvoId]: [...msgs, message] };
        });
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentConvoId, socket]);

  // 3️⃣ Send message handler
  const sendMessage = async () => {
    if (!newMsg.trim() || !currentConvoId) return;

    const messageToSend = {
      chatId: currentConvoId,
      senderId: farmerId,
      text: newMsg,
    };

    try {
      // Save message in DB
      const res = await axios.post("/api/chat/message", messageToSend);

      // Optimistically update UI
      setMessagesMap((prev) => {
        const msgs = prev[currentConvoId] ?? [];
        return { ...prev, [currentConvoId]: [...msgs, res.data] };
      });

      // Emit message via socket
      socket.emit("sendMessage", { chatId: currentConvoId, message: res.data });

      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Helper to get consumer's userId in a conversation (other than farmer)
  const getConsumerId = (participants) =>
    participants.find((p) => p._id !== farmerId)?._id;

  return (
    <Drawer
      anchor="right"
      open // control this with dashboard state if needed
      PaperProps={{ sx: { width: { xs: "100%", md: 380 }, p: 2 } }}
    >
      <Typography variant="h6" mb={1}>
        Chats
      </Typography>

      <Box display="flex" gap={2}>
        {/* Conversation list */}
        <Box sx={{ width: 110, borderRight: "1px solid #ddd" }}>
          {conversations.map((convo) => {
            const consumerId = getConsumerId(convo.participants);
            return (
              <Button
                key={convo._id}
                fullWidth
                variant={currentConvoId === convo._id ? "contained" : "text"}
                onClick={() => setCurrentConvoId(convo._id)}
              >
                {consumerId?.slice(-4) ?? "User"}
              </Button>
            );
          })}
        </Box>

        {/* Chat panel */}
        <Box flexGrow={1} display="flex" flexDirection="column" height="70vh">
          <Paper sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
            <List>
              {(messagesMap[currentConvoId] ?? []).map((msg) => (
                <ListItem
                  key={msg._id}
                  sx={{
                    justifyContent:
                      msg.senderId === farmerId ? "flex-end" : "flex-start",
                  }}
                >
                  <ListItemText
                    primary={msg.text}
                    sx={{
                      maxWidth: "70%",
                      bgcolor:
                        msg.senderId === farmerId ? "primary.main" : "grey.300",
                      color:
                        msg.senderId === farmerId
                          ? "primary.contrastText"
                          : "text.primary",
                      borderRadius: 2,
                      px: 1,
                      py: 0.5,
                    }}
                  />
                </ListItem>
              ))}
              <div ref={bottomRef} />
            </List>
          </Paper>

          <Divider sx={{ mb: 1 }} />

          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <IconButton color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
