import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import authService from '../../services/auth/authsevices';
import type { User } from '../../lib/types/User';

const AjustesPerfil: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user.username) {
      setFormData(prev => ({ ...prev, username: user.username || '' }));
      // Asumir que email no está en el slice, quizás obtener del API
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedUser: Partial<User> = {
        _id: user.id,
        username: formData.username,
        email: formData.email,
        // Para password, quizás un endpoint separado, pero por simplicidad, incluir
      };
      await authService().update(updatedUser as User);
      setSuccess('Perfil actualizado correctamente');
    } catch (err) {
      setError('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-gray-950 rounded-lg shadow-md transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
      <h3 className="text-xl font-semibold mb-4">Ajustes de Perfil</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre de Usuario</label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
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
          <label className="block text-sm font-medium mb-1">Contraseña Actual</label>
          <Input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Contraseña actual"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Nueva contraseña"
          />
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </form>
    </div>
  );
};

export default AjustesPerfil;