import { JuridicaDashboardPage, CreateContractsPage, ListContractsPage, HistoricalPage } from "../features";
import { JuridicaLayout } from "../layout/JuridicaLayout";
import { juridicaRoutesList } from "@/routes";

export const JuridicaRoutes = () => [
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
            element: <ListContractsPage />,
        },
        {
            path: juridicaRoutesList.create,
            element: <CreateContractsPage />,
        },
        {
            path: juridicaRoutesList.historical,
            element: <HistoricalPage />,
        },
    ],
  },
]

