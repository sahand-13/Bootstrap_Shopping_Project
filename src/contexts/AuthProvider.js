import React, { createContext } from "react";
import { useState } from "react";
import { User } from "../Constants/localStorageConstant";
const AuthContext = createContext({ user: {}, setUser: () => {} });
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
