import { useAuth } from "@/context";
import { Navigate, Outlet } from "react-router-dom";

export const RoleProtectedRoute = ({ roles }) => {
  const { auth } = useAuth();

  if (!auth?.user?.rol) {
    return <Navigate to="/login" replace />;
  }

  const isAuthorized = roles.includes(auth.user.rol);

  return isAuthorized ? <Outlet /> : <Navigate to="/superadmin-dashboard" replace />;
};