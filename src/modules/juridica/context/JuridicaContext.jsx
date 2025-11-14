import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { contractsServices, contractTypeServices } from '../features/contracts/services';
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
  const [process, setProcess] = useState([]);
  const [contractType, setContractType] = useState([]);
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

  const getAllProcess = async () => {
    try {
      const response = await contractsServices.getAllProcess();
      setProcess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllContractType = async () => {
    try {
      const response = await contractTypeServices.getAllContractType();
      setContractType(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.allSettled([getAllContracts(), getAllLawyers(), getAllProcess(), getAllContractType()]);
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
      contracts,
      lawyers,
      process,
      contractType,
      loading,

      getAllContracts,
      getAllLawyers,
      getAllProcess,
    }),
    [contracts, lawyers, process, contractType, loading]
  );

  return (
    <JuridicaContext.Provider value={contextValue}>
      {children}
    </JuridicaContext.Provider>
  );
};

export const useJuridica = () => useContext(JuridicaContext);
