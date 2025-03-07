// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Area, AreaChart, CartesianGrid, XAxis, LineChart, Line } from "recharts";
// import { TrendingUp, ChevronDown, ChevronUp, Landmark, CircleCheckBig, CircleOff } from "lucide-react";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// const chartData = [
//   { factor: "Historial de Pagos", usuario: 80, promedio: 75 },
//   { factor: "Deuda Total", usuario: 65, promedio: 70 },
//   { factor: "Tiempo de Crédito", usuario: 78, promedio: 72 },
//   { factor: "Tipos de Crédito", usuario: 60, promedio: 68 },
//   { factor: "Solicitudes Recientes", usuario: 55, promedio: 65 },
//   { factor: "Nivel de Ingresos", usuario: 85, promedio: 80 },
//   { factor: "Capacidad de Pago", usuario: 70, promedio: 75 },
//   { factor: "Endeudamiento Relativo", usuario: 50, promedio: 65 },
//   { factor: "Estabilidad Laboral", usuario: 90, promedio: 80 },
//   { factor: "Uso del Crédito", usuario: 68, promedio: 72 },
// ];

// const salarioBrutoData = [
//   { year: "2014", usuario: 30000, promedio: 35000 },
//   { year: "2015", usuario: 32000, promedio: 36000 },
//   { year: "2016", usuario: 34000, promedio: 37000 },
//   { year: "2017", usuario: 36000, promedio: 39000 },
//   { year: "2018", usuario: 38000, promedio: 40000 },
//   { year: "2019", usuario: 40000, promedio: 42000 },
//   { year: "2020", usuario: 42000, promedio: 44000 },
//   { year: "2021", usuario: 44000, promedio: 46000 },
//   { year: "2022", usuario: 46000, promedio: 47000 },
//   { year: "2023", usuario: 48000, promedio: 49000 },
// ];

// const chartConfig = {
//   usuario: {
//     label: "Usuario",
//     color: "#2563eb",
//   },
//   promedio: {
//     label: "Promedio del Mercado",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig;

// export default function ConsultaScoreCrediticio() {
//   const [resultado, setResultado] = useState<string | null>(null);
//   const [isExpanded, setIsExpanded] = useState(true);

//   const calcularScore = () => {
//     const esApto = Math.random() > 0.5 ? "Es Apto" : "No es Apto";
//     setResultado(esApto);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen w-full p-4">
//       <Card className="w-full p-6 shadow-lg bg-white mb-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-center flex-grow">
//             <Landmark className="inline-block mb-4"/>Consulta de Score Crediticio
//           </h2>
//           <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
//             {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//           </Button>
//         </div>
//         {isExpanded && (
//           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//             <Input placeholder="Nombre" />
//             <Input placeholder="Apellidos" />
//             <Input placeholder="Número de cédula" />
//             <Input placeholder="Ocupación" />
//             <Input placeholder="Salario mensual" type="number" />
//             <Input placeholder="Salario anual bruto" type="number" />
//             <Input placeholder="Meses en el trabajo actual" type="number" />
//             <div className="col-span-1 md:col-span-3">
//               <Button className="w-full mt-4" onClick={calcularScore}>
//                 Consultar
//               </Button>
//             </div>
//           </CardContent>
//         )}
//       </Card>

//       {resultado && (
//         <Card className="w-full mt-6 p-6 shadow-lg bg-white">
//         <h2 className="text-xl font-semibold text-center flex items-center justify-center gap-2">
//           Resultado: {resultado}
//         </h2>
//         <p className="text-center mt-2 text-gray-700">
//           {resultado === "Es Apto"
//             ? "El puntaje obtenido permite al usuario acceder a tasas desde 7.5% hasta 12% para créditos que van desde $5,000 hasta $50,000."
//             : "No aplica debido a un historial de pagos inconsistentes y un alto nivel de endeudamiento reciente."}
//         </p>
//           <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Comparación de Factores</CardTitle>
//                 <CardDescription>
//                   Comparación del score crediticio con el promedio del mercado
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ChartContainer config={chartConfig}>
//                   <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
//                     <CartesianGrid vertical={false} />
//                     <XAxis dataKey="factor" tickLine={false} axisLine={false} tickMargin={8} />
//                     <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
//                     <Area dataKey="usuario" type="natural" fill="#2563eb" fillOpacity={0.4} stroke="#2563eb" stackId="a" />
//                     <Area dataKey="promedio" type="natural" fill="#60a5fa" fillOpacity={0.4} stroke="#60a5fa" stackId="a" />
//                   </AreaChart>
//                 </ChartContainer>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Evolución del Salario Bruto</CardTitle>
//                 <CardDescription>
//                   Comparación del salario bruto del usuario con el promedio ideal para préstamos
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ChartContainer config={chartConfig}>
//                   <LineChart accessibilityLayer data={salarioBrutoData} margin={{ left: 12, right: 12 }}>
//                     <CartesianGrid vertical={false} />
//                     <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
//                     <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//                     <Line dataKey="usuario" type="natural" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} activeDot={{ r: 6 }} />
//                     <Line dataKey="promedio" type="natural" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa" }} activeDot={{ r: 6 }} />
//                   </LineChart>
//                 </ChartContainer>
//               </CardContent>
//             </Card>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Landmark } from "lucide-react";
import ScoreForm from "@/components/score-form";
import ScoreResult from "@/components/score-result";

const chartData = [
  { factor: "Historial de Pagos", usuario: 80, promedio: 75 },
  { factor: "Deuda Total", usuario: 65, promedio: 70 },
  { factor: "Tiempo de Crédito", usuario: 78, promedio: 72 },
  { factor: "Tipos de Crédito", usuario: 60, promedio: 68 },
  { factor: "Solicitudes Recientes", usuario: 55, promedio: 65 },
  { factor: "Nivel de Ingresos", usuario: 85, promedio: 80 },
  { factor: "Capacidad de Pago", usuario: 70, promedio: 75 },
  { factor: "Endeudamiento Relativo", usuario: 50, promedio: 65 },
  { factor: "Estabilidad Laboral", usuario: 90, promedio: 80 },
  { factor: "Uso del Crédito", usuario: 68, promedio: 72 },
];

const salarioBrutoData = [
  { year: "2014", usuario: 30000, promedio: 35000 },
  { year: "2015", usuario: 32000, promedio: 36000 },
  { year: "2016", usuario: 34000, promedio: 37000 },
  { year: "2017", usuario: 36000, promedio: 39000 },
  { year: "2018", usuario: 38000, promedio: 40000 },
  { year: "2019", usuario: 40000, promedio: 42000 },
  { year: "2020", usuario: 42000, promedio: 44000 },
  { year: "2021", usuario: 44000, promedio: 46000 },
  { year: "2022", usuario: 46000, promedio: 47000 },
  { year: "2023", usuario: 48000, promedio: 49000 },
];

export default function ConsultaScoreCrediticio() {
  const [resultado, setResultado] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Card className="w-full p-6 shadow-lg bg-white mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-center flex-grow">
            <Landmark className="inline-block mb-1"/> Consulta de Score Crediticio
          </h2>
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
        </div>
        {isExpanded && <ScoreForm onCalculate={setResultado} />}
      </Card>
      {resultado && <ScoreResult resultado={resultado} chartData={chartData} salarioBrutoData={salarioBrutoData} />}
    </div>
  );
}
