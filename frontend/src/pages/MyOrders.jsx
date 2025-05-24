// src/pages/MyOrders.jsx
import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress
} from '@mui/material'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace with real API call
    const fetchOrders = async () => {
      try {
        const dummyOrders = [
          {
            id: 'ORD123',
            product: 'Organic Tomatoes',
            quantity: 2,
            total: 60,
            status: 'Delivered',
            date: '2025-05-20',
          },
          {
            id: 'ORD124',
            product: 'Fresh Apples',
            quantity: 3,
            total: 150,
            status: 'Processing',
            date: '2025-05-22',
          },
        ]
        setOrders(dummyOrders)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success'
      case 'Processing':
        return 'warning'
      case 'Cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total (₹)</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color={getStatusColor(order.status)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default MyOrders
