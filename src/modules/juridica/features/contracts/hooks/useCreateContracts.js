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
  const [isError, setIsError] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProcess();
    getAllContractType();
  }, []);

  const closeModal = () => setModal(false);

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
      setContractType(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (createData) => {
    setLoading(true);
    try {
      await contractsServices.createContracts(createData);
      setIsError(false);
      setMessage('¡Contrato creado con Exito ✅');
      reset();
      setModal(false);
    } catch (error) {
      setIsError(true);
      setMessage('Error al crear el Contrato. ❌', error);
    } finally {
      setModal(true);
      setLoading(false);
    }
  };

  return {
    // Properties
    contractType,
    errors,
    handleSubmit,
    isError,
    loading,
    message,
    modal,
    process,
    register,

    // Methods
    onSubmit,
    closeModal
  };
};
