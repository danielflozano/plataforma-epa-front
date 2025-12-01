import { useAseo } from '@/modules/aseo/context';
import { overtimesService } from '../../overtimes';
import { useEffect, useState } from 'react';

export const useAseoDashboard = () => {
  const { totalRecords, workers } = useAseo();

  const [stats, setStats] = useState();

  useEffect(() => {
    getOvertimesStats();
  }, [])

  const getOvertimesStats = async () => {
    try {
      const response = await overtimesService.getOvertimesStats();
      setStats(response.data);      
    } catch (error) {
      console.error(error);
    }
  };
  
  return {
    // Properties
    stats,
    totalRecords,
    workers,
  };
};
