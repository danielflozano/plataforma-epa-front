import { GlobalButton, LoadSpinner } from '@/components';
import { useBackNavigation } from '@/hooks';
import { EyeClosed, Eye, Pencil, Ban } from 'lucide-react';
import { useState } from 'react';
import { useGetContracts } from '../hooks';

export const GetContractsPage = () => {
  const { contracts, loading } = useGetContracts();

  const { onClickBack } = useBackNavigation();
  const [hoverEye, setHoverEye] = useState(false);

  return (
    <>
      {loading && (
        <LoadSpinner name="Cargando Contratos" styles="fixed bg-gray-200/95" />
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
          <div className="bg-white  shadow-md rounded-lg p-6 mx-auto mt-6">
            <table className="table-fixed w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-epaColor1 text-white uppercase">
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
                {contracts?.length > 0 ? (
                  contracts.map((c) => (
                    <tr
                      key={c._id}
                      className="hover:bg-gray-100 transition-colors "
                    >
                      <td className="pl-2">{c.proceso.nombreProceso}</td>
                      <td className="pl-2">{c.consecutivo}</td>
                      <td className="pl-2">{c.tipoContrato.tipoContrato}</td>
                      <td className="pl-2 whitespace-normal break-words overflow-hidden">{c.objeto}</td>
                      <td className="pl-2">{c.ValorContrato}</td>
                      <td className="pl-2">{c.NombreContratista}</td>
                      <td className="pl-2">
                        {c.AbogadoAsignado.nombreAbogado}
                      </td>
                      <td className="pl-2">{c.FechaInicio}</td>
                      <td className="flex justify-center items-center gap-x-3">
                        <button
                          onMouseEnter={() => setHoverEye(c._id)}
                          onMouseLeave={() => setHoverEye(null)}
                          className="p-2 bg-sky-200 rounded-full hover:bg-sky-300 hover:scale-110 transition-transform"
                          title="Ver detalles"
                        >
                          {hoverEye === c._id ? (
                            <Eye size={18} />
                          ) : (
                            <EyeClosed size={18} />
                          )}
                        </button>

                        <button
                          className="p-2 bg-yellow-200 rounded-full hover:scale-110 transition-transform"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          className="p-2 bg-red-200 rounded-full hover:bg-red-300 hover:scale-110 transition-transform"
                          title="Eliminar"
                        >
                          <Ban size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No hay contratos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};
