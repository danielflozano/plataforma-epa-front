import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { contractsServices, contractTypeServices } from '../features/contracts/services';
import { lawyersServices } from '../features/lawyers/services';

const JuridicaContext = createContext({
  contracts: [],
  lawyers: [],
  process: [],
  contractType: [],
  loading: Boolean,

  getAllContracts: () => {},
  getAllLawyers: () => {},
  getAllProcess: () => {},
  getAllContractType: () => {},
  updateLawyers: () => {},
});

export const JuridicaProvider = ({ children }) => {
  const [lawyers, setLawyers] = useState([]);
  const [process, setProcess] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [loading, setLoading] = useState(false);


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

  const getAllContracts = async (filters) => {
    setLoading(true);
    try {
      const response = await contractsServices.getAllContracts(filters);
      console.log('📦 Contratos desde backend:', response);
      setContracts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateContracts = (updateData) => {
    setContracts(updateData);
  };

  const updateLawyers = (updateData) => {
    setLawyers(updateData);
  }

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
      lawyers,
      process,
      contracts,
      contractType,
      loading,

      getAllLawyers,
      getAllProcess,
      getAllContractType,
      getAllContracts,
      updateLawyers,
      updateContracts,
    }),
    [lawyers, process, contracts, contractType, loading]
  );

  return (
    <JuridicaContext.Provider value={contextValue}>
      {children}
    </JuridicaContext.Provider>
  );
};

export const useJuridica = () => useContext(JuridicaContext);
