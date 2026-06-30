import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManagerDashboard from './pages/manager/ManagerDashboard'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function RoleRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'ADMIN') return <Navigate to="/admin" replace />
  if (user.role === 'MANAGER') return <Navigate to="/manager" replace />
  return <Navigate to="/customer" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RoleRedirect />} />

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/manager" element={
        <ProtectedRoute allowedRoles={['MANAGER']}>
          <ManagerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/customer" element={
        <ProtectedRoute allowedRoles={['CUSTOMER', 'EMPLOYEE']}>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
