import { useState } from "react"
import { useForm } from "react-hook-form";
import { useAseo } from "@/modules/aseo/context"

export const useGetOvertimes = () => {
  const {
    loading,
    overtimes,
    getAllOvertimes,
  } = useAseo();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
    reset: resetFilter,
    formState: { errors: errorsFilter }
  } = useForm();

  const [ openUpdateModal, setOpenUpdateModal ] = useState(false);
  const [ selectedId, setSelectedId ] = useState('');

  const onSubmitUpdate = (updateData) => {
    console.log('Entró');    
  };


  const onClickOpenUpdateModal = (id) => {
    setSelectedId(id);

    const selectedRegister = overtimes.find((reg) => reg._id === id);

    if (selectedRegister) {
      reset({
        fecha_inicio_trabajo: selectedRegister.fecha_inicio_trabajo?.split('T')[0] || '',
        hora_inicio_trabajo: selectedRegister.hora_inicio_trabajo || '',
        fecha_fin_trabajo: selectedRegister.fecha_fin_trabajo?.split('T')[0] || '',
        hora_fin_trabajo: selectedRegister.hora_fin_trabajo || '',
        fecha_inicio_descanso: selectedRegister.fecha_inicio_descanso?.split('T')[0] || '',
        hora_inicio_descanso: selectedRegister.hora_inicio_descanso || '',
        fecha_fin_descanso: selectedRegister.fecha_fin_descanso?.split('T')[0] || '',
        hora_fin_descanso: selectedRegister.hora_fin_descanso || '',
        es_festivo_Inicio: selectedRegister.es_festivo_Inicio || false,
        es_festivo_Fin: selectedRegister.es_festivo_Fin || false,
      });
    }
    
    setOpenUpdateModal(true);
  };

  const onClickCloseEditModal = () => setOpenUpdateModal(false);

  console.log(openUpdateModal);

  return {
    // Properties
    errors,
    errorsFilter,
    loading,
    openUpdateModal,
    overtimes,
    selectedId,

    // Methods
    handleSubmit,
    handleSubmitFilter,
    onClickCloseEditModal,
    onClickOpenUpdateModal,
    onSubmitUpdate,
    register,
    registerFilter,
    reset,
    resetFilter,
  };
};