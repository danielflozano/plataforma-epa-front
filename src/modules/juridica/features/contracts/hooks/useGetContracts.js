import { useEffect, useState } from 'react';
import { contractsServices } from '../services';
import { useForm } from 'react-hook-form';
import { useJuridica } from '@/modules/juridica/context';

export const useGetContracts = () => {
  const { 
    lawyers, 
    process, 
    contractType, 
    contracts,
    totalContracts,
    currentPage,
    totalPages: contextTotalPages,
    getAllContracts, 
    loading, 
    updateContracts 
  } = useJuridica();

  const [hoverEye, setHoverEye] = useState(false);
  const [detailsContractModal, setDetailsContractModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedContractId, setSelectedContractId] = useState('');
  const [selectedConsecutive, setSelectedConsecutive] = useState('');
  const [selectedContractType, setSelectedContractType] = useState('');
  const [summaries, setSummaries] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [activeFilters, setActiveFilters] = useState({}); // ✅ Estado para filtros activos

  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    state: '',
  });

  const [page, setPage] = useState(1);
  const limit = 15;
  const [totalPages, setTotalPages] = useState(1);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // 🔥 FUNCIÓN PARA CARGAR CONTRATOS CON FILTROS
  const loadContracts = async (pageNumber = 1, filtros = {}) => {
    try {
      await getAllContracts({ 
        page: pageNumber, 
        limit,
        filtros 
      });
      // La actualización de totalPages se maneja a través del contexto y su useEffect.
    } catch (error) {
      console.log(error);
      setTotalPages(1);
    }
  };

  // ✅ FUNCIÓN PARA BUSCAR (activada por Enter o botón)
  const handleSearch = () => {
    if (!filterValue.trim()) {
      // Si está vacío, limpiar filtros
      setActiveFilters({});
      setPage(1);
      loadContracts(1, {});
      return;
    }

    // Aplicar filtro de búsqueda general
    const filtros = {
      search: filterValue.trim()
    };

    setActiveFilters(filtros);
    setPage(1);
    loadContracts(1, filtros);
  };

  // ✅ FUNCIÓN PARA MANEJAR ENTER
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 👉 CARGAR CONTRATOS AL CAMBIAR DE PÁGINA
  useEffect(() => {
    loadContracts(page, activeFilters);
  }, [page]);

  // 👉 CARGAR CONTRATOS AL MONTAR EL COMPONENTE
  useEffect(() => {
    getContractSummaries();
  }, []);

  useEffect(() => {
    setTotalPages(contextTotalPages || 1);
  }, [contextTotalPages]);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const onSubmitUpdateContract = async (updateData) => {
    try {
      await contractsServices.updateContracts(selectedContractId, updateData);

      setAlertModal({
        open: true,
        message: 'El contrato ha sido actualizado con Exito✅',
        state: 'Contrato Actualizado',
      });

      loadContracts(page, activeFilters);

    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al actualizar el contrato. ❌',
        state: 'Error',
      });
    }
  };

  const openEye = (id) => setHoverEye(id);

  const openDetailsContractModal = (id) => {
    const selectedContract = contracts.find((c) => c._id === id);
    setSelectedContract(selectedContract);
    setDetailsContractModal(true);
  };

  const closeModals = () => {
    setDetailsContractModal(false);
    setUpdateModal(false);
    setConfirmModal(false);
    setAlertModal({ open: false, message: '', status: '' });
  };

  const openUpdateModal = (id) => {
    setSelectedContractId(id);
    const selectedContract = contracts.find((c) => c._id === id);

    const formatDate = (dateString) => dateString?.split('T')[0] || '';

    if (selectedContract) {
      setSelectedConsecutive(selectedContract.consecutivo);
      setSelectedContractType(selectedContract.tipoContrato.tipoContrato);
      reset({
        identificacionOnit: selectedContract.identificacionOnit || '',
        NombreContratista: selectedContract.NombreContratista || '',
        TelefonoContratista: selectedContract.TelefonoContratista || '',
        proceso: selectedContract.proceso._id,
        CorreoDependencia: selectedContract.CorreoDependencia || '',
        tipoContrato: selectedContract.tipoContrato._id || '',
        AbogadoAsignado: selectedContract.AbogadoAsignado._id || '',
        objeto: selectedContract.objeto || '',
        ValorContrato: selectedContract.ValorContrato || '',
        FechaInicio: formatDate(selectedContract.FechaInicio),
        FechaFinalizacion: formatDate(selectedContract.FechaFinalizacion),
      });
    }

    setUpdateModal(true);
  };

  const openConfirmModal = (id) => {
    setSelectedContractId(id);
    const selectedContract = contracts.find((c) => c._id === id);
    setSelectedContract(selectedContract);
    setConfirmModal(true);
  };

  const handleOverride = async () => {
    try {
      await contractsServices.overrideContracts(selectedContractId);
      
      setAlertModal({
        open: true,
        message: 'El contrato ha sido anulado con Exito✅',
        state: 'Contrato Anulado'
      });

      updateContracts((prevContracts) =>
        prevContracts.map((item) =>
          item._id === selectedContractId 
            ? { ...item, EstadoContrato: 'Anulado' } 
            : item
        )
      );

      closeModals();

    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al anular el contrato. ❌',
        state: 'Error',
      });
    }
  };

  const getContractSummaries = async () => {
    try {
      const response = await contractsServices.getContractSummaries();
      setSummaries(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    alertModal,
    confirmModal,
    contracts,
    contractType,
    detailsContractModal,
    errors,
    filterValue,
    hoverEye,
    lawyers,
    loading,
    process,
    selectedConsecutive,
    selectedContract,
    selectedContractType,
    summaries,
    updateModal,
    page,
    totalPages,
    changePage,
    closeModals,
    handleKeyDown,      
    handleOverride,
    handleSearch,      
    handleSubmit,
    onSubmitUpdateContract,
    openConfirmModal,
    openDetailsContractModal,
    openEye,
    openUpdateModal,
    register,
    setFilterValue,
  };
};