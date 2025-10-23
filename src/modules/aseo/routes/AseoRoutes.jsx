import { aseoRoutesList } from '@/routes';
import { AseoDashboardPage, CreateOvertimesPage, GetOvertimesPage, OvertimesPage, ReportsPage, WorkersPage } from '../features';
import { DashboardLayout } from '@/layouts';

export const AseoRoutes = [
  {
    path: aseoRoutesList.aseoDashboard,
    element: <DashboardLayout />,
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
        path: aseoRoutesList.reports,
        element: <ReportsPage />,
      },
    ],
  },
];