import React, { useEffect, useState, useRef } from "react";

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

} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { useChat } from "../context/ChatContext";

import axios from "axios";



const ChatWithFarmer = () => {

  const { farmerId } = useParams(); // 👈 gets from route /chat/:farmerId

  const { user, loading: authLoading  } = useAuth(); // consumer user

  const { socket } = useChat();

  const [messages, setMessages] = useState([]);

  const [newMsg, setNewMsg] = useState("");

  const bottomRef = useRef(null);



  const consumerId = user?._id;



  const [chatId, setChatId] = useState(null); // add this at the top

// Inside src/pages/ChatWithFarmers.jsx
// ... (keep all your existing imports and state definitions as they are)

  // This useEffect will run when consumerId or farmerId changes
  useEffect(() => {
    // Log for debugging: Check the state of IDs and authLoading
    console.log("ChatWithFarmer useEffect called:");
    console.log("  Auth User:", user);
    console.log("  Auth Loading:", authLoading);
    console.log("  Consumer ID:", consumerId);
    console.log("  Farmer ID:", farmerId);

    // --- START OF THE ONLY CODE TO ADD/MODIFY HERE ---
    // If authentication is still loading OR user is not logged in after loading,
    // we cannot proceed with chat setup.
    if (authLoading || !user) {
        console.log("Authentication not ready or user not logged in. Waiting or exiting chat setup.");
        // This 'return' prevents the rest of the useEffect from running until user/authLoading are stable.
        return;
    }
    // --- END OF THE ONLY CODE TO ADD/MODIFY HERE ---


    // Only proceed if consumerId and farmerId are available.
    // At this point, !authLoading is true and user is an object, so consumerId should be defined.
    if (consumerId && farmerId) {
      console.log("Auth loaded, and both consumerId and farmerId are present. Proceeding to fetch/create conversation.");

      const fetchOrCreateConversation = async () => {
        // ... (the rest of your fetchOrCreateConversation function as it was)
        // This includes axios.post('/api/chat/conversation'), setChatId, etc.
        // ...
      };

      fetchOrCreateConversation();

    } else {
        // This 'else' should now rarely hit if the above 'if (authLoading || !user)' handles it,
        // unless farmerId is missing from the URL.
        console.log("Consumer ID or Farmer ID is missing after auth loaded (unexpected). Consumer ID:", consumerId, "Farmer ID:", farmerId);
    }


    // Cleanup for socket.io listener when component unmounts or dependencies change
    return () => {
        socket.off("receiveMessage");
    };
  }, [consumerId, farmerId, socket, user, authLoading]); // Ensure user and authLoading are dependencies


useEffect(() => {
  console.log("Auth User:", user); // ADD THIS LOG
  console.log("Auth Loading:", authLoading); // ADD THIS LOG
  console.log("Consumer ID (derived):", consumerId, "Farmer ID (param):", farmerId);
  console.log("Consumer ID:", consumerId, "Farmer ID:", farmerId);
  const fetchOrCreateConversation = async () => {
    try {
      const res = await axios.post(`/api/chat/conversation`, {
        senderId: consumerId,
        receiverId: farmerId,
      });

      const convoId = res.data._id; // <--- This line relies on res.data._id
      setChatId(convoId); // ✅ store it in state

      const msgs = await axios.get(`/api/chat/messages/${convoId}`);
      setMessages(msgs.data);

      socket.emit("joinRoom", { chatId: convoId });

      socket.on("receiveMessage", (msg) => {
        if (msg.chatId === convoId) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    } catch (err) {
      console.error("Failed to load chat", err); // <-- Check for this error!
    }
  };

  if (consumerId && farmerId) { // <--- This condition must be true
    fetchOrCreateConversation();
  }

  return () => {
    socket.off("receiveMessage");
  };
}, [consumerId, farmerId, socket]);



  useEffect(() => {

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);


  console.log("sendMessage called");
  const sendMessage = async () => {
    console.log("newMsg:", newMsg, "chatId:", chatId);
    if (!newMsg.trim() || !chatId) {
        console.log("Message or chatId is empty. Not sending.");
        return;
    }

    try {
        console.log("Attempting to send message to API:", {
            chatId,
            senderId: consumerId, // or farmerId for ChatWithConsumers
            text: newMsg,
        });

        const res = await axios.post(`/api/chat/message`, {
            chatId,
            senderId: consumerId, // or farmerId for ChatWithConsumers
            text: newMsg,
        });

        console.log("Message successfully saved to DB. Response data:", res.data);

        socket.emit("sendMessage", {
            chatId,
            message: res.data,
        });
        console.log("Message emitted via Socket.IO.");

        setMessages((prev) => [...prev, res.data]);
        setNewMsg("");
        console.log("Local messages state updated.");

    } catch (err) {
        console.error("Failed to send message via API or Socket.IO:", err);
        // Log more details about the error
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Server responded with error data:", err.response.data);
            console.error("Server responded with status:", err.response.status);
            console.error("Server responded with headers:", err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error("No response received from server:", err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up request:", err.message);
        }
    }
};

  return (

    <Box p={3}>

      <Typography variant="h5" gutterBottom>

        Chat with Farmer

      </Typography>

      <Paper sx={{ height: "60vh", overflowY: "auto", p: 2 }}>

        <List>

          {messages.map((msg) => (

            <ListItem

              key={msg._id}

              sx={{

                justifyContent: msg.senderId === consumerId ? "flex-end" : "flex-start",

              }}

            >

              <ListItemText

                primary={msg.text}

                sx={{

                  bgcolor: msg.senderId === consumerId ? "primary.main" : "grey.300",

                  color: msg.senderId === consumerId ? "white" : "black",

                  px: 2,

                  py: 1,

                  borderRadius: 2,

                  maxWidth: "70%",

                }}

              />

            </ListItem>

          ))}

          <div ref={bottomRef} />

        </List>

      </Paper>



      <Divider sx={{ my: 2 }} />

      <Box display="flex" gap={1}>

        <TextField

          fullWidth

          value={newMsg}

          onChange={(e) => setNewMsg(e.target.value)}

          placeholder="Type a message"

          onKeyDown={(e) => e.key === "Enter" && sendMessage()}

        />

        <IconButton color="primary" onClick={sendMessage}>

          <SendIcon />

        </IconButton>

      </Box>

    </Box>

  );

};



export default ChatWithFarmer;