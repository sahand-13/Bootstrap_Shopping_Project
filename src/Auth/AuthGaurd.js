import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../Constants/localStorageConstant";
import useAuth from "../hooks/useAuth";

const AuthGaurd = ({ children }) => {
  const { user, setUser } = useAuth();
  if (!user) {
    const currentUser = localStorage.getItem(User);
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      return <Navigate to={"/Login"} replace />;
    }
  }
  if (user) {
    const currentUser = localStorage.getItem(User);
    if (!currentUser) {
      setUser(null);
    }
  }
  return <>{children}</>;
};

export default AuthGaurd;
