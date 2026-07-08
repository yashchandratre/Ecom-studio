export function getStoredUser() {
  try {
    // localStorage stores text only, so we parse the saved JSON user object.
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    // If saved JSON is broken, fail safely and treat the user as logged out.
    return null;
  }
}

export function isAdminSignedIn() {
  // A valid-looking admin session needs both a token and user.isAdmin === true.
  const token = localStorage.getItem("token");
  const user = getStoredUser();
  return Boolean(token && user?.isAdmin);
}

export function saveSession(token, user) {
  // Token is used for API authorization. User is used for UI checks and display.
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  // Logging out clears both values so protected admin routes redirect to login.
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
