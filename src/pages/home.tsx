import { Link } from "react-router"

const HomeCliente = () => {
  return (
    <div className="w-full grid grid-cols-3">
      <div className="col-span-1 px-5 flex flex-col justify-center items-start">
        <h1 className="text-4xl font-extrabold  py-5">Tu tareas bien administradas
        </h1>
        <p>
          Únete a los más de 50 millones de profesionales que simplifican el trabajo y la vida con la aplicación de listas de tareas n.º 1 del mundo.
        </p>
        <div className="py-5">
          <h2 className="font-extralight text-blue-600">Crear tus proyectos de manera rapida</h2>
        </div>
        <Link to={"/login"}
        className="inline w-auto px-2 py-4 uppercase rounded-xl border text-green-800 shadow-2xl shadow-amber-500 font-bold hover:bg-green-500/80 border-green-700 hover:text-amber-50 hover:-translate-y-1 duration-100 transform transition-all"
          >Probar ahora mismo
        </Link>
      </div>
     
      <div className="col-span-2">
        <img src="https://res.cloudinary.com/imagist/image/fetch/q_auto,f_auto,c_scale,w_960/https%3A%2F%2Fwww.todoist.com%2Fstatic%2Fhome-teams%2Fintro%2Fwide%2Fheaderui.es.png" alt="" />
      </div>
    </div>
  )
}
export default HomeCliente;