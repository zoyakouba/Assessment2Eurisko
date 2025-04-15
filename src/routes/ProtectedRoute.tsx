import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from './useAuth'

const ProtectedRoute = () => {
  const { accessToken } = useAuthStore()
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute

