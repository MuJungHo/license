import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [keep, setKeep] = useState(localStorage.getItem('keep') === "1");

  const login = async (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('keep', keep ? 1 : 0)

    if (keep) {
      localStorage.setItem('token', jwtToken)
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear()
  };

  const value = {
    token,
    login,
    logout,
    setKeep,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };