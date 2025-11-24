import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context';
import { aseoRoutesList, authRoutesList, juridicaRoutesList } from './list';

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth) return <Navigate to={authRoutesList.login} replace />;

  const userRole = auth.user.rol;

  if (allowedRoles.includes(userRole)) return <Outlet />;

  const redirections = {
    AdminAseo: aseoRoutesList.aseoDashboard,
    UsuarioAseo: aseoRoutesList.aseoDashboard,
    AdminJuridica: juridicaRoutesList.juridicaDashboard,
    UsuarioJuridica: juridicaRoutesList.juridicaDashboard,
    SuperAdministrador: aseoRoutesList.aseoDashboard,
  };

  return <Navigate to={redirections[userRole] || "/"} replace />;
};
