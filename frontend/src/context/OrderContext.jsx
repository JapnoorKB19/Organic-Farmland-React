// src/context/OrderContext.jsx
import { createContext, useState, useContext } from 'react'
import orderService from '../services/orderService'
import { useAuth } from '../hooks/useAuth'

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [currentOrder, setCurrentOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const getOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await orderService.getUserOrders()
      setOrders(response.orders)
      
      return response.orders
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getOrderById = async (orderId) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await orderService.getOrderById(orderId)
      setCurrentOrder(response.order)
      
      return response.order
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (orderData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await orderService.createOrder(orderData)
      setCurrentOrder(response.order)
      
      // Update the orders list with the new order
      setOrders(prevOrders => [response.order, ...prevOrders])
      
      return response.order
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await orderService.updateOrderStatus(orderId, status)
      
      // Update the current order if it's the one being modified
      if (currentOrder && currentOrder._id === orderId) {
        setCurrentOrder(response.order)
      }
      
      // Update the order in the orders list
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? response.order : order
        )
      )
      
      return response.order
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await orderService.cancelOrder(orderId)
      
      // Update the current order if it's the one being cancelled
      if (currentOrder && currentOrder._id === orderId) {
        setCurrentOrder(response.order)
      }
      
      // Update the order in the orders list
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? response.order : order
        )
      )
      
      return response.order
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel order')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        loading,
        error,
        getOrders,
        getOrderById,
        createOrder,
        updateOrderStatus,
        cancelOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

// Custom hook for using the Order context
export const useOrders = () => {
  const context = useContext(OrderContext)
  
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  
  return context
}