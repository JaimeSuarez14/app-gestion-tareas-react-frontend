import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import type { Tarea } from "../../../lib/types/Tarea";
import TareaService from "../../../services/tarea/tareaServices";
import { MdAddTask } from "react-icons/md";

export const ListaTareas = () => {
  const [word, setWord] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState<Tarea[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const consumirApi = async () => {
    setError(null);
    setLoading("Cargando...");
    try {
      const response = await TareaService().getAll();
      console.log(response);
      if (response.statusText !== "OK") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = (await response.data.tareas) as Tarea[] | Tarea;
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
  }, []);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen md:px-24 lg:px-8 lg:py-5">
      <div className="relative mb-4 flex justify-between items-center gap-2">
        <Link to={"/dashboard/tareas/create"}
          className=" bg-orange-600 hover:bg-blue-700 text-white p-2 rounded-lg font-semibold transition group"
        >
          <MdAddTask className="text-blue-600 group-hover:text-orange-400 text-2xl mr-2 inline" />
          Nueva Tarea
        </Link>

        <label htmlFor="" className="absolute -top-6 right-0">Buscar por el nombre:</label>
        <input
          type="text"
          name="name"
          placeholder="Buscar por Nombre de la Tarea"
          onChange={(e) => setWord(e.target.value)}
          className="w-fit md:w-md  p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {word.trim().length > 0 && (
          <button className="absolute top-0 right-0 bg-blue-600 h-full hover:bg-blue-700 text-white px-2 py-1 rounded-r-lg rounded-tr-lg font-semibold transition">
            Buscar
          </button>
        )}
      </div>
      {loading && (
        <p className="text-green-500 text-lg py-8 text-center">{loading}</p>
      )}

      <p className="text-red-600 text-center mb-4">{error && error}</p>
      <div className="grid max-w-screen mx-auto  lg:grid-cols-3 lg:gap-2 ">
        {data &&
          data.map((t) => (
            <div key={t._id} className="flex flex-col max-w-md sm:flex-row border-2 hover:shadow-lg  border-gray-200 rounded-lg p-6 bg-white">
              <div className="mb-4 mr-4">
                <Link to={"/dashboard/tareas/ver_tarea/"+t._id}><FaEye className="text-amber-600 hover:text-amber-700 text-3xl" /></Link>
                <CiEdit className="text-blue-600 hover:bg-blue-100 rounded-lg text-3xl" />
              </div>
              <div>
                <h6 className="text-xl font-bold leading-5 line-clamp-2">
                  {t.name}
                </h6> 
                <p className="text-sm text-gray-900 line-clamp-2">
                  { t.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
