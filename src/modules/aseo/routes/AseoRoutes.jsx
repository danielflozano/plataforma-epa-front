import { aseoRoutesList } from '@/routes';
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

export const AseoRoutes = [
  {
    path: aseoRoutesList.aseoDashboard,
    element: <AseoLayout />,
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
];
