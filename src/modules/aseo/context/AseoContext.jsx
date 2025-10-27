import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { workersService } from "../features";

const AseoContext = createContext({
  workers: [],
});

export const AseoProvider = ({ children }) => {
  const [ workers, setWorkers ] = useState([]);

  useEffect(() => {
    getWorkers();
  }, [])

  const getWorkers = async () => {
    try {
      const response = await workersService.getAllWorkers();
      setWorkers(response.data);
    } catch (error) {
      console.log(error);    
    }
  };

  const contextValue = useMemo(
    () => ({
      workers,
    }),
    [workers]
  );

  return <AseoContext.Provider value={contextValue}>{ children }</AseoContext.Provider>
};

export const useAseo = () => useContext(AseoContext);