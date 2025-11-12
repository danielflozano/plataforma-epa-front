import { useEffect, useState } from 'react';
import { contractsServices, contractTypeServices } from '../services';
import { useForm } from 'react-hook-form';

export const useCreateContracts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [process, setProcess] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    state: '',
  });
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    getAllProcess();
    getAllContractType();
  }, []);

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

  const onSubmit = async (createData) => {
    setLoading(true);
    try {
      await contractsServices.createContracts(createData);
      setAlertModal({
        open: true,
        message: '¡Contrato creado con Exito ✅!',
        state: 'Registro Exitoso',
      });
      reset();
      setModal(false);
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message,
        state: 'Error',
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAlertModal = () => {
    setModal({
      open: false,
      message: '',
      state: '',
    });
    closeModal()
  };

  return {
    // Properties
    alertModal,
    contractType,
    errors,
    handleSubmit,
    loading,
    modal,
    process,
    register,

    // Methods
    onSubmit,
    closeModal,
    closeAlertModal,
    openModal,
  };
};
