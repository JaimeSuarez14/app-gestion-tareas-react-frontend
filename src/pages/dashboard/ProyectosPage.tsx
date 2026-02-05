
import { useEffect, useState } from "react";
import type { Proyecto } from "../../lib/types/Proyecto";
import ProyectoService from "../../services/proyecto/proyectoServices";
import TituloPanel from "../../components/organisms/tituloPanel";
import { BsBuildingCheck } from "react-icons/bs";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const proyectoService = ProyectoService();

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setLoading(true);
        const response = await proyectoService.getAll();       
        const proy = (await response.data.proyectos) as Proyecto[] || [];     
        setProyectos(proy || []);
        setError(null);
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
        setError("No se pudieron cargar los proyectos");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Cargando proyectos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 bg-linear-to-br from-slate-950 to-slate-800">
      
      <TituloPanel titulo="Proyectos" iconTypea={<BsBuildingCheck />}  description="Gestiona y visualiza todos tus proyectos"/>

      {proyectos.length === 0 ? (
        <div className="flex items-center justify-center h-96 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-gray-400 text-lg">No hay proyectos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.length>0 && proyectos.map((proyecto) => (
            <div
              key={proyecto._id}
              className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 hover:bg-slate-700/70 transition-colors cursor-pointer group"
            >
              {/* Encabezado del proyecto */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {proyecto.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Por: {proyecto.userBy?.username || "Usuario"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    proyecto.state === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : proyecto.state === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {proyecto.state}
                </span>
              </div>

              {/* Descripción */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {proyecto.description}
              </p>

              {/* Información del proyecto */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div className="bg-slate-800/50 rounded p-3">
                  <p className="text-gray-400">Creado</p>
                  <p className="text-white font-semibold">
                    {new Date(proyecto.createdAt).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <p className="text-gray-400">Actualizado</p>
                  <p className="text-white font-semibold">
                    {new Date(proyecto.updatedAt).toLocaleDateString("es-ES")}
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2 pt-4 border-t border-slate-600">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold transition-colors">
                  Ver Detalles
                </button>
                <button className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 rounded text-sm font-semibold transition-colors">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proyectos;
