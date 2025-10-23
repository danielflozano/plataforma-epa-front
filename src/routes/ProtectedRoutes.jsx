import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { authRoutesList } from './list';

export const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-editColor-3"></div>
      </div>
    );
  }

  return auth ? <Outlet /> : <Navigate to={ authRoutesList.login } replace />;
};
