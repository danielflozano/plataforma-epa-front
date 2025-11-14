import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { authRoutesList } from './list';
import { LoadSpinner } from '@/components';

export const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <LoadSpinner styles="fixed bg-gray-200/95" />
    );
  }

  return auth ? <Outlet /> : <Navigate to={ authRoutesList.login } replace />;
};
