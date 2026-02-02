import axios from "axios";

//instancia creada
const apiTarea = axios.create({
  baseURL: "http://localhost:3000/api/tarea/",
  headers: { "Content-type": "application/json" },
});

export default apiTarea;