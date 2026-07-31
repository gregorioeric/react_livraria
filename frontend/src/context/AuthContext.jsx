import { createContext, useContext, useState } from "react";
import { decodeToken } from "../utils/decodeToken";
import { logoutRequest } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null,
  );
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token ? decodeToken(token) : null;
  });

  function login(token) {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    setUser(decodeToken(token));
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated: !!accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
