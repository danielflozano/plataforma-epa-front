import { Link } from 'react-router-dom';
import { juridicaRoutesList } from '@/routes/list';
import { aseoRoutesList } from '@/routes';

export const SuperAdminDashboardPage = () => {
  console.log('SuperAdminDashboardPage rendered'); 
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Bienvenido, Super Administrador</h1>
      <p className="text-lg text-gray-600 mb-12">Selecciona la sección a la que deseas acceder:</p>
      <div className="flex space-x-8">
        <Link
          to={juridicaRoutesList.juridicaDashboard}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Ir a Jurídica
        </Link>
        <Link
          to={aseoRoutesList.aseoDashboard}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Ir a Aseo
        </Link>
      </div>
    </div>
  );
};
