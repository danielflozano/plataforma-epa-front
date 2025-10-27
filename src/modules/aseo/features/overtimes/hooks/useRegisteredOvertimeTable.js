import { useState } from "react";
import { overtimesService } from "../services";

export const useRegisteredOvertimeTable = ({ onDeleteSuccess }) => {
  const [message, setMessage] = useState('');
  const [estado, setEstado] = useState('');
  const [openResultModal, setOpenResultModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const abrirConfirm = () => setShowConfirmModal(true);
  const cerrarConfirm = () => setShowConfirmModal(false);
  const onOpenModal = () => setOpenResultModal(true);
  const onCloseModal = () => setOpenResultModal(false);

  const handleDelete = async (idHoraExtra) => {
    console.log('handleDelete called ->', idHoraExtra);
    try {
      const response = await overtimesService.deleteOvertimes(idHoraExtra);
      const success = !!response?.success;
      setMessage(
        response?.message ||
          (success ? 'El registro se eliminó' : 'Ocurrió un error')
      );
      setEstado(success ? 'Registro Eliminado' : 'Error');
      cerrarConfirm();
      if (success) {
        setTimeout(() => {
          if (typeof onDeleteSuccess === 'function') onDeleteSuccess();
        }, 2000);
      }
    } catch (error) {
      console.error('Error eliminando:', error);
      setMessage(error?.message || String(error));
      setEstado('Error');
    } finally {
      setOpenResultModal(true);
    }
  };

  return {
    message,
    estado,
    openResultModal,
    showConfirmModal,
    abrirConfirm,
    cerrarConfirm,
    onOpenModal,
    onCloseModal,
    handleDelete,
  };
};
