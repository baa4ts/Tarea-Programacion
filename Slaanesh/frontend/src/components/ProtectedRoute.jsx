import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const JWT = localStorage.getItem("JWT");

  if (!JWT) {
    return <Navigate to={"/user/login"} replace />;
  }

  return children;
};
