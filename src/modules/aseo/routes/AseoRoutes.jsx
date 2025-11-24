import { Outlet } from 'react-router-dom';
import { aseoRoutesList } from '@/routes';
import { ROLES } from '@/routes/roles';
import { useAuth } from '@/context';
import { DashboardLayout } from '@/layouts';
import {
  AseoDashboardPage,
  CreateOvertimesPage,
  CreateWorkersPage,
  GetOvertimesPage,
  GetWorkersPage,
  OvertimesPage,
  ReportsPage,
  WorkersPage,
} from '../features';
import { AseoLayout } from '../aseoLayout';
import { RoleProtectedRoute } from '@/routes/RoleProtectedRoute';
import { AseoProvider } from '../context';

const AseoModuleLayout = () => {
  const { auth } = useAuth();

  if (auth.user.rol === ROLES.SUPER_ADMIN) {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
  }

  return <AseoLayout />;
};

export const AseoRoutes = [
  {
    path: aseoRoutesList.aseoDashboard,
    element: (
      <AseoProvider>
        <AseoModuleLayout />
      </AseoProvider>
    ),
    children: [
      {
        element: <RoleProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN_ASEO, ROLES.USER_ASEO]} />,
        children: [
          {
            index: true,
            element: <AseoDashboardPage />,
          },
          {
            path: aseoRoutesList.overtimes,
            element: <OvertimesPage />,
          },
          {
            path: aseoRoutesList.createOvertimes,
            element: <CreateOvertimesPage />,
          },
          {
            path: aseoRoutesList.getOvertimes,
            element: <GetOvertimesPage />,
          },
          {
            path: aseoRoutesList.workers,
            element: <WorkersPage />,
          },
          {
            path: aseoRoutesList.createWorkers,
            element: <CreateWorkersPage />,
          },
          {
            path: aseoRoutesList.getWorkers,
            element: <GetWorkersPage />
          },
          {
            path: aseoRoutesList.reports,
            element: <ReportsPage />,
          },
        ],
      },
    ],
  },
];
