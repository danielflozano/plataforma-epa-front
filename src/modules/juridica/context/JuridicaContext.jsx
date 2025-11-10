import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { contractsServices } from '../features/contracts/services';
import { lawyersServices } from '../features/lawyers/services';

const JuridicaContext = createContext({
  contracts: [],
  lawyers: [],
  process: [],
  getAllContracts: () => {},
  getAllLawyers: () => {},
  getAllProcess: () => {},
});

export const JuridicaProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllContracts = async () => {
    try {
      const response = await contractsServices.getAllContracts();
      setContracts(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAllLawyers = async () => {
    try {
      const response = await lawyersServices.getAllLawyers();
      setLawyers(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.allSettled([getAllContracts(), getAllLawyers()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(() => ({
    contracts,
    lawyers,
    loading,
    
    getAllContracts,
    getAllLawyers,
  }), [contracts, lawyers, loading]);

  return (
    <JuridicaContext.Provider value={contextValue}>
      {children}
    </JuridicaContext.Provider>
  );
};

export const useJuridica = () => useContext(JuridicaContext);
