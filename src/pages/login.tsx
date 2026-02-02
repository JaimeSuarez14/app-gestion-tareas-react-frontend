import { useState, type FormEvent } from "react";
import type { UserLogin } from "../lib/types/User";
import { Link, useNavigate } from "react-router";
import authService from "../services/auth/authsevices";
import { useDispatch } from "react-redux";
import { login } from "../lib/store/features/user/userSlice";
import { SiTask } from "react-icons/si";
type Estados = "typing" | "success" | "submitting";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState<Estados>("typing");
  const [error, setError] = useState<string | null>(null);

  const iniciarSesion = async (FormEvent: FormEvent) => {
    FormEvent.preventDefault();
    setStatus("submitting");
    try {
      const response = await authService().login({ ...userLogin });
      const data = await response.data;
      if (data.success) {
        setStatus("success");
        setUserLogin({
          username: "",
          password: "",
        });
        const userData = {
          id: data.user.id,
          user: data.user.username,
          role: data.user.role,
        };

        dispatch(login(userData));
        navigate("/dashboard");
      } else {
        setError(data.message);
        setStatus("typing");
      }
    } catch (error: AxiosError) {
      if (error.response)
        if (error.response.status === 401) {
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

  const isValidate = (userLogin: UserLogin) => {
    const { username, password } = userLogin;
    if (username.trim().length <= 3 || password.trim().length < 6) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl">
      <div>
        <Link to={"/"} className="text-green-800 text-2xl font-bold"><SiTask className="inline mr-2 text-amber-400" />TaskApp</Link>
        <p>¡Bienvenido/a de nuevo!
        </p>
      </div>

      <h1 className="text-2xl font-bold tracking-wide py-5 text-center ">
        Iniciar Sesión
      </h1>
      <div>
        <form onSubmit={iniciarSesion} className="flex flex-col gap-4 w-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Username: </label>
            <input
              type="text"
              name="username"
              value={userLogin.username}
              onChange={(e) =>
                setUserLogin({ ...userLogin, username: e.target.value })
              }
              className="p-2 rounded-lg border border-blue-600 placeholder:text-gray-500"
              disabled={status === "submitting"}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={userLogin.password}
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
              className="p-2 rounded-lg border border-blue-600 placeholder:text-gray-500"
              disabled={status === "submitting"}
            />
          </div>
          <p>
            ¿No tiene una cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Cree una.
            </Link>
          </p>

          <button
            disabled={status === "submitting" || isValidate(userLogin)}
            className="p-2 rounded-lg disabled:bg-gray-300 disabled:text-gray-500 border text-amber-50 bg-green-500 font-bold hover:bg-green-500/80 border-green-700"
          >
            {status === "submitting" ? "Iniciando Sesión..." : "Iniciar"}
          </button>
          {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;
