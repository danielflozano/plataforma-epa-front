import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadSpinner } from '@/components';
import { ROLES } from './roles';
import { juridicaRoutesList, aseoRoutesList } from './list';

export const PublicRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <LoadSpinner styles="fixed bg-gray-200/95" />;
  }

  // Si el usuario ya está autenticado, redirigir según su rol
  if (auth) {
    const userRole = auth.user.rol;
    
    switch (userRole) {
      case ROLES.SUPER_ADMIN:
        return <Navigate to="/superadmin-dashboard" replace />;
        
      case ROLES.ADMIN_JURIDICO:
      case ROLES.USER_JURIDICO:
        return <Navigate to={juridicaRoutesList.juridicaDashboard} replace />;
        
      case ROLES.ADMIN_ASEO:
      case ROLES.USER_ASEO:
        return <Navigate to={aseoRoutesList.aseoDashboard} replace />;
        
      case ROLES.ADMIN_INVENTARIO:
      case ROLES.USER_INVENTARIO:
        return <Navigate to="/inventario/dashboard" replace />;
        
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si no está autenticado, mostrar las rutas públicas (login, etc.)
  return <Outlet />;
};