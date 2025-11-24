import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context';
import { DashboardLayout } from '@/layouts';
import {
  JuridicaDashboardPage,
  HistoricalPage,
  ContractsPage,
  CreateContractsPage,
  GetContractsPage,
  LawyersPage,
} from '../features';
import { JuridicaLayout } from '../layout/JuridicaLayout';
import { juridicaRoutesList } from '@/routes';
import { ROLES } from '@/routes/roles';
import { RoleProtectedRoute } from '@/routes/RoleProtectedRoute';

const JuridicaModuleLayout = () => {
  const { auth } = useAuth();

  if (auth.user.rol === ROLES.SUPER_ADMIN) {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
  }

  return <JuridicaLayout />;
};

export const JuridicaRoutes = [
  {
    path: juridicaRoutesList.juridicaDashboard,
    element: <JuridicaModuleLayout />,
    children: [
      {
        element: <RoleProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN_JURIDICO, ROLES.USER_JURIDICO]} />,
        children: [
          {
            index: true,
            element: <JuridicaDashboardPage />,
          },
          {
            path: juridicaRoutesList.contracts,
            element: <ContractsPage />,
          },
          {
            path: juridicaRoutesList.createContracts,
            element: <CreateContractsPage />,
          },
          {
            path: juridicaRoutesList.listContracts,
            element: <GetContractsPage />,
          },
          {
            path: juridicaRoutesList.lawyers,
            element: <LawyersPage />,
          },
          {
            path: juridicaRoutesList.historical,
            element: <HistoricalPage />,
          },
        ],
      },
    ],
  },
];
