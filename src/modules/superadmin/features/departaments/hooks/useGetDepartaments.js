import { useEffect, useState } from 'react';
import { departamentsService } from '../services';
import { useForm } from 'react-hook-form';

export const useGetDepartaments = () => {
  const [departaments, setDepartaments] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    status: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getDepartaments();
  }, []);

  useEffect(() => {
    if (success) {
      getDepartaments();
      setSuccess(false);
    }
  }, [success]);

  const getDepartaments = async () => {
    try {
      const response = await departamentsService.getAllDepartaments();
      setDepartaments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await departamentsService.createDepartaments(data);
      console.log('Respuesta del servicio: ', response);
      setSuccess(true);
      setAlertModal({
        open: true,
        message: `El proceso ${response?.data?.nombreProceso} ha sido registrado exitosamente`,
        status: `Proceso Creado con Exito`,
      });
      reset();
    } catch (error) {
      console.error(error);
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const handleOpenUpdateModal = () => {
    setUpdateModal(true);
  }

  const closeModals = () => {
    setUpdateModal(false);
    setAlertModal({
      open: false,
      message: '',
      status: '',
    });
  };

  const closeAlertModal = () => {
    if (alertModal.status === 'Error') {
      setAlertModal({
        open: false,
        message: '',
        status: '',
      });

      return;
    }

    closeModals();
  };

  return {
    // Properties
    alertModal,
    departaments,
    errors,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    handleOpenUpdateModal,
    handleSubmit,
    onSubmit,
    register,
  };
};
