import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";

export default function ProtectedRoues({ children }) {
  const { user } = AuthContext();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
