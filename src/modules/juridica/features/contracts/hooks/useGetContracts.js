import { useEffect, useState } from 'react';
import { contractsServices } from '../services';
import { useForm } from 'react-hook-form';
import { useJuridica } from '@/modules/juridica/context';

export const useGetContracts = () => {
  const { lawyers, process, contractType } = useJuridica();

  const [contracts, setContracts] = useState([]);
  const [hoverEye, setHoverEye] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedContractId, setSelectedContractId] = useState('');
  const [selectedConsecutive, setSelectedConsecutive] = useState('');
  const [selectedContractType, setSelectedContractType] = useState('');
  const [summaries, setSummaries] = useState('')
  const [loading, setLoading] = useState(false);
  const [detailsContractModal, setDetailsContractModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    state: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllContracts(), getContractSummaries();
  }, [])

  const getAllContracts = async () => {
      setLoading(true);
      try {
        const response = await contractsServices.getAllContracts();
        console.log('📦 Contratos desde backend:', response);
        setContracts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const updateContracts = (updateData) => {
    setContracts(updateData)
  }

  const onSubmitUpdateContract = async (updateData) => {
    try {
      await contractsServices.updateContracts(
        selectedContractId,
        updateData
      );
      setAlertModal({
        open: true,
        message: 'El contrato ha sido actualizado con Exito✅',
        state: 'Contrato Actualizado'
      })
      updateContracts((prev) =>
        prev.map((item) =>
          item._id === selectedContractId ? {...item, ...updateData, EstadoContrato: "Anulado" } : item
        )
      )
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al actualizar el contrato. ❌',
        state: 'Error',
      });
    } 
  }

  const openEye = (id) => {
    setHoverEye(id);
  };

  const openDetailsContractModal = (id) => {
    const selectedContract = contracts.find((c) => c._id === id);

    setSelectedContract(selectedContract);
    setDetailsContractModal(true);
  };

  const closeModals = () => {
    setDetailsContractModal(false);
    setUpdateModal(false);
    setConfirmModal(false);
    setAlertModal({
      open: false,
      message: '',
      status: '',
    });
  };

  const openUpdateModal = (id) => {
    setSelectedContractId(id)
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
    setSelectedContractId(id)
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
      })
      updateContracts((prev) => 
        prev.map(item =>
          item._id === selectedContractId ? {...item, EstadoContrato: "Anulado"} : item
        )
      )
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message || 'Error al anular el contrato. ❌',
        state: 'Error'
      })
    }
  }


  // Cards
  const getContractSummaries = async () => {
      try {
        const response = await contractsServices.getContractSummaries();
        setSummaries(response);
      } catch (error) {
        console.log(error);
      }
    };

  return {
    //Properties
    alertModal,
    confirmModal,
    contracts,
    contractType,
    detailsContractModal,
    errors,
    hoverEye,
    lawyers,
    loading,
    process,
    selectedConsecutive,
    selectedContract,
    selectedContractType,
    summaries,
    updateModal,

    //Methods
    closeModals,
    handleOverride,
    handleSubmit,
    onSubmitUpdateContract,
    openConfirmModal,
    openDetailsContractModal,
    openEye,
    openUpdateModal,
    register,
    updateContracts,
  };
};
