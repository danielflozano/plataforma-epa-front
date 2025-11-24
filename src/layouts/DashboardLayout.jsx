import { Link, Outlet } from 'react-router-dom';
import { UserCheck, House, ClipboardClock, Users, NotebookPen, UserPlus, Folders } from 'lucide-react';
import { GlobalButton } from '@/components';
import { useAuth } from '@/context/AuthContext';
import logo from '../assets/logoepa.png';
import { adminRoutesList, aseoRoutesList } from '@/routes';
import { ROLES } from '@/routes/roles';
import juridicaRoutesList from '@/routes/list/juridicaRoutesList';

const currentYear = new Date().getFullYear();

export const DashboardLayout = () => {
  const { auth, logout } = useAuth();

  const showAseoLinks = auth.user.rol === ROLES.ADMIN_ASEO ||
    auth.user.rol === ROLES.USER_ASEO ||
    auth.user.rol === ROLES.SUPER_ADMIN;

  const showJuridicaLinks = auth.user.rol === ROLES.ADMIN_JURIDICO ||
    auth.user.rol === ROLES.USER_JURIDICO ||
    auth.user.rol === ROLES.SUPER_ADMIN;

  const showAdminLinks = auth.user.rol === ROLES.SUPER_ADMIN;

  return (
    <div className="flex h-screen">
      <div className="bg-gray-50 w-1/6 flex flex-col p-4 border-r border-gray-300">
        <div className="space-y-4 pb-10 text-center">
          <img src={logo} alt="Logo EPA" />
          <h3 className="text-epaColor1 text-lg font-bold">Menu Principal</h3>
          <h4 className="font-medium">Version 1.0</h4>
        </div>
        <nav className="space-y-4 pb-10">
          {/* Admin Links */}
          {showAdminLinks && (
            <>
              <div className="text-epaColor1 font-medium">
                <Link
                  className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                  to={adminRoutesList.createUser}
                >
                  <UserPlus size={20} />
                  Crear Usuario
                </Link>
              </div>
            </>
          )}

          {/* Aseo Links */}
          {showAseoLinks && (
            <>
              <div className="text-epaColor1 font-medium">
                <Link
                  className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                  to={aseoRoutesList.aseoDashboard}
                >
                  <House size={20} />
                  Inicio Aseo
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
                  Reportes Aseo
                </Link>
              </div>
            </>
          )}

          {/* Juridica Links */}
          {showJuridicaLinks && (
            <>
              <div className="text-epaColor1 font-medium">
                <Link
                  className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                  to={juridicaRoutesList.juridicaDashboard}
                >
                  <House size={20} />
                  Inicio Jurídica
                </Link>
              </div>
              <div className="text-epaColor1 font-medium">
                <Link
                  className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                  to={juridicaRoutesList.contracts}
                >
                  <NotebookPen size={20} />
                  Contratos
                </Link>
              </div>
              <div className="text-epaColor1 font-medium">
                <Link
                  className="flex gap-2 items-center transition-transform duration-300 hover:translate-x-4"
                  to={juridicaRoutesList.historical}
                >
                  <Folders size={20} />
                  Histórico
                </Link>
              </div>
            </>
          )}
        </nav>
        <GlobalButton variant="danger" onClick={logout} className="p-1.5 w-3/4 block mx-auto">
          Cerrar Sesión
        </GlobalButton>
      </div>

      <div className="flex flex-col w-full">
        <header className="bg-epaColor1 grid grid-cols-3 px-6 py-6">
          <div></div>
          <h2 className="text-white text-center font-bold text-3xl">
            Plataforma Horas Extra - EPA
          </h2>
          <div className="flex text-white text-sm items-center justify-end gap-2">
            <UserCheck />
            <div className="text-right">
              {auth.user.name} <br /> {auth.user.rol}
            </div>
          </div>
        </header>

        <main className="relative bg-gray-200 flex-1 overflow-auto p-4">
          <Outlet />
        </main>

        <footer className="bg-epaColor1 text-white flex justify-between items-center p-4">
          <div>© {currentYear} Empresas Publicas de Armenia E.S.P.</div>
          <div>Plataforma de Horas Extra Aseo - EPA</div>
          <div>
            Contacto de Soporte:{' '}
            <a href="mailto:redes.tic@epa.gov.co">redes.tic@epa.gov.co</a>
            <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
