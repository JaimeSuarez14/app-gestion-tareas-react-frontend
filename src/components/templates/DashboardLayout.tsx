import { useDispatch, useSelector } from "react-redux";
import {  NavLink, Outlet, useNavigate, type NavLinkRenderProps, Navigate } from "react-router";
import { logout } from "../../lib/store/features/user/userSlice";
import authService from "../../services/auth/authsevices";
import { useState } from "react";
import type { RootState } from "../../lib/store/store";
import { FaRegUser } from "react-icons/fa";
import type { AxiosError } from "axios";
import { BiDockLeft } from "react-icons/bi";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { CiLogout } from "react-icons/ci";


const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { username, role } = useSelector((state: RootState) => state.user);

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = async () => {
    try {
      const response = await authService().logout();
      const data = await response.data;
      if (data.ok) {
        dispatch(logout());
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (error: AxiosError) {
      if (error) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
        }
      } else if (error.request) {
        console.log("No se recibió respuesta del servidor:", error.request);
        setError("No se recibió respuesta del servidor");
      } else {
        console.log("Error al configurar la solicitud:", error.message);
        setError(error.message);
      }
    }
  };

  const rutas = [
    {path : "/",icon: <FaHome />},
    {path : "tareas",icon: <GoTasklist />},
    {path: "usuarios",icon: <FaRegUser />},
    {path: "fetch-post",icon: <GoTasklist />},
    {path: "register",icon: <GoTasklist />},
  ];
  return (
    <div className={"min-h-screen bg-green-950 text-white flex relative"}>
      <div className={`absolute top-0 left-0 p-0 ${isOpen ? 'hidden' : 'group'}`}>
        <button className="p-0" >
          < BiMenuAltLeft className="text-right p-2 hover:text-amber-800 z-10 text-4xl bg-amber-400 rounded-br-3xl" onClick={handleIsOpen} />
        </button>
        <div className="hidden group-hover:block absolute top-9 left-0 w-fit">
          {
            <nav className="mt-4 flex flex-col gap-3">
              {rutas.map((item) => (
                <NavLink
                  key={item.path}
                  to={`${item.path == "/" ? "/dashboard" : "/dashboard/" + item.path}`}
                  end={item.path === "/"}   // 🔥 CLAVE
                  className={({ isActive }: NavLinkRenderProps) => `text-left px-4 py-2 rounded-xl flex items-center gap-2 transition capitalize ${isActive ?  "bg-amber-950": " bg-black hover:bg-white hover:text-black"}` }
                >
                  {item.icon}
                  <span>{`${item.path == "/" ? "Home" : item.path}`}</span>
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="text-left px-4 py-2 rounded-xl bg-red-700 hover:opacity-90 cursor-pointer transition capitalize flex items-center gap-2"
              >
              <CiLogout />
              <span>Cerrar Sesión</span>  
              </button>
            </nav>
          }
        </div>
      </div>

      <aside className={`bg-black/50 backdrop-blur-xl border-l border-white/10  shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'w-72 px-8 py-2 flex flex-col gap-6' : 'w-0'}`}>
        <div>
          <h1 className="text-2xl font-bold tracking-wide flex justify-between items-center">
            TaskApp
            <BiDockLeft className="inline text-right -mr-2 hover:text-amber-400" onClick={handleIsOpen} />

          </h1>
          <h1 className="text-ms font-normal tracking-wide"><FaRegUser className="inline mr-2" />{username}</h1>
          <h1 className="text-ms font-normal text-amber-300 tracking-wide">{role}</h1>
          {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
        </div>

        <nav className="mt-4 flex flex-col gap-3">
          {rutas.map((item) =>{
            const path = item.path === "/" ? "/dashboard" : `/dashboard/${item.path}`;
             return (<NavLink
              key={item.path}
              to={path}
              end={item.path === "/"}   // 🔥 CLAVE

              className={({ isActive }: NavLinkRenderProps) => `text-left px-4 py-2 rounded-xl flex items-center gap-2 transition capitalize ${isActive ?  "bg-amber-950": " bg-black/50 hover:bg-white/20"}` }
            >
              {item.icon}
              <span>{`${item.path == "/" ? "Home" : item.path}`}</span>
            </NavLink>
          )})}

          <button
            onClick={handleLogout}
            className="text-left px-4 py-2 rounded-xl bg-red-700 hover:opacity-90 cursor-pointer transition capitalize flex items-center gap-2"
          >
            <CiLogout />
            Cerrar Sesión
          </button>
        </nav>

      </aside>
      <Outlet />
    </div>
  );
};
export default DashboardLayout;
