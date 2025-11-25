import { superadminRoutesList } from '@/routes';
import { SuperadminLayout } from '../layout';
import {
  CreateUsersPage,
  GetUsersPage,
  SuperadminDashboardPage,
  UsersPage,
} from '../features';

export const SuperadminRoutes = [
  {
    path: superadminRoutesList.superadminDashboard,
    element: <SuperadminLayout />,
    children: [
      {
        index: true,
        element: <SuperadminDashboardPage />,
      },
      {
        path: superadminRoutesList.users,
        element: <UsersPage />,
      },
      {
        path: superadminRoutesList.createUsers,
        element: <CreateUsersPage />,
      },
      {
        path: superadminRoutesList.getUsers,
        element: <GetUsersPage />,
      },
    ],
  },
];
