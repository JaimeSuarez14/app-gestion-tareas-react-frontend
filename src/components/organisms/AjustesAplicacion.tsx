import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const AjustesAplicacion: React.FC = () => {
  const [appName, setAppName] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const savedAppName = localStorage.getItem('appName');
    const savedLogo = localStorage.getItem('appLogo');
    if (savedAppName) setAppName(savedAppName);
    if (savedLogo) setLogoPreview(savedLogo);
  }, []);

  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      localStorage.setItem('appName', appName);
      if (logoPreview) {
        localStorage.setItem('appLogo', logoPreview);
      }
      setSuccess('Configuración de aplicación guardada correctamente');
    } catch (err) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-gray-950 rounded-lg shadow-md transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
      <h3 className="text-xl font-semibold mb-4">Ajustes de la Aplicación</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre de la Aplicación</label>
          <Input
            name="appName"
            value={appName}
            onChange={handleAppNameChange}
            placeholder="Nombre de la aplicación"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Logo de la Aplicación</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {logoPreview && (
            <img src={logoPreview} alt="Logo Preview" className="mt-2 w-20 h-20 object-cover rounded" />
          )}
        </div>
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Configuración'}
        </Button>
      </form>
    </div>
  );
};

export default AjustesAplicacion;