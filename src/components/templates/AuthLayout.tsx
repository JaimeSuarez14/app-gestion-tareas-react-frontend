import { Link, NavLink, type NavLinkRenderProps } from "react-router";
import { Outlet } from "react-router";
import { SiTask } from "react-icons/si";

const AuthLayout = () => {
  const rutas = ["login", "register"];
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-black px-0 md:px-8">
      <header className=" bg-black w-full p-4">
        <nav className="flex justify-between items-center">
          <div>
            <Link to={"/"} className="text-white text-2xl font-bold">
              <SiTask className="inline mr-2 text-amber-400" />
              TaskApp
            </Link>
          </div>
          <ul className="flex gap-4 items-center py-3">
            {rutas.map((r) => (
              <li key={r}>
                <NavLink
                  className={({ isActive }: NavLinkRenderProps) =>
                    `p-2 uppercase rounded-sm border text-amber-50 font-bold hover:bg-green-500/80 border-green-700 ${isActive ? " text-amber-300 " : ""}`
                  }
                  to={`/${r}`}
                >
                  {r}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="flex-1 flex justify-center items-center w-full p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
