import { GlobalButton, GlobalInput, AlertModal } from '@/components';
import { useForm } from 'react-hook-form';
import { ROLES } from '@/routes/roles';
import { apiClient } from '@/api/axios/apiClient';
import { useState } from 'react';

const availableRoles = Object.values(ROLES);

export const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [alertModal, setAlertModal] = useState({
    open: false,
    status: '',
    message: '',
  });

  const closeModal = () => {
    setAlertModal({ open: false, status: '', message: '' });
    if (alertModal.status === 'Exitoso') {
      reset();
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post('/auth/newUser', data);
      if (response.status === 201) {
        setAlertModal({
          open: true,
          status: 'Exitoso',
          message: 'Usuario creado correctamente.',
        });
      }
    } catch (error) {
      setAlertModal({
        open: true,
        status: 'Error',
        message: error.response?.data?.msg || 'Hubo un error al crear el usuario.',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-epaColor1 text-4xl font-extrabold">
          Crear Nuevo Usuario
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-white p-6 w-full max-w-lg rounded-xl shadow-2xl"
        >
          <GlobalInput
            label="Nombre Completo"
            data="name"
            register={register}
            errors={errors}
            rules={{ required: 'El nombre es obligatorio' }}
          />
          <GlobalInput
            label="Correo Electrónico"
            type="email"
            data="email"
            register={register}
            errors={errors}
            rules={{
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido',
              },
            }}
          />
          <GlobalInput
            label="Contraseña"
            type="password"
            data="password"
            register={register}
            errors={errors}
            rules={{
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            }}
          />
          <GlobalInput
            as="select"
            label="Rol del Usuario"
            data="rol"
            register={register}
            errors={errors}
            rules={{ required: 'Debe seleccionar un rol' }}
          >
            <option value="">Seleccione un rol</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </GlobalInput>
          <GlobalButton type="submit" className="p-2 w-1/2 block mx-auto mt-4">
            Crear Usuario
          </GlobalButton>
        </form>
      </div>
      <AlertModal
        openAlertModal={alertModal.open}
        closeAlertModal={closeModal}
        modalTitle={alertModal.status}
        modalDescription={alertModal.message}
      />
    </>
  );
};
