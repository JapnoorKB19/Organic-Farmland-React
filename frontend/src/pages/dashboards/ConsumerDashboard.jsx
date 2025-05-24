// src/pages/dashboards/ConsumerDashboard.jsx
import React, { useEffect, useState } from 'react'
import {
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Paper,
  Stack
} from '@mui/material'
import {
  ShoppingCart,
  Explore,
  ListAlt,
  Chat,
  RateReview,
  Logout
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ConsumerDashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const userName = user?.name || 'Consumer'

  const [openSnackbar, setOpenSnackbar] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    const timer = setTimeout(() => setOpenSnackbar(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
  if (!user) {
    navigate('/login')
  }
}, [user])


  return (
    <Box
      p={4}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9fdf9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Welcome Snackbar */}
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="standard"
          sx={{
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            fontWeight: 500,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          Welcome back, {userName}! 🛒✨
        </Alert>
      </Snackbar>

      {/* Main Section */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight={600}>
          Hello, {userName} 👋
        </Typography>
        <Typography variant="body1" gutterBottom color="text.secondary">
          Explore verified farmers, browse organic products, and manage your orders with ease.
        </Typography>

        {/* Quick Actions */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Quick Actions
          </Typography>
          <Stack spacing={2} mt={2}>
            <Button
              variant="contained"
              startIcon={<Explore />}
              onClick={() => navigate('/explore-farmers')}
            >
              Explore Farmers
            </Button>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={() => navigate('/products')}
            >
              Browse Products
            </Button>
            <Button
              variant="contained"
              startIcon={<ListAlt />}
              onClick={() => navigate('/orders')}
            >
              My Orders
            </Button>
            <Button
              variant="contained"
              startIcon={<Chat />}
              onClick={() => navigate('/chat')}
            >
              Chat with Farmers
            </Button>
            <Button
              variant="contained"
              startIcon={<RateReview />}
              onClick={() => navigate('/my-reviews')}
            >
              My Reviews
            </Button>
          </Stack>
        </Box>

        {/* Logout Button */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          sx={{ mt: 5 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  )
}

export default ConsumerDashboard
