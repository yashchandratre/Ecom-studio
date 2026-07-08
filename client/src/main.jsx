import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import AppRouter from "./AppRouter";
import CartDrawer from "./components/pages/CartDrawer";

import { CartProvider } from "./components/contexts/CartContext";
import { WishlistProvider } from "./components/contexts/WishlistContext";
import { ThemeProvider } from "./adminpanel/context/ThemeContext";
import { AdminAuthProvider } from "./adminpanel/context/AdminAuthContext";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {/* AdminAuthProvider makes token/user state available to admin login,
            route protection, and the admin header logout button. */}
        <AdminAuthProvider>
          <CartProvider>
            <WishlistProvider>
              {/* AdminAuthProvider stores the logged-in admin in Context for all admin pages. */}
              <AppRouter />

              {/* Global UI */}
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </AdminAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
