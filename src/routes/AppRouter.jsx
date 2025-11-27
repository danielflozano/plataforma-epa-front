import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AseoRoutes, AuthRoutes, JuridicaRoutes, SuperadminRoutes } from '@/modules';
import {
  authRoutesList,
  ProtectedRoutes,
  PublicRoutes,
  RoleProtectedRoute,
} from '.';
import { ROLES } from '@/constants';

export const AppRouter = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: AuthRoutes,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: (
        <RoleProtectedRoute
          allowedRoles={[
            ROLES.SUPER_ADMIN,
          ]}
        />
      ),
        children: SuperadminRoutes,
      },
      {
        element: (
          <RoleProtectedRoute
            allowedRoles={[
              ROLES.SUPER_ADMIN,
              ROLES.ADMIN_ASEO,
              ROLES.USER_ASEO,
            ]}
          />
        ),
        children: AseoRoutes,
      },
      {
        element: (
          <RoleProtectedRoute
            allowedRoles={[
              ROLES.SUPER_ADMIN,
              ROLES.ADMIN_JURIDICA,
              ROLES.USER_JURIDICA,
            ]}
          />
        ),
        children: JuridicaRoutes,
      },
    ],
  },
  { path: '*', element: <Navigate to={authRoutesList.login} /> },
]);