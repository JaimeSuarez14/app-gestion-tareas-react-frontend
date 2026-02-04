import React from 'react';
import { FaCog } from 'react-icons/fa';
import TituloPanel from '../../components/organisms/tituloPanel';
import AjustesPerfil from '../../components/organisms/AjustesPerfil';
import AjustesAplicacion from '../../components/organisms/AjustesAplicacion';

const Ajustes: React.FC = () => {
  return (
    <div className="w-full sm:px-8">
      <TituloPanel titulo="Ajustes" iconTypea={<FaCog />} description="Configura tu perfil y la aplicación" />
      <hr className="py-5" />

      <AjustesPerfil />
      <AjustesAplicacion />
    </div>
  );
};

export default Ajustes;
