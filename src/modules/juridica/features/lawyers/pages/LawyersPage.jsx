import { GlobalButton, GlobalInput } from '@/components';
import { FilePlus } from 'lucide-react';
import { useLawyer } from '../hooks';

export const LawyersPage = () => {
  const {
    // Properties
    errors,
    modal,

    // Methods
    // closeModal,
    // handleSubmit,
    openModal,
    register,
  } = useLawyer();

  return (
    <>
      <GlobalButton variant="back" className="p-2 w-30">
        Regresar
      </GlobalButton>
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
            <thead className="bg-epaColor1 text-white">
              <tr>
                <th className="text-center border py-4">Identificación</th>
                <th className="text-center border">Nombre</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
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
              // {/*onSubmit={handleSubmit(onSubmit)}*/}
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
              <GlobalInput
                as="input"
                label="Estado*"
                data="EstadoAbogado"
                register={register}
                errors={errors}
                rules={{
                  required: 'El estado del Abogado es obligatorio',
                }}
              />
              <div className='flex gap-2 justify-end '>
                <GlobalButton variant=''>
                  Cancelar
                </GlobalButton>
                <GlobalButton >
                  Crear
                </GlobalButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
