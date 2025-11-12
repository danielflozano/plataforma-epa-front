import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { lawyersServices } from '../services';

export const useLawyer = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    state: '',
  });
  const [modal, setModal] = useState(false);

  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //Cuando uno hace una funcion de una sola linea, puede obviar las llaves y el return
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const onSubmit = async (createData) => {
    try {
      await lawyersServices.createLawyers(createData);
      setAlertModal({
        open: true,
        message: '¡Abogado creado con Éxito! ✅',
        state: 'Registro Exitoso',
      })   
      reset();
      setModal(false);
    } catch (error) {
      console.log(error);
      setAlertModal({
        open: true,
        message: error.message,
        state: 'Error',
      })  
    }
  };  

  const closeAlertModal = () => {
    setAlertModal({
      open: false,
      message: '',
      state: '',
    });
  };

  return {
    // Properties
    alertModal,
    errors,
    modal,

    // Methods
    closeAlertModal,
    closeModal,
    handleSubmit,
    openModal,
    onSubmit,
    register,
  };
};
