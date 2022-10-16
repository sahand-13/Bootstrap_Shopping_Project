import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { User } from "../Constants/localStorageConstant";
const AuthContext = createContext({
  user: {},
  setUser: () => {},
  SignOut: () => {},
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const LocalUser = localStorage.getItem(User);
    if (LocalUser) {
      setUser(JSON.parse(LocalUser));
    }
  }, []);
  const SignOut = () => {
    setUser(null);
    localStorage.removeItem(User);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
