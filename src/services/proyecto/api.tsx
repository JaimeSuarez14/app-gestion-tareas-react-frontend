import axios from "axios";

//instancia creada
const apiProyecto = axios.create({
  baseURL: "http://localhost:3000/api/proyecto/",
  headers: { "Content-type": "application/json" },
});

export default apiProyecto;