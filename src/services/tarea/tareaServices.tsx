import type { Tarea, TareaDetails } from "../../lib/types/Tarea";
import apiTarea from "./api";

const TareaService = () => ({
  createTarea: async (tarea: Tarea) => {
    return await apiTarea.post("tareas", tarea, {
      withCredentials: true,
    });
  },

  getAll: async () => {
    return await apiTarea.get("",  {
      withCredentials: true,
    });
  },

  getById: async (id: string) => {
    return await apiTarea.get<TareaDetails >( `ver/${id}`,  {
      withCredentials: true,
    });
  }





})

export default TareaService;