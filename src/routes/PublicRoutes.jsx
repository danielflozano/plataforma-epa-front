import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { aseoRoutesList, juridicaRoutesList, superadminRoutesList } from './list';
import { LoadSpinner } from '@/components';

export const PublicRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <LoadSpinner styles="fixed bg-gray-200/95" />
    );
  }

  const userRole = auth?.user.rol;

  const redirections = {
    AdminAseo: aseoRoutesList.aseoDashboard,
    UsuarioAseo: aseoRoutesList.aseoDashboard,
    AdminJuridica: juridicaRoutesList.juridicaDashboard,
    UsuarioJuridica: juridicaRoutesList.juridicaDashboard,
    SuperAdministrador: superadminRoutesList.superadminDashboard,
  };

  return !auth ? <Outlet /> : <Navigate to={ redirections[userRole] || "/" } replace />;
};
