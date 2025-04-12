// src/pages/Home.jsx
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ocf2 from "../assets/images/ocf2.png"; // Importing the image

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      {/* Image Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <img 
          src={ocf2} 
          alt="Farm Connect" 
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      {/* Text Section */}
      <Typography variant="h3" fontWeight="bold" gutterBottom color="#2E7D32">
        Welcome to Farm Connect 🌿
      </Typography>
      <Typography variant="body1" fontSize="18px" color="text.secondary" paragraph>
        Your one-stop platform for connecting with local organic farmers.
        Discover fresh and sustainable produce directly from trusted farmers near you.
      </Typography>

      {/* Buttons Section */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/search"
          sx={{
            mx: 1,
            borderRadius: "12px",
            px: 3,
            py: 1,
            fontSize: "16px",
            transition: "0.3s",
            "&:hover": { backgroundColor: "#1B5E20" },
          }}
        >
          Search Farmers
        </Button>
        <Button
          variant="outlined"
          color="success"
          component={Link}
          to="/blog"
          sx={{
            mx: 1,
            borderRadius: "12px",
            px: 3,
            py: 1,
            fontSize: "16px",
            borderWidth: "2px",
            transition: "0.3s",
            "&:hover": { borderColor: "#1B5E20", color: "#1B5E20" },
          }}
        >
          Read Blog
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
