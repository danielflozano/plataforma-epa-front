import { FilterInput, GlobalButton, LoadSpinner } from '@/components';
import { useHistorical } from '../hooks';
import { RotateCcw } from 'lucide-react';

export const HistoricalPage = () => {
  const {
    //Properties
    anios,
    filterValue,
    filterValueAnio,
    filteredContracts,
    loading,
    loadingFilter,
    modal,
    objetoExpandido,
    currentPage,
    totalPages,
    totalRecords,

    //Methods
    handleKeyDown,
    handleReset,
    handlePageChange,
    handleSearchAnio,
    handleSearchName,
    handleSearchType,
    setObjetoExpandido,
    setFilterValueAnio,
    setFilterValue
  } = useHistorical();
  return (
    <>
      {loading && (
        <LoadSpinner name="Cargando Contratos" styles="fixed bg-gray-200/95" />
      )}
      {loadingFilter && (
        <LoadSpinner
          name="Cargando Contratos"
          styles="absolute fixed bg-gray-200/95 z-51"
        />
      )}
      {modal && (
        <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center z-50">
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 text-epaColor1">
              FILTRAR POR AÑO
            </h2>

            <label className="font-semibold">Buscar contrato:</label>
            <select
              value={filterValueAnio}
              onChange={(e) => setFilterValueAnio(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-gray-500 rounded-md p-1"
            >
              <option value="">Seleccione un año</option>
              {anios.map((p) => (
                <option key={p._id} value={p._id}>
                  {p}
                </option>
              ))}
            </select>
            <GlobalButton onClick={handleSearchAnio} className="p-4">
              Continuar
            </GlobalButton>
          </div>
        </div>
      )}

      {/* Filtros */}

      <div className="flex gap-2 ">
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Escribe aquí…"
          className="bg-white w-180 p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
        />
        <GlobalButton
          className="flex p-2 gap-2"
          onClick={handleReset}
        >
          <RotateCcw />
          Resetear Filtro
        </GlobalButton>
      </div>

      <div className="flex gap-2 m-3">
        <GlobalButton
          className="p-2"
          onClick={handleSearchName}
        >
          Buscar por Nombre
        </GlobalButton>
        <GlobalButton
          className="p-2"
          onClick={handleSearchType}
        >
          Buscar por Tipo de Contrato
        </GlobalButton>
      </div>

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
              {filteredContracts?.length > 0 ? (
                filteredContracts.map((c, index) => (
                  <tr
                    key={index}
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

        {/* PAGINACIÓN */}
        <div className="flex justify-between items-center px-4 py-3">
          <span>
            Mostrando {filteredContracts.length} de {totalRecords} registros.
          </span>
          <div className="flex items-center gap-2">
            <GlobalButton
              variant="modalTwo"
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 disabled:bg-gray-400"
              disabled={currentPage === 1}
            >
              Anterior
            </GlobalButton>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <GlobalButton
              variant="modalTwo"
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 disabled:bg-gray-400"
              disabled={currentPage === totalPages}
            >
              Siguiente
            </GlobalButton>
          </div>
        </div>
      </section>
    </>
  );
};
