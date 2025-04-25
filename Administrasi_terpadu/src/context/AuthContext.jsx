import React, { createContext, useState, useContext, useEffect } from 'react';


export  const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      setIsAuthenticated(true); 
    }
    setLoading(false);
  }, []);
  
  const login = (token, user) => {
    setIsAuthenticated(true);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
