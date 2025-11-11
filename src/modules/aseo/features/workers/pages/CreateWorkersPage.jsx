import { FilePlus } from 'lucide-react';
import { AlertModal, GlobalButton, GlobalInput } from '@/components';
import { useBackNavigation } from '@/hooks';
import { useCreateWorkers } from '../hooks';

export const CreateWorkersPage = () => {
  const { onClickBack } = useBackNavigation();
  const {
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
  } = useCreateWorkers();

  return (
    <>
      <GlobalButton
        variant="back"
        className="p-1.5 w-30 mb-3"
        onClick={onClickBack}
      >
        Regresar
      </GlobalButton>
        <GlobalButton variant="third" className="flex p-1.5 w-65">
          <FilePlus className="w-1/3"/>
          Crear Cargo    
        </GlobalButton>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-epaColor1 text-4xl font-extrabold">
          Registrar Funcionario
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-white p-4 w-1/2 rounded-xl shadow-2xl"
        >
          <GlobalInput
            label="Nombre Completo"
            data="nombre_completo"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            label="Identificación"
            data="identificacion"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            as="select"
            label="Tipo Operario"
            data="tipoOperario"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione el tipo de operario</option>
            {tipoOperario.map((to) => (
              <option key={to} value={to}>
                {to}
              </option>
            ))}
          </GlobalInput>
          <GlobalInput
            as="select"
            label="Cargo"
            data="Cargo"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione el cargo</option>
            {jobPositions.map((jobPosition) => (
              <option key={jobPosition._id} value={jobPosition._id}>
                {jobPosition.name}
              </option>
            ))}
          </GlobalInput>
          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto">
            Registrar
          </GlobalButton>
        </form>
      </div>
      <AlertModal
        openAlertModal={modal.open}
        closeAlertModal={closeModal}
        modalTitle={modal.status}
        modalDescription={modal.message}
      />
    </>
  );
};
