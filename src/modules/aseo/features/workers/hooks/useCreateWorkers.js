import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { workersService } from '../services';
import { useAseo } from '@/modules/aseo/context';

const tipoOperario = ['Planta', 'Temporal'];
export const useCreateWorkers = () => {
  const { getAllWorkers } = useAseo();
  const [jobPositions, setJobPositions] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    status: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: registerJobPosition,
    handleSubmit: handleSubmitJobPosition,
    reset: resetJobPosition,
    formState: {errors: jobPositionErrors},
  } = useForm();

  useEffect(() => {
    getJobPositions();
  }, []);

  const getJobPositions = async () => {
    try {
      const response = await workersService.getAllJobPositions();
      setJobPositions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await workersService.createWorker(data);
      setAlertModal({
        open: true,
        message: response.message,
        status: response.success ? 'Funcionario Registrado' : 'Error',
      });
      getAllWorkers();
      reset();
    } catch (error) {
      console.error(error)
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const onSubmitJobPosition = async (data) => {
    try {
      const response = await workersService.createJobPosition(data);
      setAlertModal({
        open: true,
        message: response.message,
        status: 'Cargo Creado con Exito',
      });
      getJobPositions();
      resetJobPosition();
    } catch (error) {
      console.error(error);
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      })
    }
  }

  const closeModal = () => {
    setAlertModal({
      open: false,
      message: '',
      status: '',
    });
  };

  const openUpdateModal = () => {
    setUpdateModal(true);
  }

  const closeUpdateModal = () => {
    setUpdateModal(false);
  }

  return {
    // Properties
    errors,
    jobPositions,
    jobPositionErrors,
    alertModal,
    tipoOperario,
    updateModal,
    

    // Methods
    closeModal,
    closeUpdateModal,
    handleSubmit,
    handleSubmitJobPosition,
    onSubmit,
    onSubmitJobPosition,
    openUpdateModal,
    register,
    registerJobPosition,
  };
};
