import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TareaDetails } from "../../../lib/types/Tarea";
import TareaService from "../../../services/tarea/tareaServices";
import type { AxiosResponse } from "axios";

const DetalleTarea = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<TareaDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const consumirApi = async () => {
    setError(null);
    setLoading("Cargando...");
    try {
      const response: AxiosResponse = await TareaService().getById(id!);
      console.log(response);
      if (response.statusText !== "OK") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const tarea = await response.data.tarea;
      setData(tarea);
      console.log(tarea);
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
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen md:px-24 lg:px-8 lg:py-20">
      {loading && (
        <p className="text-green-500 text-lg py-8 text-center">{loading}</p>
      )}

      <p className="text-red-600 text-center mb-4">{error && error}</p>
      {data && (
        <div className="flex flex-col max-w-5xl overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
          <div className="relative lg:w-1/2">
            <img
              src={data?.imageBy?.url ?? "/marco-vacio.avif"}
              alt=""
              className="object-cover w-full lg:absolute h-80 lg:h-full"
            />
            <svg
              className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
                {data?.userBy.username}
              </p>
            </div>
            <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
              {data?.name}
            </h5>
            <p className="mb-5 text-gray-800">
              <span className="font-bold"></span>
              {data?.description}
            </p>
            <div className="flex items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
              >
                Get started
              </button>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-purple-400 hover:text-purple-800"
              >
                Learn More
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleTarea;
