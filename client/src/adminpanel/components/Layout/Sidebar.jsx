import {
  LayoutDashboard,
  Boxes,
  FolderTree,
  ShoppingBag,
  Star,
  Users,
  X,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen, collapsed }) {
  // Each item maps one sidebar link to one nested /admin route in AppRouter.jsx.
  const menu = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
    { icon: Boxes, label: "Products", to: "/admin/products" },
    { icon: FolderTree, label: "Categories", to: "/admin/categories" },
    { icon: ShoppingBag, label: "Orders", to: "/admin/orders" },
    { icon: Users, label: "Users", to: "/admin/users" },
    { icon: Star, label: "Reviews", to: "/admin/reviews" },
  ];

  return (
    <>
      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed z-50 top-0 left-0 h-full bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out 
        ${collapsed ? "md:w-20" : "md:w-64"}
        w-64
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* Header */}
        <div className="h-16 md:flex items-center justify-between px-4 hidden">
          <div className="flex items-center gap-2">
            {/* <div className="h-8 w-8 bg-indigo-600 rounded-lg" /> */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0B2545] text-white font-bold">EC</div>
            {!collapsed && (
              <div className="hidden sm:block transition-all duration-400 ease-out ">
                <span className="text-sm font-semibold text-[#0B2545]"></span>
                <div className="text-xs text-gray-400">Modern essentials</div>
                </div>
            )}
          </div>

          {/* Close (mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1 transition-all duration-300 ease-in-out ">
          {menu.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === "/admin"}
              // On mobile, close the drawer after choosing a page.
              onClick={() => setSidebarOpen(false)}
              // NavLink gives us isActive so the current admin page is highlighted.
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm
              ${isActive ? "bg-[#0B2545] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Icon size={20} />
              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
