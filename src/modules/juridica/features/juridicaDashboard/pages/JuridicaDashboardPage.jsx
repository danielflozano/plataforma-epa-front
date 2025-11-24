import { useNavigate } from 'react-router-dom';
import { GlobalCards } from '@/components';
import { juridicaRoutesList } from '@/routes';
import { NotebookPen, Users, Folders } from 'lucide-react';

// Lista de tarjetas para el dashboard de Jurídica
const juridicaCards = [
  {
    title: 'Contratos',
    path: juridicaRoutesList.contracts,
    Icon: NotebookPen,
  },
  {
    title: 'Abogados',
    path: juridicaRoutesList.lawyers,
    Icon: Users,
  },
  {
    title: 'Histórico',
    path: juridicaRoutesList.historical,
    Icon: Folders,
  },
];

export const JuridicaDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Accesos Directos</h1>
      <div className="flex justify-center">
        <div className="flex justify-center gap-6 flex-wrap">
          {juridicaCards.map((card) => (
            <GlobalCards
              key={card.title}
              title={card.title}
              Icon={card.Icon}
              onClick={() => navigate(card.path)}
              className="bg-white border-1 border-epaColor1 text-center text-epaColor1 font-bold text-2xl h-56 w-80 content-center rounded-2xl cursor-pointer flex flex-col justify-center items-center gap-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};