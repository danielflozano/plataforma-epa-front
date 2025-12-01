import { Link, Outlet } from 'react-router-dom';
import {
  ClipboardClock,
  House,
  NotebookPen,
  UserCheck,
  Users,
  LogOut,
  UserStar,
} from 'lucide-react';
import { useAuth } from '@/context';
import { GlobalButton, LoadSpinner } from '@/components';
import { aseoRoutesList, superadminRoutesList } from '@/routes';
import logo from '@/assets/logoepa.png';
import { AseoProvider, useAseo } from '../context';

const currentYear = new Date().getFullYear();

export const AseoLayout = () => {
  const { auth, logout } = useAuth();
  const { initialLoading } = useAseo();

  if (initialLoading) {
    return <LoadSpinner styles="fixed bg-gray-200/95" />;
  }

  return (
    <AseoProvider>
      <div className="flex h-screen">
        <div className="bg-gray-50 w-1/6 flex flex-col p-4 border-r border-gray-300">
          <div className="space-y-4 pb-10 text-center">
            <img src={logo} alt="Logo EPA" />
            <h3 className="text-epaColor1 text-lg font-bold">Menu Principal</h3>
            <h4 className="font-medium">Version 2.0</h4>
          </div>
          <nav className="space-y-4 pb-10">
            <div className="text-epaColor1 font-medium">
              <Link
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                to={aseoRoutesList.aseoDashboard}
              >
                <House size={20} />
                Inicio
              </Link>
            </div>
            <div className="text-epaColor1 font-medium">
              <Link
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                to={aseoRoutesList.overtimes}
              >
                <ClipboardClock size={20} />
                Horas Extra
              </Link>
            </div>
            <div className="text-epaColor1 font-medium">
              <Link
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                to={aseoRoutesList.workers}
              >
                <Users size={20} />
                Funcionarios
              </Link>
            </div>
            <div className="text-epaColor1 font-medium">
              <Link
                className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                to={aseoRoutesList.reports}
              >
                <NotebookPen size={20} />
                Reportes
              </Link>
            </div>
          </nav>
          <GlobalButton
            variant="danger"
            onClick={logout}
            className="flex justify-center p-1.5 w-38 mx-auto"
          >
            <LogOut className="mr-2" />
            Cerrar Sesión
          </GlobalButton>
        </div>

        <div className="flex flex-col w-full">
          <header className="bg-epaColor1 flex p-6">
            <div className='w-2/10'></div>
            <h2 className="w-full text-white text-center font-bold text-3xl">
              Plataforma EPA - Modulo Aseo
            </h2>
            {auth.user.rol === 'SuperAdministrador' && (
              <div className="w-2/10 flex text-white text-sm items-center justify-end gap-2">
                <UserStar />
                <div className="text-right">
                  <p className="px-2">{auth.user.name}</p>
                  <Link to={superadminRoutesList.superadminDashboard}>
                    <p className="bg-white px-2 text-epaColor1 font-semibold underline rounded-sm">
                      {auth.user.rol}
                    </p>
                  </Link>
                </div>
              </div>
            )}
            {auth.user.rol != 'SuperAdministrador' && (
              <div className="w-2/10 flex text-white text-sm items-center justify-end gap-2">
                <UserCheck />
                <div className="text-right">
                  {auth.user.name} <br /> {auth.user.rol}
                </div>
              </div>
            )}
          </header>

          <main className="relative bg-gray-200 flex-1 overflow-auto p-4">
            <Outlet />
          </main>

          <footer className="bg-epaColor1 text-white flex justify-between items-center p-4">
            <div>© {currentYear} Empresas Publicas de Armenia E.S.P.</div>
            <div>Plataforma de Horas Extra Aseo - EPA</div>
            <div>
              Contacto de Soporte:{' '}
              <a href="mailto:redes.tic@epa.gov.co">redes.tic&#64;epa.gov.co</a>
              <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
            </div>
          </footer>
        </div>
      </div>
    </AseoProvider>
  );
};
