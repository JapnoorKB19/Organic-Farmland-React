// src/pages/Unauthorized.jsx
import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      textAlign="center"
      p={3}
    >
      <Typography variant="h3" color="error" gutterBottom>
        403 - Unauthorized Access
      </Typography>
      <Typography variant="h6" gutterBottom>
        Sorry, you don’t have permission to view this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  )
}

export default Unauthorized
