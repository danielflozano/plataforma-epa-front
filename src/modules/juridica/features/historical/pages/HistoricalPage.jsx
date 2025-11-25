import { GlobalButton, LoadSpinner } from '@/components';
import { useHistorical } from '../hooks';

export const HistoricalPage = () => {
  const {
    //Properties
    cleanContracts,
    loading,
    modal,
    objetoExpandido,

    //Methods
    closeModal,
    setObjetoExpandido,
  } = useHistorical();
  return (
    <>
      {loading && (
        <LoadSpinner name="Cargando Contratos" styles="fixed bg-gray-200/95" />
      )}
      {modal && (
        <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center z-50">
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 text-epaColor1">
              FILTRAR POR AÑO
            </h2>

            <label className="font-semibold">Buscar contrato:</label>
            <input
              type="text"
              // value={filtro}
              // onChange={(e) => setFiltro(e.target.value)}
              placeholder="Escribe un año..."
              className="border p-2 rounded w-full mt-1"
            />

            <GlobalButton onClick={() => closeModal()} className="p-4">
              Continuar
            </GlobalButton>
          </div>
        </div>
      )}

      {/* Filtros */}

      {/* Tabla de Contratos */}
      <section className="">
        <div className="bg-white  shadow-md rounded-lg p-6 mx-auto mt-6">
          <table className="table-fixed w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-epaColor1 text-white uppercase">
              <tr>
                <th className="text-center border">Tipo de Contrato</th>
                <th className="py-4 text-center border border-white">
                  N° de Consecutivo
                </th>
                <th className="text-center border">Año</th>
                <th className="text-center border">Fecha de Ingreso</th>
                <th className="text-center border">Objeto</th>
                <th className="text-center border">Nombre del Contratista</th>
                <th className="text-center border">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cleanContracts?.length > 0 ? (
                cleanContracts.map((c, index) => (
                  <tr
                    key={c.idcontrato}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="pl-2 whitespace-normal break-words max-w-[200px]">
                      {c.TipoContrato}
                    </td>
                    <td className="pl-2">{c.consecutivo}</td>
                    <td className="pl-2">{c.conanio}</td>
                    <td className="pl-2">{c.fechaIngreso}</td>
                    <td className="pl-2 whitespace-normal break-words max-w-[200px]">
                      {objetoExpandido === index ? (
                        <>
                          {c.objeto}
                          <button
                            className="text-blue-600 ml-2"
                            onClick={() => setObjetoExpandido(null)}
                          >
                            Ver menos
                          </button>
                        </>
                      ) : (
                        <>
                          {c.objeto.length > 60 ? (
                            <>
                              {c.objeto.substring(0, 60)}...
                              <button
                                className="text-blue-600 ml-2"
                                onClick={() => setObjetoExpandido(index)}
                              >
                                Ver más
                              </button>
                            </>
                          ) : (
                            c.objeto
                          )}
                        </>
                      )}
                    </td>
                    <td className="pl-2">{c.novedades}</td>
                    <td>
                      <span
                        className={`ml-3 px-3 py-1 rounded-full text-sm font-semibold
                            ${c.estado === 'ACTIVO' ? 'bg-green-400' : ''}
                            ${c.estado === 'AMPLIADO' ? 'bg-orange-300' : ''}
                            ${c.estado === 'FINALIZADO' ? 'bg-red-400' : ''}
                            ${c.estado === 'EN_PROCESO' ? 'bg-yellow-300' : ''}
                            ${c.estado === 'ANULADO' ? 'bg-gray-400' : ''}
                            ${
                              c.estado === 'ACTIVO-ACTUALIZADO'
                                ? 'bg-blue-300'
                                : ''
                            }
                          `}
                      >
                        {c.estado}
                      </span>
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
    </>
  );
};
