import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  GlobalButton,
  GlobalInput,
  LoadSpinner,
} from '@/components';
import { useBackNavigation } from '@/hooks';
import { useCreateContracts } from '../hooks';
import { useJuridica } from '@/modules/juridica/context';

export const CreateContractsPage = () => {
  const {
    // Properties
    contractType,
    errors,
    handleSubmit,
    isError,
    loading,
    message,
    modal,
    process,
    register,

    // Methods
    onSubmit,
    closeModal
  } = useCreateContracts();

  const { lawyers } = useJuridica();

  const { onClickBack } = useBackNavigation();

  return (
    <>
      
      <GlobalButton className="p-1.5 w-30" variant="back" onClick={onClickBack}>
        Regresar
      </GlobalButton>
      <div className="flex flex-col gap-4 items-center">
        <h2 className="font-extrabold text-4xl text-epaColor1">
          Crear Contrato
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 shadow-2xl bg-white w-1/2  rounded-2xl p-4"
        >
          <GlobalInput
            as="select"
            type="text"
            label="Proceso"
            data="proceso"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          >
            <option value="">Seleccione un proceso</option>
            {process.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombreProceso}
              </option>
            ))}
          </GlobalInput>

          <GlobalInput
            type="text"
            label="Identidad Onit"
            data="identificacionOnit"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type="email"
            label="Correo de Dependencia"
            data="CorreoDependencia"
            register={register}
            errors={errors}
          />

          <GlobalInput
            as="select"
            type="text"
            label="Tipo de Contrato"
            data="tipoContrato"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          >
            <option value="">Seleccione una opcion</option>
            {contractType.map((ct) => (
              <option key={ct._id} value={ct._id}>
                {ct.tipoContrato}
              </option>
            ))}
          </GlobalInput>

          <GlobalInput
            as="select"
            type="text"
            label="Abogado"
            data="AbogadoAsignado"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          >
            <option value="">Selecciona una opcion</option>
            {lawyers.map((l) => (
              <option key={l._id} value={l._id}>
                {l.nombreAbogado}
              </option>
            ))}
          </GlobalInput>

          <GlobalInput
            type="text"
            label="Telefono del Contratista"
            data="TelefonoContratista"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type="textArea"
            label="Objeto"
            data="objeto"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type='text'
            label='Nombre del Contratista'
            data='NombreContratista'
            register={register}
            errors={errors}
            rules={{
              required:'Este campo es obligatorio'
            }}
          />

          <GlobalInput
            type='text'
            label='Valor del Contrato'
            data='ValorContrato'
            register={register}
            errors={errors}
            rules={{
              required:'Este campo es obligatorio'
            }}
          />

          <div className='flex justify-around'>
            <GlobalInput
              type='date'
              label='Fecha de Inicio'
              data='FechaInicio'
              register={register}
              errors={errors}
              rules={{
                required:'Este campo es obligatorio'
              }}
            />

            <GlobalInput
              type='date'
              label='Fecha de Finalizacion'
              data='FechaFinalizacion'
              register={register}
              errors={errors}
              rules={{
                required:'Este campo es obligatorio'
              }}
            />
          </div>

          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto">
            Registrar
          </GlobalButton>

        </form>

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
      </div>
      {loading && (
        <LoadSpinner name='Creando Contrato' styles="fixed bg-gray-200/95"/>
      )}
    </>
  );
};
