import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { overtimesService, workersService } from "../features";

const AseoContext = createContext({
  overtimes: [],
  workers: [],
  loading: false,
  getAllOvertimes: () => {},
  getAllWorkers: () => {},
});

export const AseoProvider = ({ children }) => {
  const [ overtimes, setOvertimes ] = useState([]);
  const [ workers, setWorkers ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  
  const getAllOvertimes = async () => {
    try {
      const response = await overtimesService.getAllOvertimes();
      setOvertimes(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAllWorkers = async () => {
    try {
      const response = await workersService.getAllWorkers();
      setWorkers(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.allSettled([getAllOvertimes(), getAllWorkers()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      overtimes,
      workers,
      loading,
      getAllOvertimes,
      getAllWorkers,
    }),
    [overtimes, workers, loading]
  );

  return <AseoContext.Provider value={contextValue}>{ children }</AseoContext.Provider>
};

export const useAseo = () => useContext(AseoContext);