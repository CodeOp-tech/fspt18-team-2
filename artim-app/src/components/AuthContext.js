import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(""); // Add token state

  const login = (userToken) => {
    setIsLogged(true);
      setToken(userToken); 
      console.log(userToken);
  };

  const logout = () => {
    setIsLogged(false);
    setToken(""); 
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
