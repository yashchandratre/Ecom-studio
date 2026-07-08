import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function ProtectedAdminRoute() {
  const location = useLocation();
  const { isAdmin } = useAdminAuth();

  // This is the frontend gate. It protects the screen, while the backend
  // middleware protects the actual data/API endpoints.
  if (!isAdmin) {
    // Save the route the admin wanted, so login can send them back afterward.
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  // Outlet renders the nested admin routes from AppRouter.jsx.
  return <Outlet />;
}
