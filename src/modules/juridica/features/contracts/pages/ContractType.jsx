import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  GlobalButton,
  GlobalInput,
} from '@/components';
import { useBackNavigation } from '@/hooks';
import { useContractType } from '../hooks';

export const ContractType = () => {
  const { onClickBack } = useBackNavigation();

  const {
    errors,
    isError,
    message,
    modal,

    closeModal,
    handleSubmit,
    onSubmit,
    register,
  } = useContractType();

  return (
    <>
      <GlobalButton
        variant="back"
        className="p-2 w-30 mb-3"
        onClick={onClickBack}
      >
        Regresar
      </GlobalButton>
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-epaColor1 text-4xl font-extrabold items-center">
          Crear Tipo de Contrato
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-white p-10 w-1/2 rounded-xl shadow-2xl"
        >
          <GlobalInput
            label="Nombre del Tipo de Contrato"
            data="tipoContrato"
            register={register}
            errors={errors}
            rules={{
              required: 'El nombre del tipo de contrato es obligatorio',
            }}
          />

          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto">
            Registrar
          </GlobalButton>
        </form>
      </div>

      {/* Modal */}
      <Dialog open={modal} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-epaColor1 text-3xl text-center font-bold mb-2">
              {isError ? 'Error' : 'Registro Exitoso'}
            </DialogTitle>
            <DialogDescription className="text-xl text-center font-semibold mb-2">
              {message}
            </DialogDescription>
          </DialogHeader>
          <GlobalButton
            onClick={closeModal}
            variant="modal"
            className="p-1.5 w-1/2 block mx-auto"
          >
            Cerrar
          </GlobalButton>
        </DialogContent>
      </Dialog>
    </>
  );
};
