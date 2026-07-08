import React, { createContext, useContext, useMemo, useState } from "react";
import { clearSession, getStoredUser, saveSession } from "../auth/adminAuth";

// Context gives all admin components access to the same auth state without
// passing props through AdminLayout, Header, pages, and route guards.
const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  // Keep the current user in React state so the admin UI updates immediately
  // after login/logout, while localStorage keeps the session after refresh.
  const [adminUser, setAdminUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const signIn = (newToken, user) => {
    // Save to localStorage for refresh, then update Context for instant UI change.
    saveSession(newToken, user);
    setToken(newToken);
    setAdminUser(user);
  };

  const signOut = () => {
    // Clear storage and Context together so the route guard reacts immediately.
    clearSession();
    setToken(null);
    setAdminUser(null);
  };

  const value = useMemo(
    () => ({
      adminUser,
      token,
      // The frontend guard uses this. Backend still checks isAdmin again.
      isAdmin: Boolean(token && adminUser?.isAdmin),
      signIn,
      signOut,
    }),
    [adminUser, token]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    // Helpful developer error if someone uses the hook outside main.jsx provider.
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }

  return context;
}
