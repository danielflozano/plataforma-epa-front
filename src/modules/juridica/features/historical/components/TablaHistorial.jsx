import React, { useState } from 'react';

const TablaHistorial = ({ contratos }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const MAX_CHARS = 80; // Ajusta el límite como quieras

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto mt-6">
      <table className="table-fixed w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-epaColor1 text-white uppercase">
          <tr>
            <th className="py-4 text-center border border-white">Tipo Contrato</th>
            <th className="text-center border">Consecutivo</th>
            <th className="text-center border">Fecha Ingreso</th>
            <th className="text-center border">Objeto</th>
            <th className="text-center border">Novedades</th>
            <th className="text-center border">Estado</th>
          </tr>
        </thead>

        <tbody>
          {contratos && contratos.length > 0 ? (
            contratos.map((contrato) => {
              const isExpanded = expandedRows[contrato.id];
              const objetoTexto = contrato.objeto || "";
              const needsTruncate = objetoTexto.length > MAX_CHARS;
              const displayText = isExpanded
                ? objetoTexto
                : objetoTexto.slice(0, MAX_CHARS) + (needsTruncate ? "..." : "");

              return (
                <tr key={contrato.id} className="hover:bg-gray-100 transition-colors">
                  <td className="pl-2">{contrato.TipoContrato}</td>
                  <td className="pl-2 text-center">{contrato.consecutivo}</td>
                  <td className="pl-2 text-center">{contrato.fechaIngreso}</td>


                
                  <td className="pl-2 py-3 whitespace-normal break-words overflow-hidden">
                    {displayText}

                    {needsTruncate && (
                      <button
                        onClick={() => toggleExpand(contrato.id)}
                        className="text-blue-600 ml-2 underline cursor-pointer"
                      >
                        {isExpanded ? "Ver menos" : "Ver más"}
                      </button>
                    )}
                  </td>

                  {/* NOVEDADES */}
                  <td className="pl-2 whitespace-normal break-words overflow-hidden">
                    {contrato.novedades}
                  </td>

                  <td className="pl-2">{contrato.estado}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No hay contratos históricos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaHistorial;

