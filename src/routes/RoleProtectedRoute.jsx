import { useAuth } from '@/context';
import { Navigate, Outlet } from 'react-router-dom';
import { aseoRoutesList, authRoutesList } from './list';

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth) return <Navigate to={authRoutesList.login} replace />;

  const userRole = auth.rol;

  if (allowedRoles.includes(userRole)) return <Outlet />;

  const redirections = {
    AdminAseo: aseoRoutesList.aseoDashboard,
    UsuarioAseo: aseoRoutesList.aseoDashboard,
    // AdminJuridica:
  };
};
