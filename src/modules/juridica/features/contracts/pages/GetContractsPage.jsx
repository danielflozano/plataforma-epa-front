import { EyeClosed, Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const GetContractsPage = () => {
  // const [filteredData, setFilteredData] = useState(data);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3;

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = filteredData.slice(startIndex, endIndex);

  const [hover, setHover] = useState(false);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [filteredData]);

  return (
    <>
      <div className=" h-full gap-4">
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
        {/* <GlobalFilter
          data={data}
          setFilteredData={setFilteredData}
          keys={['nombre', 'identificacion', 'ciudad']}
          placeholder="Buscar usuario..."
        /> */}

        {/*Tabla de Contratos*/}
        <section className="">
          <div className="bg-white shadow-md rounded-lg p-6 mx-auto mt-6">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-epaColor1 text-white">
                <tr>
                  <th className="py-4 text-center border border-white">
                    Proceso/Dependencia <br /> del contrato
                  </th>
                  <th className="text-center border">
                    Consecutivo
                  </th>
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
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      className="p-2 transition-transform duration-300 hover:scale-110"
                      title="Ver Detalles"
                    >
                      {hover ? <Eye size={20} /> : <EyeClosed size={20} />}
                    </button>
                    <button title="Editar">
                      <Pencil size={20} />
                    </button>
                    <button title="Eliminar">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};