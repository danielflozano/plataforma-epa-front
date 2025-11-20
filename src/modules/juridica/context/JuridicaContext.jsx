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
  updateLawyers: () => {},
});

export const JuridicaProvider = ({ children }) => {
  const [lawyers, setLawyers] = useState([]);
  const [process, setProcess] = useState([]);
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

  const updateLawyers = (updateData) => {
    setLawyers(updateData);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.allSettled([getAllLawyers(), getAllProcess(), getAllContractType()]);
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
      contractType,
      loading,

      getAllLawyers,
      getAllProcess,
      getAllContractType,
      updateLawyers,
    }),
    [lawyers, process, contractType, loading]
  );

  return (
    <JuridicaContext.Provider value={contextValue}>
      {children}
    </JuridicaContext.Provider>
  );
};

export const useJuridica = () => useContext(JuridicaContext);
