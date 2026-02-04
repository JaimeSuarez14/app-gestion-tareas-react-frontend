import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import authService from '../../services/auth/authsevices';

interface ModalCrearUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const ModalCrearUsuario: React.FC<ModalCrearUsuarioProps> = ({ isOpen, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'admin',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService().create(formData);
      onUserCreated();
      onClose();
      setFormData({ username: '', email: '', password: '', role: 'user' });
    } catch (err) {
      setError('Error al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-md transform transition-transform duration-300 scale-100">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Usuario</label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearUsuario;