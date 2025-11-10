import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { workersService } from '../services';
import { useAseo } from '@/modules/aseo/context';

const tipoOperario = ['Planta', 'Temporal'];
export const useCreateWorkers = () => {
  const { getAllWorkers } = useAseo();
  const [modal, setModal] = useState({
    open: false,
    message: '',
    status: '',
  });
  const [jobPositions, setJobPositions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      setModal({
        open: true,
        message: response.message,
        status: response.success ? 'Funcionario Registrado' : 'Error',
      });
      getAllWorkers();
      reset();
    } catch (error) {
      console.error(error)
      setModal({
        open: true,
        message: error.message,
        status: 'Error',
      });
    }
  };

  const closeModal = () => {
    setModal({
      open: false,
      message: '',
      status: '',
    });
  };

  console.log(modal);

  return {
    // Properties
    errors,
    jobPositions,
    modal,
    tipoOperario,

    // Methods
    closeModal,
    handleSubmit,
    onSubmit,
    register,
  };
};
