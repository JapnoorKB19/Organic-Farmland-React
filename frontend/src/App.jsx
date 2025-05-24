import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Common Components
import Layout from './components/common/Layout'
import PrivateRoute from './components/PrivateRoute'

// Dashboards
import FarmerDashboard from './pages/dashboards/FarmerDashboard'
import ConsumerDashboard from './pages/dashboards/ConsumerDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'


// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import BlogPage from './pages/Blogs/BlogPage'
import Unauthorized from './pages/Unauthorized'

import ExploreFarmers from './pages/ExploreFarmers'
import BrowseProducts from './pages/BrowseProducts'
import MyOrders from './pages/MyOrders'
import ChatWithFarmers from './pages/ChatWithFarmers'
import MyReviews from './pages/MyReviews'

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
        <Route path="blog" element={<BlogPage />} />

        {/* Role-Based Dashboards */}
        <Route
          path="/dashboard/farmer"
          element={
            <PrivateRoute allowedRoles={['farmer']}>
              <FarmerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/consumer"
          element={
            <PrivateRoute allowedRoles={['consumer']}>
              <ConsumerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Quick Action Pages */}
        <Route path="/explore-farmers" element={<ExploreFarmers />} />
        <Route path="/products" element={<BrowseProducts />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/chat" element={<ChatWithFarmers />} />
        <Route path="/my-reviews" element={<MyReviews />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 Page */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default App
