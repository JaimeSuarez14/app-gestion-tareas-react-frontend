import { Link } from "react-router"
import { FaCirclePlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";


const MenuOpciones = () => {
  return (
    <div className="w-full">
      <section>
        <ul>
          <li>
            <Link to=""><FaCirclePlus />Añadir Tarea</Link> 
            <Link to=""><CiSearch />Añadir Tarea</Link> 
            <Link to="">Hoy</Link> 
            <Link to="">Proximo</Link> 
            <Link to="">Filtros y Etiquetas</Link> 
          </li>
        </ul>
      </section>
    </div>
  )
}
export default MenuOpciones