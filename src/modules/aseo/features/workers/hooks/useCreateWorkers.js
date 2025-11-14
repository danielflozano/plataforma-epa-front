import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { workersService } from '../services';
import { useAseo } from '@/modules/aseo/context';

const tipoOperario = ['Planta', 'Temporal'];
export const useCreateWorkers = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const [departaments, setDepartaments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    status: '',
  });

  const { jobPositions, getAllWorkers, getAllJobPositions } = useAseo();

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
    formState: { errors: jobPositionErrors },
  } = useForm();

  useEffect(() => {
    getDepartaments();
    getLocations();
  }, []);

  const getDepartaments = async () => {
    try {
      const response = await workersService.getAllDepartaments();
      console.log(response);
      setDepartaments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await workersService.getAllLocations();
      console.log(response);
      setLocations(response.data);
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.log('Respuesta del servicio:', response);
      setAlertModal({
        open: response.success,
        message: 'El cargo ha sido creado exitosamente',
        status: `Cargo ${response.data.name} Creado con Exito`,
      });
      getAllJobPositions();
      resetJobPosition();
    } catch (error) {
      console.error(error);
      setAlertModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const closeModal = () => {
    setAlertModal({
      open: false,
      message: '',
      status: '',
    });
    setUpdateModal(false);
  };

  const openUpdateModal = () => {
    setUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  return {
    // Properties
    alertModal,
    departaments,
    errors,
    jobPositionErrors,
    jobPositions,
    locations,
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
