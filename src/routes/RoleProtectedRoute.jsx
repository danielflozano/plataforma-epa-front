import { useAuth } from "@/context"

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
}