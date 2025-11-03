import { type ReactNode } from 'react';
import { useAuthStore } from '../stores/authStores';
import { Navigate } from 'react-router-dom';


interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleProtectedRoute = ({ children, allowedRoles }: RoleProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;