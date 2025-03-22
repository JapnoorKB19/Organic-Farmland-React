import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?farm,organic')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Box sx={{ backgroundColor: "rgba(0,0,0,0.5)", p: 4, borderRadius: 2 }}>
        <Typography variant="h3" fontWeight="bold">Organic Farming, Sustainable Future</Typography>
        <Typography variant="h6" sx={{ my: 2 }}>Connect with local farmers and buy fresh organic produce</Typography>
        <Button variant="contained" color="success" component={Link} to="/search">
          Explore Farmers
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
