import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useAseo } from "@/modules/aseo/context"
import { overtimesService } from "../services";

export const useGetOvertimes = () => {
  const {
    overtimes,
    currentPage,
    totalPages,
    totalRecords,
    loading,
    getAllOvertimes,
    handlePageChange,
  } = useAseo();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [ filterValue, setFilterValue ] = useState('');
  const [ overtimesFilter, setOvertimesFilter ] = useState(overtimes || []);
  const [ openUpdateModal, setOpenUpdateModal ] = useState(false);
  const [ selectedId, setSelectedId ] = useState('');
  const [ showPagination, setShowPagination ] = useState(true);


  useEffect(() => {
    setOvertimesFilter(overtimes);
  }, [overtimes]);

  const handleSearch = async () => {
    if (!filterValue.trim()) {
      setOvertimesFilter(overtimes);
      setShowPagination(true);
      return;
    }

    try {
      const response = await overtimesService.getOvertimesByWorker(filterValue);
      setOvertimesFilter(response.data);
      setShowPagination(false);
      console.log('Si funcionó handleSearch');      
    } catch (error) {
      console.error(error);
      setOvertimesFilter([]);
      setShowPagination(false);
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSearch();
    }
  };

  const onSubmitUpdate = (updateData) => {
    console.log('Entró');    
  };

  const onClickOpenUpdateModal = (id) => {
    setSelectedId(id);

    console.log(id);
    

    const selectedRegister = overtimesFilter.find((reg) => reg._id === id);
    const formatDate = (dateString) => dateString?.split('T')[0] || '';

    if (selectedRegister) {
      reset({
        fecha_inicio_trabajo: formatDate(selectedRegister.fecha_inicio_trabajo),
        hora_inicio_trabajo: selectedRegister.hora_inicio_trabajo || '',
        fecha_fin_trabajo: formatDate(selectedRegister.fecha_fin_trabajo),
        hora_fin_trabajo: selectedRegister.hora_fin_trabajo || '',
        fecha_inicio_descanso: formatDate(selectedRegister.fecha_inicio_descanso),
        hora_inicio_descanso: selectedRegister.hora_inicio_descanso || '',
        fecha_fin_descanso: formatDate(selectedRegister.fecha_fin_descanso),
        hora_fin_descanso: selectedRegister.hora_fin_descanso || '',
        es_festivo_Inicio: selectedRegister.es_festivo_Inicio || false,
        es_festivo_Fin: selectedRegister.es_festivo_Fin || false,
      });
    }
    
    setOpenUpdateModal(true);
  };

  const onClickCloseEditModal = () => setOpenUpdateModal(false);

  console.log(overtimesFilter);

  return {
    // Properties
    currentPage,
    errors,
    filterValue,
    loading,
    openUpdateModal,
    overtimesFilter,
    selectedId,
    showPagination,
    totalPages,
    totalRecords,

    // Methods
    handleKeyDown,
    handlePageChange,
    handleSearch,
    handleSubmit,
    onClickCloseEditModal,
    onClickOpenUpdateModal,
    onSubmitUpdate,
    register,
    setFilterValue,
  };
};