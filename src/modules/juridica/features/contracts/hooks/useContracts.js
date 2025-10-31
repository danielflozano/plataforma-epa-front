import { juridicaRoutesList } from '@/routes';
import { useNavigate } from 'react-router-dom';

export const useContracts = () => {
  const navigate = useNavigate();

  const onClickCard = (card) => {
    switch (card) {
      case 'create':
        return navigate(`${juridicaRoutesList.createContracts}`);
      case 'get':
        return navigate(`${juridicaRoutesList.listContracts}`);
    }
  };
  
  return {
    onClickCard,
  };
};
