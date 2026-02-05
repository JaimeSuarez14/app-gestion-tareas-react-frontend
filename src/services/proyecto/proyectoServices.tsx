import type { Proyecto } from "../../lib/types/Proyecto";
import apiProyecto from "./api";

const ProyectoService = () => ({
  createTarea: async (tarea: Proyecto) => {
    return await apiProyecto.post("create", tarea, {
      withCredentials: true,
    });
  },

  getAll: async () => {
    return await apiProyecto.get("",  {
      withCredentials: true,
    });
  },

  getById: async (id: string) => {
    return await apiProyecto.get<Proyecto >( `ver/${id}`,  {
      withCredentials: true,
    });
  }





})

export default ProyectoService;