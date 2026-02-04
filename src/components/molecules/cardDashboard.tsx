const CardDashboard = ({
  titulo, value 
}: { titulo:string, value:number}) => {
  return (
    <div className="rounded-lg border bg-gray-950 text-card-foreground shadow-sm stat-card animate-scale-in">
      <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">
          {titulo}
        </h3>
        <button
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-2xl hover:brightness-125 transition-all duration-150 active:scale-95 cursor-pointer"
          data-state="closed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-dollar-sign w-5 h-5 text-white drop-shadow-sm transition-all duration-200"
          >
            <line x1="12" x2="12" y1="2" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="text-3xl font-bold text-foreground">$&nbsp;{value}</div>
      </div>
    </div>
  );
};
export default CardDashboard;
