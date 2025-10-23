import { GlobalCards } from '@/components';
import { useOvertimes } from '../hooks/useOvertimes';

export const OvertimesPage = () => {

  const { onClickCard } = useOvertimes();
  
  return (
    <div className="grid grid-cols-2 gap-10 p-10 h-full items-center">
      <GlobalCards
        title="Crear Horas Extra"
        onClick={() => onClickCard('create')}
      />
      <GlobalCards
        title="Listar Horas Extra"
        onClick={() => onClickCard('get')}
      />
    </div>
  );
};
