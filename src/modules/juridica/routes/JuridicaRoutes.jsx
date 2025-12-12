import { juridicaRoutesList } from '@/routes';
import {
  JuridicaDashboardPage,
  HistoricalPage,
  ContractsPage,
  CreateContractsPage,
  GetContractsPage,
  LawyersPage,
} from '../features';
import { JuridicaLayout } from '../layout/JuridicaLayout';

export const JuridicaRoutes = [
  {
    path: juridicaRoutesList.juridicaDashboard,
    element: <JuridicaLayout />,
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
];
