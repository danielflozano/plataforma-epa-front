import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { authRoutesList } from './list';
import { AseoRoutes, AuthRoutes } from '@/modules';

export const AppRouter = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: AuthRoutes,
  },
  {
    element: <ProtectedRoutes />,
    children: AseoRoutes,
  },
  { path: '*', element: <Navigate to={ authRoutesList.login } /> },
]);
