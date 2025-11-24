import { DashboardLayout } from '@/layouts';
import { RoleProtectedRoute } from '@/routes/RoleProtectedRoute';
import { adminRoutesList } from '@/routes/list/adminRoutesList';
import { ROLES } from '@/routes/roles';
import { CreateUserPage } from '../features/users/pages/CreateUserPage';
import { Outlet } from 'react-router-dom';

export const AdminRoutes = [
  {
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        element: <RoleProtectedRoute roles={[ROLES.SUPER_ADMIN]} />,
        children: [
          {
            path: adminRoutesList.createUser,
            element: <CreateUserPage />,
          },
        ],
      },
    ],
  },
];
