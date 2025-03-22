import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Common Components
import Layout from './components/common/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import FarmerProfile from './pages/Farmers/FarmerProfile'
import BlogPage from './pages/Blogs/BlogPage'

// Protected Page
import ChatPage from './pages/Chat/ChatPage'

// Order Pages
import Checkout from './pages/Orders/Checkout'
import OrderSuccess from './pages/Orders/OrderSuccess'
import MyOrders from './pages/Orders/MyOrders'

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard'
import UserManagement from './pages/Admin/UserManagement'
import FarmerApprovals from './pages/Admin/FarmerApprovals'
import ContentModeration from './pages/Admin/ContentModeration'
import OrderManagement from './pages/Admin/OrderManagement'
import SystemSettings from './pages/Admin/SystemSettings'

function App() {
  const { checkAuthStatus } = useAuth()
  
  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="search" element={<Search />} />
        <Route path="farmers/:id" element={<FarmerProfile />} />
        <Route path="blog" element={<BlogPage />} />
        

<Route path="chat" element={
  <ProtectedRoute>
    <ChatPage />
  </ProtectedRoute>
} />

        
        {/* Order Routes */}
        <Route path="checkout" element={
          <ProtectedRoute allowedRoles={['consumer']}>
            <Checkout />
          </ProtectedRoute>
        } />
        
        <Route path="order-success" element={
          <ProtectedRoute allowedRoles={['consumer']}>
            <OrderSuccess />
          </ProtectedRoute>
        } />
        
        <Route path="my-orders" element={
          <ProtectedRoute allowedRoles={['consumer', 'farmer']}>
            <MyOrders />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagement />
          </ProtectedRoute>
        } />
        
        <Route path="admin/farmer-approvals" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <FarmerApprovals />
          </ProtectedRoute>
        } />
        
        <Route path="admin/content" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ContentModeration />
          </ProtectedRoute>
        } />
        
        <Route path="admin/orders" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <OrderManagement />
          </ProtectedRoute>
        } />
        
        <Route path="admin/settings" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SystemSettings />
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default App