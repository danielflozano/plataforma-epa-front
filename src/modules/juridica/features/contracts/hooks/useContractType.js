import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contractTypeServices } from '../services';

export const useContractType = () => {
  const [isError, setIsError] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeModal = () => setModal(false);

  const onSubmit = async (createData) => {
    try {
      await contractTypeServices.createContractType(createData);
      setIsError(false);
      setMessage('¡Tipo de Contrato creado con Exito ✅');
      reset();
      setModal(false);
    } catch (error) {
      setIsError(true);
      setMessage('Error al crear el Tipo de Contrato. ❌', error);
    } finally {
      setModal(true);
    }
  };

  return {
    errors,
    isError,
    message,
    modal,

    closeModal,
    handleSubmit,
    onSubmit,
    register,
  };
};
