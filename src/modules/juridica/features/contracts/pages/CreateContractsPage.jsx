import {
  AlertModal,
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
import { FilePlus } from 'lucide-react';

export const CreateContractsPage = () => {
  const {
    // Properties
    alertModal,
    contractType,
    errors,
    handleSubmit,
    loading,
    modal,
    process,
    register,

    // Methods
    onSubmit,
    closeModal,
    closeAlertModal,
    openModal,
  } = useCreateContracts();

  const { lawyers } = useJuridica();

  const { onClickBack } = useBackNavigation();

  return (
    <>
      <GlobalButton className="p-1.5 w-30" variant="back" onClick={onClickBack}>
        Regresar
      </GlobalButton>
      <div className="flex mt-5">
        <GlobalButton
          variant="third"
          className="flex items-center gap-3 px-5 py-1.5"
          onClick={openModal}
        >
          <FilePlus />
          Crear Tipo de Contrato
        </GlobalButton>
      </div>
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
            as="textarea"
            type="text"
            label="Objeto"
            data="objeto"
            classNameComponent="border border-gray-500 rounded-md p-1 resize-none h-25"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type="text"
            label="Nombre del Contratista"
            data="NombreContratista"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <GlobalInput
            type="text"
            label="Valor del Contrato"
            data="ValorContrato"
            register={register}
            errors={errors}
            rules={{
              required: 'Este campo es obligatorio',
            }}
          />

          <div className="flex justify-around">
            <GlobalInput
              type="date"
              label="Fecha de Inicio"
              data="FechaInicio"
              register={register}
              errors={errors}
              rules={{
                required: 'Este campo es obligatorio',
              }}
            />

            <GlobalInput
              type="date"
              label="Fecha de Finalizacion"
              data="FechaFinalizacion"
              register={register}
              errors={errors}
              rules={{
                required: 'Este campo es obligatorio',
              }}
            />
          </div>

          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto">
            Registrar
          </GlobalButton>
        </form>
      </div>
      {/* Modal */}
      (modal && (
      <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-[500px] p-6 bg-white rounded-2xl">
          <h2 className="text-epaColor1 text-4xl font-extrabold items-center">
            Crear Tipo de Contrato
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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

            <div className="flex gap-2 justify-end ">
              <GlobalButton
                variant="modalFour"
                className="p-1.5 w-25"
                onClick={closeModal}
              >
                Cancelar
              </GlobalButton>
              <GlobalButton
                type="submit"
                variant="modalTwo"
                className="p-1.5 w-25"
              >
                Guardar
              </GlobalButton>
            </div>
          </form>
        </div>
      </div>
      ))
      {/* AlertModal */}
      <AlertModal
        openAlertModal={alertModal.open}
        closeAlertModal={closeAlertModal}
        modalTitle={alertModal.state}
        modalDescription={alertModal.message}
      />
      {loading && (
        <LoadSpinner name="Creando Contrato" styles="fixed bg-gray-200/95" />
      )}
    </>
  );
};
