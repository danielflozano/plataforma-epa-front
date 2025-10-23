import { aseoRoutesList } from '@/routes';
import { useNavigate } from 'react-router-dom';

export const useOvertimes = () => {
  const navigate = useNavigate();

  const onClickCard = (card) => {
    switch (card) {
      case 'create':
        return navigate(`${aseoRoutesList.createOvertimes}`);
      case 'get':
        return navigate(`${aseoRoutesList.getOvertimes}`);
    }    
  };

  return {
    onClickCard,
  };
};
