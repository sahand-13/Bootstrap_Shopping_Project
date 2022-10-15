import React from "react";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  debugger;
  return <div className="text-white">{user?.FullName}</div>;
};

export default UserProfile;
