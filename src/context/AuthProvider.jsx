// 📄 src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // You can also use full user info if needed

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
