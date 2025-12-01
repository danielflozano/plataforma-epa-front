import { useEffect, useState } from 'react';
import { historicalServices } from '../services';

export const useHistorical = () => {

  const [anios, setAnios] = useState([]);
  const [cleanContracts, setCleanContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [objetoExpandido, setObjetoExpandido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [modal, setModal] = useState(true);
  const [filterValue, setFilterValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 15;

  const closeModal = () => setModal(false);

  useEffect(() => {
    getCleanContracts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setFilteredContracts(cleanContracts);
  }, [cleanContracts]);

  useEffect(() => {
    getAnios();
  }, []);

  console.log(anios);

  const getCleanContracts = async (page) => {
    setLoading(true);
    try {
      const response = await historicalServices.getCleanContracts(page, limit);
      console.log('📦 Contratos desde backend:', response);
      setCleanContracts(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages || 1);
      setTotalRecords(response.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAnios = async () => {
    try {
      const response = await historicalServices.getAnios();
      setAnios(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setTimeout(async () => {
      if (!filterValue.trim()) {
        getCleanContracts({ page: currentPage, limit: 15 });
        setFilteredContracts(cleanContracts);
        return;
      }

      setLoadingFilter(true);
      try {
        const response = await historicalServices.getContractsByAnio(
          filterValue
        );
        setFilteredContracts(response);
        setModal(false);
      } catch (error) {
        console.error(error);
        setFilteredContracts([]);
      } finally {
        setLoadingFilter(false);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  console.log(filteredContracts);
  

  return {
    //Properties
    anios,
    filterValue,
    filteredContracts,
    loading,
    loadingFilter,
    modal,
    objetoExpandido,
    currentPage,
    totalPages,
    totalRecords,

    //Methods
    closeModal,
    handleKeyDown,
    handlePageChange,
    handleSearch,
    setObjetoExpandido,
    setFilterValue,
  };
};
