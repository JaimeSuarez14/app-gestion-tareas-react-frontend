import { useState, type FormEvent } from "react";
import type { User } from "../lib/types/User";
import authService from "../services/auth/authsevices";
import { Link } from "react-router";
import { SiTask } from "react-icons/si";
type Estados = "typing" | "success" | "submitting";

const Register = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    email: "",
    role: "user",
  });
  const [status, setStatus] = useState<Estados>("typing");
  const [error, setError] = useState<string | null>(null);

  if (status === "success")
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ¡Registro Exitoso!
          </h2>
          <p className="text-gray-700 mb-6">
            Tu cuenta ha sido creada correctamente. Ahora puedes acceder a todas
            las funcionalidades de tu cuenta.
          </p>
          <div className="flex flex-col space-y-4">
            <Link to={"/register"}
              
              className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-500 transition duration-200"
            >
              Registrar Otro Usuario
            </Link>

            <Link 
              to={"/login"}
              className="bg-gray-600 text-white font-semibold py-2 rounded hover:bg-gray-500 transition duration-200"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );

  const registrar = async (formData: FormEvent) => {
    formData.preventDefault();
    setStatus("submitting");

    try {
      const response = await authService().create({ ...user });
      const data = await response.data;
      if (data.success) {
        setStatus("success");
        setUser({
          username: "",
          password: "",
          email: "",
          role: "user",
        });
        return;
      } else {
        setError(data.message!);
        setStatus("typing");
      }
    } catch (error: AxiosError) {
      if (error.response)
        if (error.response.status === 409) {
          setError(error.response.data.message);
        } else if (error.request) {
          console.log("No se recibió respuesta del servidor:", error.request);
          setError("No se recibió respuesta del servidor");
        } else {
          console.log("Error al configurar la solicitud:", error.message);
          setError(error.message);
        }
      setStatus("typing");
    }
  };

  const isEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidate = (user: User) => {
    const { username, password, email, role } = user;
    if (
      username.trim().length <= 3 ||
      password.trim().length < 6 ||
      isEmail(email) === false ||
      !role
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  return (
    <div className=" text-black p-6 bg-white shadow-lg rounded-2xl">
      <div>
        <img src="" alt="" /><Link to={"/"} className="text-green-800 text-2xl font-bold"><SiTask className="inline mr-2 text-amber-400" />TaskApp</Link>
        <p>¡Bienvenido/a, registrarte como nuevo usuario!
        </p>
      </div>
      <h1 className="text-2xl font-bold tracking-wide text-center py-5">
        Registrar Nuevo Usuario
      </h1>
      <div>
        <form
          onSubmit={registrar}
          className="flex flex-col gap-4 w-lg relative"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="">Username: </label>
            <input
              type="text"
              disabled={status === "submitting"}
              name="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="p-2 rounded-lg border border-blue-600 placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              disabled={status === "submitting"}
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="p-2 rounded-lg border border-blue-600 placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Email: </label>
            <div className="relative">
              <input
                type="email"
                disabled={status === "submitting"}
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="p-2 rounded-lg border border-blue-600 placeholder:text-gray-500 w-full"
              />
              {isEmail(user.email) && (
                <span className="absolute right-0 top-1 text-2xl">👌</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Rol: </label>
            <select
              name="role"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              disabled={status === "submitting"}
              className="p-2 rounded-lg border border-blue-600 placeholder:text-gray-500"
            >
              <option value="user">Usuario</option>
            </select>
          </div>
          <p className="text-sm">
            ¿Ya tiene una cuenta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              {" "}
              Inicie sesión
            </a>
          </p>
          <button
            disabled={isValidate(user) || status === "submitting"}
            className="p-2 disabled:bg-gray-300 disabled:text-gray-600 rounded-lg border bg-green-500 font-bold hover:bg-green-500/80 border-green-700"
          >
            {status === "submitting" ? "Cargando..." : "Registrar"}
          </button>

          <p className="text-red-600 text-sm font-bold">{error}</p>
          {status === "submitting" && (
            <div className="absolute bg-amber-100 opacity-20 top-0 left-0 w-full h-full flex justify-center items-center text-3xl">
              Cargando...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Register;
