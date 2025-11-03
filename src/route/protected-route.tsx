import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authId = getCookie("auth_id") as string | undefined;
  const isValidAuth = authId && UUID_PATTERN.test(authId);

  if (!isValidAuth) {
    return (
      <Navigate
        to='/auth/login'
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
