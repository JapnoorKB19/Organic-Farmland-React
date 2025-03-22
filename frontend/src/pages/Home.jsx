import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { Button, Typography, Box, Stack, Container } from "@mui/material";
import farmImage from "../assets/images/ocf2.png";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" fontWeight="bold" color="green" gutterBottom>
        Welcome to <Typography component="span" color="darkgreen">Organic Farmland</Typography>
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        Connecting farmers and consumers directly for fresh, organic produce.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <img src={farmImage} alt="Farmland" style={{ maxWidth: "100%", borderRadius: "10px" }} />
      </Box>

      <Stack spacing={2} direction="row" justifyContent="center">
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="success"
          startIcon={<FaUserPlus />}
          sx={{ px: 3 }}
        >
          Sign Up
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          startIcon={<FaSignInAlt />}
          sx={{ px: 3 }}
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
