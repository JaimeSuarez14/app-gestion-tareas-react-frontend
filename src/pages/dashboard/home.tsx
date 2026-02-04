import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import PanelSuperior from "../../components/organisms/panelSuperior";
import TituloPanel from "../../components/organisms/tituloPanel";
import { RxDashboard } from "react-icons/rx";


export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  professor: string;
  schedule: string;
};

const defaultCourses: Course[] = [
  {
    id: "c1",
    code: "INF-401",
    name: "Ingenieria de Software",
    credits: 4,
    professor: "Dr. María López",
    schedule: "Lun / Mié 08:00 - 10:00",
  },
  {
    id: "c2",
    code: "BD-420",
    name: "Base de datos",
    credits: 3,
    professor: "Ing. Carlos Ramírez",
    schedule: "Mar / Jue 10:00 - 12:00",
  },
  {
    id: "c3",
    code: "IA-410",
    name: "Inteliginciaa Artificial",
    credits: 3,
    professor: "Dra. Ana Pérez",
    schedule: "Vie 14:00 - 17:00",
  },
];

const data = [
  {
    name: "Page A",
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 300,
    pv: 4567,
    amt: 2400,
  },
  {
    name: "Page C",
    uv: 320,
    pv: 1398,
    amt: 2400,
  },
  {
    name: "Page D",
    uv: 200,
    pv: 9800,
    amt: 2400,
  },
  {
    name: "Page E",
    uv: 278,
    pv: 3908,
    amt: 2400,
  },
  {
    name: "Page F",
    uv: 100,
    pv: 4800,
    amt: 2400,
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center md:px-10 py-2 w-full gap-5">
      <TituloPanel iconTypea={<RxDashboard  />} titulo="Dashboard"/>
      <PanelSuperior />

      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-4 md:col-span-2  border w-full h-full">wwwww</div>
        <div className="col-span-4 md:col-span-2  p-4 bg-amber-700/50">
          <div className="overflow-x-auto w-full">
            <p className="text-2xl font-bold tracking-wide py-2 ">
              Lista de cursos
            </p>
            <table className="text-sm w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-2">Código</th>
                  <th className="px-2">Nombre</th>
                  <th className="px-2">Créditos</th>
                  <th className="px-2">Profesor</th>
                  <th className="px-2">Horario</th>
                </tr>
              </thead>
              <tbody>
                {defaultCourses.map((d) => (
                  <tr key={d.id} className="border">
                    <td className="px-2">{d.code}</td>
                    <td className="px-2">{d.name}</td>
                    <td className="px-2">{d.credits}</td>
                    <td className="px-2">{d.professor}</td>
                    <td className="px-2 line-clamp-2">{d.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-4 md:col-span-1 border-2 w-full h-full p-4 bg-black">
          <h2>Diagrama 1</h2>
          <div className="mt-4 text-sm">
            <LineChart
              style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
              responsive
              data={data}
            >
              <CartesianGrid />
              <Line dataKey="uv" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis />
              <Legend />
            </LineChart>
          </div>
        </div>
        <div className="col-span-4 md:col-span-2 border-2 w-full h-full p-4 bg-orange-950">
          <h2>Diagrama 2</h2>
          <div className="">
            <LineChart
              style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
              responsive
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 5,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="purple"
                strokeWidth={2}
                name="My data series name"
              />
              <XAxis dataKey="name" />
              <YAxis
                width="auto"
                label={{ value: "UV", position: "insideLeft", angle: -90 }}
              />
              <Legend align="right" />
            </LineChart>
          </div>
        </div>
        <div className="col-span-4 md:col-span-1 border-2 w-full h-full p-4 bg-black">
          <h2>Diagrama 3</h2>
          <div className="">
            <LineChart
              style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
              responsive
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 5,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="purple"
                strokeWidth={2}
                name="My data series name"
              />
              <XAxis dataKey="name" />
              <YAxis
                width="auto"
                label={{ value: "UV", position: "insideLeft", angle: -90 }}
              />
              <Legend align="right" />
              <Tooltip />
            </LineChart>
          </div>
        </div>
      </div>
    </main>
  );
}
