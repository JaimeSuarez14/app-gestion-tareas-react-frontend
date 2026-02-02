import axios from "axios";

//instancia creada
const apiUser = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
  headers: { "Content-type": "application/json" },
});

export default apiUser;