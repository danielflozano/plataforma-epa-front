import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { contractsServices, contractTypeServices } from '../features/contracts/services';
import { lawyersServices } from '../features/lawyers/services';

const JuridicaContext = createContext({
  contracts: [],
  lawyers: [],
  process: [],
  contractType: [],
  loading: Boolean,
  totalContracts: 0,
  currentPage: 1,
  limit: 15,
  totalPages: 1,

  getAllContracts: () => { },
  getAllLawyers: () => { },
  getAllProcess: () => { },
  getAllContractType: () => { },
  updateLawyers: () => { },
  updateContracts: () => { },
});

export const JuridicaProvider = ({ children }) => {
  const [lawyers, setLawyers] = useState([]);
  const [process, setProcess] = useState([]);
  const [contracts, setContracts] = useState({
    data: [],
    total: 0,
    page: 1,
    limit: 15,
    totalPages: 1
  });
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

  const getAllContracts = async ({ page = 1, limit = 15, filtros = {} } = {}) => {
    setLoading(true);
    try {
      const response = await contractsServices.getAllContracts({ page, limit, filtros });

      if (response && response.data) {
        setContracts({
          data: response.data,
          total: response.total || 0,
          page: response.page || page,
          limit: response.limit || limit,
          totalPages: response.totalPages || 1
        });
        
        return response; // ✅ Retornar la respuesta completa
      } else {
        setContracts({ data: [], total: 0, page: 1, limit, totalPages: 1 });
        return { data: [], total: 0, page: 1, limit, totalPages: 1 };
      }
    } catch (error) {
      console.error(error);
      setContracts({ data: [], total: 0, page: 1, limit, totalPages: 1 });
      return { data: [], total: 0, page: 1, limit, totalPages: 1 };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mejorar updateContracts para aceptar tanto función como objeto
  const updateContracts = (updateData) => {
    if (typeof updateData === 'function') {
      setContracts(prev => {
        const updated = updateData(prev.data);
        return {
          ...prev,
          data: updated
        };
      });
    } else {
      setContracts(prev => ({
        ...prev,
        ...updateData
      }));
    }
  };

  const updateLawyers = (updateData) => {
    setLawyers(updateData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Se elimina el setLoading de aquí para evitar race conditions.
        // La función `getAllContracts` ya gestiona su propio estado de carga.
        await Promise.allSettled([
          getAllContracts(),
          getAllLawyers(),
          getAllProcess(),
          getAllContractType()
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      lawyers,
      process,
      contracts: contracts.data || [],
      totalContracts: contracts.total || 0,
      currentPage: contracts.page || 1,
      limit: contracts.limit || 15,
      totalPages: contracts.totalPages || 1,
      contractType,
      loading,

      getAllLawyers,
      getAllProcess,
      getAllContractType,
      getAllContracts,
      updateLawyers,
      updateContracts
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