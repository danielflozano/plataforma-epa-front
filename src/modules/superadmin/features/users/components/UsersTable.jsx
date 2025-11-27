import { GlobalButton } from "@/components";

export const UsersTable = ({ users = [], handleOpenUpdateModal = () => {} }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 mx-auto">
      <table className="w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-epaColor1 text-white">
          <tr>
            <th className="py-4 text-center border border-white">Identificación</th>
            <th className="text-center border border-white">Nombre</th>
            <th className="text-center border border-white">Correo</th>
            <th className="text-center border border-white">Roles</th>
            <th className="text-center border border-white">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
              <td className="py-2">{user.identificacion}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <GlobalButton
                  variant="modalTwo"
                  onClick={() => handleOpenUpdateModal(user)}
                  className="block mx-auto px-3 py-0.5"
                >
                  Actualizar
                </GlobalButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center text-xl text-gray-500 font-semibold py-8">
          No se encontraron usuarios
        </div>
      )}
    </div>
  );
};
