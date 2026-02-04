import CardDashboard from "../molecules/cardDashboard";

const PanelSuperior = () => {

  const listItems = [
    {nombre: "Tareas Registradas" ,  value: 20},
    {nombre: "Tareas Registradas" ,  value: 20},
    {nombre: "Tareas Registradas" ,  value: 20},
    {nombre: "Tareas Registradas" ,  value: 20},
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      { listItems.map(l => (
        
        <CardDashboard key={l.nombre} titulo={ l.nombre } value={ l.value} />
      )) }
      
    </div>
  );
};
export default PanelSuperior;
