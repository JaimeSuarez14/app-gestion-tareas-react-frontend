import CardDashboard from "../molecules/cardDashboard";

const PanelSuperior = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <CardDashboard titulo="Tareas Registradas" value={20} />
      <div className="p-2 border w-full h-full">
        <h2 className="py-4 text-2xl font-bold tracking-wide text-center">
          Agente de Tareas
        </h2>
        <p>12.500</p>
      </div>
      <div className="p-2 border w-full h-full">
        <h2 className="py-4 text-2xl font-bold tracking-wide text-center">
          Agente de Tareas
        </h2>
        <p>12.500</p>
      </div>
      <div className="p-2 border w-full h-full">
        <h2 className="py-4 text-2xl font-bold tracking-wide text-center">
          Agente de Tareas
        </h2>
        <p>12.500</p>
      </div>
    </div>
  );
};
export default PanelSuperior;
