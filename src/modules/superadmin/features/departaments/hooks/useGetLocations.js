import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { departamentsService } from '../services';

export const useGetLocations = () => {
  const [locations, setLocations] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
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
    getLocations();
  }, []);

  useEffect(() => {
    if (success) {
      getLocations();
      setSuccess(false);
    }
  }, [success]);

  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await departamentsService.getAllLocations();
      console.log(response);
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (data) => {
    try {
      const response = await departamentsService.createLocations(data);
      console.log('sede creada con exito', response?.data?.name);
      setSuccess(true);
      setAlertModal({
        open: true,
        message: `La sede ${response?.data?.name} ha sido registrado con exito`,
        status: 'Sede Creada con Exito',
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

  const handleOpenCreateModal = () => {
    setCreateModal(true);
  };

  const closeModals = () => {
    setCreateModal(false);
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
    createModal,
    errors,
    loading,
    locations,
    updateModal,

    // Methods
    closeAlertModal,
    closeModals,
    handleOpenCreateModal,
    handleSubmit,
    onSubmit,
    register,
  };
};
