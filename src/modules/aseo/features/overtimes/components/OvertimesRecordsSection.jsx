import { useAseo } from "@/modules/aseo/context";
import { useOvertimesRecordsSection } from "../hooks";
import { GlobalButton } from "@/components";

export const OvertimesRecordsSection = ({
  overtimes = [],
  onClickOpenUpdateModal = () => {}
}) => {

  const {
    formatDate,
    formatHour,
  } = useOvertimesRecordsSection();

  return (
    <>
      <input
        type="text"
        placeholder="Buscar por identificación, nombre o fecha"
        // value={busqueda}
        // onChange={(e) => setBusqueda(e.target.value)}
        className="w-sm bg-white text-epaColor1 p-1 border-2 border-epaColor1 rounded-md"
      />
      <div className="bg-white shadow-md rounded-lg p-4 mx-auto">
        <table className="w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-epaColor1 text-white">
            <tr>
              <th className="py-4 text-center border border-white">Identificación</th>
              <th className='text-center border border-white'>Nombre</th>
              <th className='text-center border border-white'>Fecha creación</th>
              <th className='text-center border border-white'>Inicio trabajo</th>
              <th className='text-center border border-white'>Fin trabajo</th>
              <th className='text-center border border-white'>
                Hora inicio
                <br />
                trabajo
              </th>
              <th className='text-center border border-white'>
                Hora fin
                <br />
                trabajo
              </th>
              <th className='text-center border border-white'>Inicio descanso</th>
              <th className='text-center border border-white'>Fin descanso</th>
              <th className='text-center border border-white'>
                Hora inicio
                <br />
                descanso
              </th>
              <th className='text-center border border-white'>
                Hora fin
                <br />
                descanso
              </th>
              <th className='text-center border border-white'>Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {overtimes.map((overtime) => (
              <tr
                key={overtime._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-2">
                  {overtime.FuncionarioAsignado?.identificacion}
                </td>
                <td>{overtime.FuncionarioAsignado?.nombre_completo}</td>
                <td>
                  {new Date(overtime.createdAt).toISOString().split('T')[0]}
                </td>
                <td>
                  {
                    new Date(overtime.fecha_inicio_trabajo)
                      .toISOString()
                      .split('T')[0]
                  }
                </td>
                <td>
                  {
                    new Date(overtime.fecha_fin_trabajo)
                      .toISOString()
                      .split('T')[0]
                  }
                </td>
                <td>{overtime.hora_inicio_trabajo}</td>
                <td>{overtime.hora_fin_trabajo}</td>
                <td>{formatDate(overtime.fecha_inicio_descanso)}</td>
                <td>{formatDate(overtime.fecha_fin_descanso)}</td>
                <td>{formatHour(overtime.hora_inicio_descanso)}</td>
                <td>{formatHour(overtime.hora_fin_descanso)}</td>
                <td className="space-x-1 space-y-1">
                  <GlobalButton
                    variant="modalTwo"
                    onClick={() => onClickOpenUpdateModal(overtime._id)}
                    className="px-3 py-0.5"
                  >
                    Actualizar
                  </GlobalButton>
                  <GlobalButton
                  variant="modalThree"
                    onClick={() => abrirModal(overtime._id)}
                    className="px-3 py-0.5"
                  >
                    Eliminar
                  </GlobalButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {overtimes.length === 0 && (
          <div className="text-center text-xl text-gray-500 font-semibold py-8">
            No se encontraron registros de horas extra
          </div>
        )}
      </div>
    </>
  );
};
