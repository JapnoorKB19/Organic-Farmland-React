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
  IconButton as MuiIconButton
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import {
  getConversations,
  getMessages,
  sendMessage as sendChatMessage,
} from "../api/chatAPI";
import axios from "axios";

export default function ChatWithConsumers({ open, onClose, initialConvoId }) {
  const { socket } = useChat();
  const { user } = useAuth();
  const farmerId = user?._id;

  const [conversations, setConversations] = useState([]);
  const [messagesMap, setMessagesMap] = useState({});
  const [currentConvoId, setCurrentConvoId] = useState(initialConvoId || null);
  const [newMsg, setNewMsg] = useState("");

  const bottomRef = useRef(null);

  // Scroll to bottom when messages or convo changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesMap, currentConvoId]);

  // Update currentConvoId if initialConvoId changes from parent
  useEffect(() => {
    if (initialConvoId && initialConvoId !== currentConvoId) {
      setCurrentConvoId(initialConvoId);
    }
  }, [initialConvoId]);


  // Fetch conversations once when component mounts or farmerId changes
  useEffect(() => {
    if (!farmerId) return;

    const fetchConversations = async () => {
      try {
        const res = await getConversations(farmerId);
        setConversations(res.data);
        // Do NOT set currentConvoId here to avoid overriding prop-driven state
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };

    fetchConversations();
  }, [farmerId]);

  // Fetch messages for current conversation and handle socket events
  useEffect(() => {
    if (!currentConvoId) return;

    const fetchMessages = async () => {
      try {
        const res = await getMessages(currentConvoId);
        setMessagesMap((prev) => ({ ...prev, [currentConvoId]: res.data }));
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();

    socket.emit("joinRoom", { chatId: currentConvoId });

    socket.on("receiveMessage", (message) => {
      console.log("Client received message:", message); // Add this!
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

  const sendMessage = async () => {
    if (!newMsg.trim() || !currentConvoId) return;

    try {
      const res = await sendChatMessage(currentConvoId, farmerId, newMsg.trim());

      setMessagesMap((prev) => {
        const msgs = prev[currentConvoId] ?? [];
        return { ...prev, [currentConvoId]: [...msgs, res.data] };
      });

      socket.emit("sendMessage", {
        chatId: currentConvoId,
        message: res.data,
      });

      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const getConsumerName = (participants) =>
    participants.find((p) => p._id !== farmerId)?.name || "User";

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", md: 380 }, p: 2 } }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Chats</Typography>
        <MuiIconButton onClick={onClose}>
          <CloseIcon />
        </MuiIconButton>
      </Box>

      <Box display="flex" gap={2}>
        <Box sx={{ width: 110, borderRight: "1px solid #ddd" }}>
          {conversations.map((convo) => {
            const consumerName = getConsumerName(convo.participants);
            return (
              <Button
                key={convo._id}
                fullWidth
                variant={currentConvoId === convo._id ? "contained" : "text"}
                onClick={() => setCurrentConvoId(convo._id)}
              >
                {consumerName}
              </Button>
            );
          })}
        </Box>

        <Box flexGrow={1} display="flex" flexDirection="column" height="70vh">
          <Paper sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
            <List>
              {(messagesMap[currentConvoId] ?? []).map((msg) => (
                <ListItem
                  key={msg._id || Math.random()}
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
