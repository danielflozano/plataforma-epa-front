import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { authRoutesList } from './list';
import { AdminRoutes, AseoRoutes, AuthRoutes, JuridicaRoutes } from '@/modules';
import { SuperAdminDashboardPage } from '@/modules/dashboard/pages/SuperAdminDashboardPage';
import { DashboardLayout } from '@/layouts'; 

export const AppRouter = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: AuthRoutes,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/superadmin-dashboard',
        element: <DashboardLayout><SuperAdminDashboardPage /></DashboardLayout>, 
      },
      ...AseoRoutes,
      ...JuridicaRoutes,
      ...AdminRoutes,
    ]
  },
  { path: '*', element: <Navigate to={ authRoutesList.login } /> },
]);
