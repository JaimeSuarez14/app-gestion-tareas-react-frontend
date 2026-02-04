import { useEffect, useState, useMemo } from "react";
import authService from "../../services/auth/authsevices";
import type { User } from "../../lib/types/User";
import { useNavigate } from "react-router";
import { FaUsers } from "react-icons/fa";
import TituloPanel from "../../components/organisms/tituloPanel";
import FiltrosBusqueda from "../../components/organisms/FiltrosBusqueda";
import TablaUsuarios from "../../components/organisms/TablaUsuarios";
import ModalCrearUsuario from "../../components/molecules/ModalCrearUsuario";

const GestionUsuarios = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consumirApi = async () => {
    setError(null);
    setLoading("Cargando...");
    try {
      const response = await authService().getAll();
      console.log(response);
      if (response.statusText !== "OK") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = (await response.data.users) as User[] | User;
      if (Array.isArray(users)) {
        setData(users);
        return;
      }
      setData([users]);
    } catch (e: any) {
      console.error(e);
      if (e.status === 401) {
        navigate("/login");
      }
      setError("Error al consumir la API");
    } finally {
      setLoading(null);
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return null;
    return data.filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === '' || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [data, searchTerm, filterRole]);

  useEffect(() => {
    consumirApi();
  }, []);

  const handleUserCreated = () => {
    consumirApi(); // Recargar la lista de usuarios
  };

  return (
    <div className="w-full sm:px-8">
      <TituloPanel titulo="Lista de Usuarios" iconTypea={<FaUsers />} description="Visualizar la lista de usuarios" />
      <hr className="py-5" />

      <FiltrosBusqueda
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterRole={filterRole}
        onFilterChange={setFilterRole}
        onAddUser={() => setIsModalOpen(true)}
      />

      <TablaUsuarios users={filteredData} loading={loading} error={error} />

      <ModalCrearUsuario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default GestionUsuarios;
