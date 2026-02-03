import Home from "../pages/dashboard/home";
import { BrowserRouter, Route, Routes } from "react-router";
import Tareas from "../pages/dashboard/tareas";
import GestionUsuarios from "../pages/dashboard/gestionUsuarios";
import Post from "../pages/dashboard/ObtenerPost";
import Login from "../pages/login";
import Register from "../pages/register";
import DashboardLayout from "../components/templates/DashboardLayout";
import AuthLayout from "../components/templates/AuthLayout";
import HomeCliente from "../pages/home";
import PanelPrincipal from "../pages/dashboard/tareas/panelPrincipal";
import CrearTarea from "../pages/dashboard/tareas/crearTarea";
import { ListaTareas } from "../pages/dashboard/tareas/listaTareas";
import DetalleTarea from "../pages/dashboard/tareas/detalleTarea";
import MenuOpciones from "../pages/dashboard/tareas/menuOpciones";
import PaginaHome from "../pages/dashboard/tareas/menuOpciones/paginaHome";

const RouterF = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="tareas" element={<Tareas />}>
            <Route index element={<PanelPrincipal />} />
            <Route path="menu" element={<MenuOpciones />}>
              <Route index element={<PaginaHome />} />
            </Route>
            <Route path="create" element={<CrearTarea />} />
            <Route path="lista" element={<ListaTareas />} />
            <Route path="ver_tarea/:id" element={<DetalleTarea />} />
          </Route>
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="fetch-post" element={<Post />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<HomeCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouterF;
