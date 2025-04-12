// src/components/common/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2E7D32", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", paddingX: 2 }}>
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          Farm Connect 🌱
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/search" sx={{ mx: 1 }}>Search Farmers</Button>
          <Button color="inherit" component={Link} to="/blog" sx={{ mx: 1 }}>Blog</Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/login" 
            sx={{ mx: 1, border: "1px solid white", borderRadius: "20px", px: 2 }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;