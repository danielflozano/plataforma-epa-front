import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  GlobalButton,
  GlobalInput,
} from '@/components';
import { FilePlus, Pencil } from 'lucide-react';
import { useLawyer } from '../hooks';
import { useJuridica } from '@/modules/juridica/context/JuridicaContext';

export const LawyersPage = () => {
  
  const { lawyers } = useJuridica();

  const {
    // Properties
    alertModal,
    errors,
    isError,
    message,
    modal,

    // Methods
    closeAlertModal,
    closeModal,
    handleSubmit,
    openModal,
    onSubmit,
    register,
  } = useLawyer();


  return (
    <>
      
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl text-center font-extrabold text-epaColor1">
          Abogados
        </h2>
        <GlobalButton
          className="flex w-50 ml-3 items-center gap-3 px-5 py-3"
          onClick={openModal}
        >
          <FilePlus />
          Crear Abogado
        </GlobalButton>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="table-fixed w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-epaColor1 text-white uppercase">
              <tr>
                <th className="text-center border py-4">Identificación</th>
                <th className="text-center border">Nombre</th>
                <th className="text-center border">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {lawyers.map((lawyer) => (
                <tr key = {lawyer._id} className='hover:bg-gray-100 transition-colors'>
                  <td className='pl-2'>{lawyer.identificacion}</td>
                  <td className='pl-2'>{lawyer.nombreAbogado}</td>
                  <td className='pl-2'>{lawyer.EstadoAbogado}</td>
                  <td className="py-1 flex justify-center">
                    <button
                      title="Editar"
                      className="bg-cyan-300/50 rounded-4xl p-2 hover:bg-cyan-400 transition-colors"
                    >
                      <Pencil size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center">
          <div className="flex flex-col gap-4 w-[500px] p-6 bg-white rounded-2xl">
            <h3 className="text-4xl font-extrabold text-epaColor1 text-center">
              Crear Abogado
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <GlobalInput
                as="input"
                label="Identificación*"
                data="identificacion"
                register={register}
                errors={errors}
                rules={{
                  required: 'La identificación del Abogado es obligatoria',
                }}
              />
              <GlobalInput
                as="input"
                label="Nombre Completo*"
                data="nombreAbogado"
                register={register}
                errors={errors}
                rules={{
                  required: 'El nombre completo del Abogado es obligatorio',
                }}
              />
              {/* <GlobalInput
                as="input"
                label="Estado*"
                data="EstadoAbogado"
                register={register}
                errors={errors}
                rules={{
                  required: 'El estado del Abogado es obligatorio',
                }}
              /> */}
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
      )}

      {/* Alert Modal */}
      <Dialog open={alertModal} onOpenChange={closeAlertModal}>
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
            onClick={closeAlertModal}
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
