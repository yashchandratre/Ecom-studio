import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
  // sidebarOpen controls the mobile drawer. collapsed controls desktop width.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
      />

      <div
        className={`transition-all duration-300
        ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        <Header
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        {/* Nested admin pages are rendered here through Outlet from React Router. */}
        <main className="p-4 md:p-6">{children || <Outlet />}</main>
      </div>
    </div>
  );
}
