import { aseoRoutesList } from '@/routes';
import { AseoLayout } from '../layout';
import { AseoRoutes } from './AseoRoutes';

export const GetAseoRoutesFor = (role) => {
  const filteredRoutes = AseoRoutes.filter((route) => {
    if (!route.roles) return true;
    return route.roles.includes(role);
  });

  return [
    {
      path: aseoRoutesList.aseoDashboard,
      element: <AseoLayout />,
      children: filteredRoutes,
    },
  ];
};
