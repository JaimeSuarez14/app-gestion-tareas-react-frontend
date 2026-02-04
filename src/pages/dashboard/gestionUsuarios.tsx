import { useEffect, useState } from "react";
import authService from "../../services/auth/authsevices";
import type { User } from "../../lib/types/User";
import { useNavigate } from "react-router";
import { FaUsers } from "react-icons/fa";
import TituloPanel from "../../components/organisms/tituloPanel";

const GestionUsuarios = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const consumirApi = async () => {
    setError(null);
    setLoading("Cargando...");
    try {
      const response = await authService().getAll();
      console.log(response);
      if (response.statusText !== "OK") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = (await response.data.users) as User[] | User;
      if (Array.isArray(users)) {
        setData(users);
        return;
      }
      setData([users]);
    } catch (e: AxiosError) {
      console.error(e);
      if (e.status === 401) {
        navigate("/login");
      }
      setError("Error al consumir la API");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    consumirApi();
  },[]);

  return (
    <div className="w-full sm:px-8">
      <TituloPanel titulo="Lista de Usuarios" iconTypea={<FaUsers />} description="Visualizar la lista de usuarios" />
      <hr className="py-5" />
      {loading && (
        <p className="text-green-500 text-lg py-8 text-center">{loading}</p>
      )}

      <p className="text-red-600 text-center mb-4">{error && error}</p>
      <div className="flex justify-center items-center w-full">
        <div className="relative overflow-x-auto  bg-blue-950 shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-gray-900 font-bold border-b border-default-medium">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  <span className="">Acción</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((user) => (
                  <tr
                    className="bg-neutral-primary-soft hover:bg-amber-950 border-b border-default hover:bg-neutral-secondary-medium"
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      {user._id}
                    </th>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-fg-brand hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="py-2">
                  <td className="text-center py-5" colSpan={5}>
                    No hay libros actualmente...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionUsuarios;
