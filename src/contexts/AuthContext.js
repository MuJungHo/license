import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(Number(localStorage.getItem('role')));
  const [account, setAccount] = useState(localStorage.getItem('account'));
  const [keep, setKeep] = useState(localStorage.getItem('keep') === "1");

  const login = async (jwtToken, role, account) => {
    setToken(jwtToken);
    setRole(role)
    setAccount(account)
    localStorage.setItem('keep', keep ? 1 : 0)

    if (keep) {
      localStorage.setItem('token', jwtToken)
      localStorage.setItem('role', role)
      localStorage.setItem('account', account)
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear()
  };

  const value = {
    token,
    role,
    account,
    login,
    logout,
    setKeep,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };