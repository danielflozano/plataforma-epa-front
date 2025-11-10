import { GlobalButton, LoadSpinner } from '@/components';
import { useBackNavigation } from '@/hooks';
import { EyeClosed, Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useGetContracts } from '../hooks';

export const GetContractsPage = () => {

  const{
    contracts,
    loading,
  } = useGetContracts();

  const { onClickBack } = useBackNavigation();
  const [hoverEye, setHoverEye] = useState(false);

  return (
    <>
    {loading && (
      <LoadSpinner name='Cargando Contratos' styles="fixed bg-gray-200/95"/>
    )}
      <GlobalButton
        variant="back"
        className="p-2 w-30 mb-3"
        onClick={onClickBack}
      >
        Regresar
      </GlobalButton>
      <div className="flex flex-col h-full gap-4">
        {/* Cards */}
        <div className=" h-1/5 flex flex-row justify-around items-center gap-4">
          <div className="bg-green-400 h-25 p-3   rounded-2xl font-semibold text-center shadow-lg shadow-gray-300">
            <span> Numero de contratos vigentes </span>
            <p className="text-3xl">10</p>
          </div>
          <div className="bg-red-500 h-25 p-3  rounded-2xl font-semibold text-center shadow-lg shadow-gray-300">
            <span>Numero de contratos vencidos</span>
            <p className="text-3xl">10</p>
          </div>
          <div className="bg-yellow-300 h-25 p-3 rounded-2xl font-semibold text-center shadow-lg shadow-gray-300">
            <span>Contratos por vencer en 30 dias</span>
            <p className="text-3xl">10</p>
          </div>
        </div>

        {/*Filtros*/}

        {/*Tabla de Contratos*/}
        <section className="">
          <div className="bg-white shadow-md rounded-lg p-6 mx-auto mt-6">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-epaColor1 text-white">
                <tr>
                  <th className="py-4 text-center border border-white">
                    Proceso/Dependencia <br /> del contrato
                  </th>
                  <th className="text-center border">Consecutivo</th>
                  <th className="text-center border">
                    Tipo de <br />
                    Contrato
                  </th>
                  <th className="text-center border">Objeto</th>
                  <th className="text-center border">
                    Valor <br /> Contrato
                  </th>
                  <th className="text-center border">
                    Nombre del <br /> Contratista
                  </th>
                  <th className="text-center border">
                    Abogado <br /> Asignado
                  </th>
                  <th className="text-center border">
                    Fecha de <br /> Inicio
                  </th>
                  <th className="text-center ">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {contracts.map((c) =>(
                <tr key = {c._id} className='hover:bg-gray-100 transition-colors'>
                  <td>{c.proceso}</td>
                  <td>{c.consecutivo}</td>
                  <td>{c.tipoContrato}</td>
                  <td>{c.objeto}</td>
                  <td>{c.ValorContrato}</td>
                  <td>{c.NombreContratista}</td>
                  <td>{c.AbogadoAsignado}</td>
                  <td>{c.FechaInicio}</td>
                  <td>
                    <button
                      onMouseEnter={() => setHoverEye(true)}
                      onMouseLeave={() => setHoverEye(false)}
                      className="p-2 transition-transform duration-300 hover:scale-110"
                      title="Ver Detalles"
                    >
                      {hoverEye ? <Eye size={20} /> : <EyeClosed size={20} />}
                    </button>
                    <button title="Editar">
                      <Pencil size={20} />
                    </button>
                    <button title="Eliminar">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>

                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};
