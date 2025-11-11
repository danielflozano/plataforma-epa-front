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
  const [modal, setModal] = useState({
    open: false,
    message: '',
    state:''
  });
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
      setModal({
        open: true,
        message: '¡Contrato creado con Exito ✅!',
        state: 'Registro Exitoso'
      });
      reset();
    } catch (error) {
      setModal({
        open: true,
        message: 'Error al crear el Contrato. ❌',
        state: 'Error'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    // Properties
    contractType,
    errors,
    handleSubmit,
    loading,
    modal,
    process,
    register,

    // Methods
    onSubmit,
    closeModal
  };
};
