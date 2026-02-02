import { Link } from "react-router";
import { FaCirclePlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

const MenuOpciones = () => {
  return (
    <div className="w-full">
      <section>
        <ul>
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
    </div>
  );
};
export default MenuOpciones;
