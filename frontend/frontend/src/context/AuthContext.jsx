/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

const readStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => readStoredUser());

  const login = ({ token: nextToken, user: nextUser }) => {
    const safeToken = nextToken || "";
    const safeUser = nextUser || null;

    setToken(safeToken);
    setUser(safeUser);

    if (safeToken) localStorage.setItem(TOKEN_KEY, safeToken);
    else localStorage.removeItem(TOKEN_KEY);

    if (safeUser) localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    else localStorage.removeItem(USER_KEY);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      role: user?.role || null,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
      login,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
