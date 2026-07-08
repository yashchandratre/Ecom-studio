import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import ProtectedAdminRoute from './adminpanel/auth/ProtectedAdminRoute'
import AdminLayout from './adminpanel/components/Layout/AdminLayout'
import Dashboard from './adminpanel/components/pages/Dashboard'

export default function AdminRoutes() {
  return (
    <Route element={<ProtectedAdminRoute />}>
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='*' element={<Navigate to='/admin' replace />} />
      </Route>
    </Route>
  )
}
