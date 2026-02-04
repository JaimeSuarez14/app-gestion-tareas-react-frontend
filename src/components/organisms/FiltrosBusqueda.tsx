import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface FiltrosBusquedaProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterRole: string;
  onFilterChange: (value: string) => void;
  onAddUser: () => void;
}

const FiltrosBusqueda: React.FC<FiltrosBusquedaProps> = ({
  searchTerm,
  onSearchChange,
  filterRole,
  onFilterChange,
  onAddUser,
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-950 rounded-lg shadow-md transition-all duration-500 ease-in-out transform opacity-100 translate-y-0 ">
      <h3 className="text-lg font-semibold mb-4">Filtros y Búsqueda</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por usuario o email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="md:w-48">
          <select
            value={filterRole}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-600"
          >
            <option value="">Todos los roles</option>
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button onClick={onAddUser} className="md:w-auto">
          Agregar Usuario
        </Button>
      </div>
    </div>
  );
};

export default FiltrosBusqueda;