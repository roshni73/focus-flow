import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { needsRoleSelection, user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (needsRoleSelection) {
    return <Navigate to="/role-selection" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;