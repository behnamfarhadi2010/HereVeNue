import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    const storedUserType = localStorage.getItem("userType");

    if (authUser) {
      setCurrentUser(authUser);
      setUserType(storedUserType);
    }
  }, []);

  const login = (username, type) => {
    localStorage.setItem("authUser", username);
    localStorage.setItem("userType", type);
    setCurrentUser(username);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("userType");
    setCurrentUser(null);
    setUserType(null);
  };

  const value = {
    currentUser,
    userType,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
