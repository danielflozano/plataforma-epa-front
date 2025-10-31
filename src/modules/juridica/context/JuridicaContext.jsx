import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { contractsServices } from '../features/contracts/services';

const JuridicaContext = createContext({
  contracts: [],
  getAllContracts: () => {},
});

export const JuridicaProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
//   const [lawyers, setLawyers] = useState([]);

  const getAllContracts = async () => {
    try {
      const response = await contractsServices.getAllContracts();
      setContracts(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.allSettled([getAllContracts()]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(() => ({
    contracts,
    getAllContracts,
  }));

  return (
    <JuridicaContext.Provider value={contextValue}>
      {children}
    </JuridicaContext.Provider>
  );
};

export const useJuridica = () => useContext(JuridicaContext);
