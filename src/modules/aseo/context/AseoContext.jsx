import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { overtimesService, workersService } from "../features";

const AseoContext = createContext({
  overtimes: [],
  currentPage: null,
  totalPages: null,
  totalRecords: null,
  workers: [],
  loading: false,
  getAllOvertimes: () => {},
  getAllWorkers: () => {},
  handlePageChange: () => {},
});

export const AseoProvider = ({ children }) => {
  const [ overtimes, setOvertimes ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);
  const [ totalRecords, setTotalRecords ] = useState(0);
  const [ workers, setWorkers ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const limit = 15;
  
  const getAllOvertimes = async (page) => {
    try {
      const response = await overtimesService.getAllOvertimes(page, limit);
      setOvertimes(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages || 1);
      setTotalRecords(response.total);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
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
        await Promise.allSettled([getAllOvertimes(currentPage), getAllWorkers()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const contextValue = useMemo(
    () => ({
      currentPage,
      loading,
      overtimes,
      totalPages,
      totalRecords,
      workers,
      getAllOvertimes,
      getAllWorkers,
      handlePageChange,
    }),
    [currentPage, loading, overtimes, totalPages, totalRecords, workers,]
  );

  return <AseoContext.Provider value={contextValue}>{ children }</AseoContext.Provider>
};

export const useAseo = () => useContext(AseoContext);