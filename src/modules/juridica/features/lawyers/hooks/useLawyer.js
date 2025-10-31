import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useLawyer = () => {
  const [modal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openModal = () => setModal(true);

  //Cuando uno hace una funcion de una sola linea, puede obviar las llaves y el return
  const closeModal = () => setModal(false);

  return {
    // Properties
    errors,
    modal,

    // Methods
    closeModal,
    handleSubmit,
    openModal,
    register,

  };
};
