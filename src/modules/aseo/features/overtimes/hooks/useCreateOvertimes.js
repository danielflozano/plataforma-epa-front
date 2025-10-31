import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAseo } from '@/modules/aseo/context';
import { overtimesService } from '../services';


export const useCreateOvertimes = () => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [overtimeRegister, setOvertimeRegister] = useState({});
  const [sheetNames, setSheetNames] = useState([]);
  const { workers } = useAseo();
  
  const fileInputRef = useRef(null);
  
  const {
    register: registerHoras,
    handleSubmit: handleSubmitHoras,
    reset: resetHoras,
    formState: { errors: errorsHoras },
  } = useForm();

  const {
    control: controlExcel,
    handleSubmit: handleSubmitExcel,
    reset: resetExcel,
    formState: { errors: errorsExcel },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await overtimesService.createOvertimes(data);
      setOvertimeRegister(response.data);
      resetHoras();
      setIsError(false);
      setModalMessage(response.message);
    } catch (error) {
      setIsError(true);
      setModalMessage(error.message);      
    } finally {
      setOpenModal(true);
    }
  };

  const onSubmitExcel = async (data) => {
    setLoading(true);
    const file = data.file;
    const sheetName = data.sheetName;

    if(!file) {
      setIsError(true);
      setModalMessage('Seleccione un archivo de Excel');
      setOpenModal(true);
      return;
    }

    if(!sheetName) {
      setIsError(true);
      setModalMessage('Seleccione una hoja del archivo Excel');
      setOpenModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nombreHoja', sheetName)

    try {
      const response = await overtimesService.importOvertimesFromExcel(formData)
      setIsError(false);
      setModalMessage(response.message || 'Archivo importado con exito');
    } catch (error) {
      setIsError(true);
      setModalMessage(error.message || 'Error al importar el archivo');      
    } finally {
      resetExcel({ sheetName: '' });
      if (fileInputRef.current) fileInputRef.current.value= '';
      setLoading(false);
      setSheetNames([]);
      setOpenModal(true);
    }
  };

  const getExcelSheetNames = async (file) => {
    if(!file) {
      console.log('Seleccion un archivo de Excel');
      return;      
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await overtimesService.getExcelSheetNames(formData);
      setSheetNames(response.sheetNames);
    } catch (error) {
      setIsError(true);setModalMessage(error.message);
      setOpenModal(true);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const onDeleteOvertimeRegister = () =>{
    setOvertimeRegister({});
  }
  
  return {
    
    controlExcel,
    errorsExcel,
    errorsHoras,
    fileInputRef,
    isError,
    loading,
    modalMessage,
    openModal,
    overtimeRegister,
    sheetNames,
    workers,

    // Methods
    getExcelSheetNames,
    handleSubmitExcel,
    handleSubmitHoras,
    onCloseModal,
    onDeleteOvertimeRegister,
    onSubmit,
    onSubmitExcel,
    registerHoras,
  };
};
