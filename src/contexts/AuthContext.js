import React, { createContext, useState } from "react";
import { api } from '../utils/apis';

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(Number(localStorage.getItem('role')));
  const [accountid, setAccountId] = useState(localStorage.getItem('accountid') || "");
  const [keep, setKeep] = useState(localStorage.getItem('keep') === "1");

  const login = async (jwtToken, accountid, role) => {
    setRole(role)
    setToken(jwtToken);
    setAccountId(accountid)
    localStorage.setItem('keep', keep ? 1 : 0)

    if (keep) {
      localStorage.setItem('role', role)
      localStorage.setItem('token', jwtToken)
      localStorage.setItem('accountid', accountid)
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear()
  };

  const value = {
    token,
    role,
    accountid,
    login,
    logout,
    setKeep,
    authedApi: api(token, logout)
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };