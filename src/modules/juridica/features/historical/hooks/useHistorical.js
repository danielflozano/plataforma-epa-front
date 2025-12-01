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
  const [filterValueAnio, setFilterValueAnio] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 15;

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

  const handleSearchAnio = () => {
    setTimeout(async () => {
      if (!filterValueAnio.trim()) {
        getCleanContracts({ page: currentPage, limit: 15 });
        setFilteredContracts(cleanContracts);
        return;
      }

      setLoadingFilter(true);
      try {
        const response = await historicalServices.getContractsByAnio(
          filterValueAnio
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

  const handleSearchName = () => {
    setTimeout(async () => {
      if (!filterValue.trim()) {
        getCleanContracts({ page: currentPage, limit: 15 });
        setFilteredContracts(cleanContracts);
        return;
      }

      setLoadingFilter(true);
      try {
        const response = await historicalServices.getContractsByName(
          filterValue
        );
        setFilteredContracts(response);
      } catch (error) {
        console.error(error);
        setFilteredContracts([]);
      } finally {
        setLoadingFilter(false);
      }
    }, 600);
  };

  const handleSearchType = () => {
    setTimeout(async () => {
      if (!filterValue.trim()) {
        getCleanContracts({ page: currentPage, limit: 15 });
        setFilteredContracts(cleanContracts);
        return;
      }

      setLoadingFilter(true);
      try {
        const response = await historicalServices.getContractsByType(
          filterValue
        );
        setFilteredContracts(response);
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
      handleSearchAnio();
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleReset = () => {
    getCleanContracts();
    setFilterValue('');
  };

  console.log(filteredContracts);

  return {
    //Properties
    anios,
    filterValue,
    filterValueAnio,
    filteredContracts,
    loading,
    loadingFilter,
    modal,
    objetoExpandido,
    currentPage,
    totalPages,
    totalRecords,

    //Methods
    handleKeyDown,
    handleReset,
    handlePageChange,
    handleSearchAnio,
    handleSearchName,
    handleSearchType,
    setObjetoExpandido,
    setFilterValueAnio,
    setFilterValue
  };
};
