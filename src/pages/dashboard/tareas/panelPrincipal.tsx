import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink } from "react-router";

const PanelPrincipal = () => {
  const listaPrincipal = [
    {
      name: "Crear Tarea",
      ruta: "/dashboard/tareas/create",
      icono: <MdAddTask className="text-blue-600 text-4xl" />,
    },
    {
      name: "Lista de Tareas",
      ruta: "/dashboard/tareas/lista",
      icono: <FaTasks className="text-green-600 text-4xl" />,
    },
    {
      name: "Editar Tarea",
      ruta: "/dashboard/tareas/lista",
      icono: <CiEdit className="text-amber-600 text-4xl" />,
    },
    {
      name: "Eliminar Tarea",
      ruta: "/dashboard/tareas/lista",
      icono: <RiDeleteBin6Line className="text-red-600 text-4xl" />,
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-fit grid grid-cols-2 gap-3">
        {listaPrincipal.map((t) => (
          <div key={t.name}>
            <NavLink
              to={t.ruta}
              className=" p-4 flex flex-col items-center gap-3 border-2 rounded-xl hover:scale-105 duration-300 shadow hover:shadow-amber-400 hover:border-amber-600"
            >
              {t.icono}
              {t.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PanelPrincipal;
