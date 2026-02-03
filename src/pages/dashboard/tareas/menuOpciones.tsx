import { Link, Outlet } from "react-router";
import { FaCirclePlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

const MenuOpciones = () => {
  return (
    <div className="w-full grid  md:grid-cols-4 ">
      <section className="col-span-1">
        <ul className="flex flex-col gap-3">
          <li>
            <Link to="" className="group hover:font-medium">
              <FaCirclePlus className="inline mr-1 group-hover:text-green-600" />
              Añadir Tarea
            </Link>
          </li>
          <li>
            <Link to="" className="group hover:font-medium">
              <CiSearch className="inline mr-1 group-hover:text-green-600" />
              Buscar Tarea
            </Link>
          </li>
          <li>
            <Link to="" className="group hover:font-medium">
              <IoCalendarNumberOutline className="inline mr-1 group-hover:text-green-600" />
              Hoy
            </Link>
          </li>
          <li>
            <Link to="" className="group hover:font-medium">
              <FaRegCalendarAlt className="inline mr-1 group-hover:text-green-600" />
              Proximo
            </Link>
          </li>
          <li>
            <Link to="" className="group hover:font-medium">
              <CiFilter className="inline mr-1 group-hover:text-green-600" />
              Filtros y Etiquetas
            </Link>
          </li>
        </ul>
      </section>

      <section className="col-span-3">
      <Outlet />
      </section>
    </div>
  );
};
export default MenuOpciones;
