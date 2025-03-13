// "use client";

// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { Area, AreaChart, CartesianGrid, XAxis, LineChart, Line } from "recharts";
// import { CircleCheckBig, CircleOff } from "lucide-react";

// const chartConfig = {
//   usuario: {
//     label: "Usuario",
//     color: "#2563eb",
//   },
//   promedio: {
//     label: "Promedio del Mercado",
//     color: "#60a5fa",
//   },
// };

// export default function ScoreResult({
//   CreditScore,
//   resultado,
//   chartData,
//   salarioBrutoData,
// }: {
//   CreditScore: string;
//   resultado: { regla: string; descripcion: string; puntos: string }[];
//   chartData: any[];
//   salarioBrutoData: any[];
// }) {
//   console.log(resultado);
//   return (
//     <Card className="w-full mt-6 p-6 shadow-lg bg-white">
//  {/* Encabezado con CreditScore */}
//       <h2 className="text-xl font-semibold text-center flex items-center justify-center gap-2">
//         {CreditScore === "good" ? (
//           <CircleCheckBig className="w-6 h-6 text-green-500" />
//         ) : (
//           <CircleOff className="w-6 h-6 text-red-500" />
//         )}
//         Resultado del Score: {CreditScore}
//       </h2>
//      {/* Sección de reglas (resultado) */}
//      <div className="mt-4 text-gray-700 text-center">
//         <h3 className="font-semibold">Motivos:</h3>
//         <ul className="mt-2 space-y-2">
//           {resultado.map((item, index) => (
//             <li key={index} className={`flex items-center gap-2 p-2 rounded-md ${item.regla === "bad" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
//               {item.regla === "bad" ? <CircleOff className="w-5 h-5" /> : <CircleCheckBig className="w-5 h-5" />}
//               {item.descripcion} <span className="font-semibold">({item.puntos})</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Comparación de Factores</CardTitle>
//             <CardDescription>
//               Comparación del score crediticio con el promedio del mercado
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer config={chartConfig}>
//               <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis dataKey="factor" tickLine={false} axisLine={false} tickMargin={8} />
//                 <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
//                 <Area dataKey="usuario" type="natural" fill="#2563eb" fillOpacity={0.4} stroke="#2563eb" stackId="a" />
//                 <Area dataKey="promedio" type="natural" fill="#60a5fa" fillOpacity={0.4} stroke="#60a5fa" stackId="a" />
//               </AreaChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Evolución del Salario Bruto</CardTitle>
//             <CardDescription>
//               Comparación del salario bruto del usuario con el promedio ideal para préstamos
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer config={chartConfig}>
//               <LineChart accessibilityLayer data={salarioBrutoData} margin={{ left: 12, right: 12 }}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
//                 <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//                 <Line dataKey="usuario" type="natural" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} activeDot={{ r: 6 }} />
//                 <Line dataKey="promedio" type="natural" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa" }} activeDot={{ r: 6 }} />
//               </LineChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { Area, AreaChart, CartesianGrid, XAxis, LineChart, Line } from "recharts";
// import { CircleCheckBig, CircleOff } from "lucide-react";

// const chartConfig = {
//   usuario: {
//     label: "Usuario",
//     color: "#2563eb",
//   },
//   promedio: {
//     label: "Promedio del Mercado",
//     color: "#60a5fa",
//   },
// };

// export default function ScoreResult({
//   CreditScore,
//   resultado,
//   chartData,
//   salarioBrutoData,
// }: {
//   CreditScore: string;
//   resultado: { regla: string; descripcion: string; puntos: string }[];
//   chartData: any[];
//   salarioBrutoData: any[];
// }) {
//   console.log("Resultado del Score:", resultado);
//   console.log("CreditScore:", CreditScore);
//   return (
//     <Card className="w-full mt-6 p-6 shadow-lg bg-white">
      
//       {/* ✅ Encabezado del Score */}
//       <h2 className="text-xl font-semibold text-center flex items-center justify-center gap-2">
//         {CreditScore === "good" ? (
//           <CircleCheckBig className="w-6 h-6 text-green-500" />
//         ) : (
//           <CircleOff className="w-6 h-6 text-red-500" />
//         )}
//         Resultado del Score: {CreditScore === "good" ? "Aprobado" : "Rechazado"}
//       </h2>

//       {/* ✅ Sección de Motivos (Reglas) */}
//       <div className="mt-4 text-gray-700 text-center">
//         <h3 className="font-semibold">Motivos de Evaluación:</h3>
//         <ul className="mt-2 space-y-2">
//           {resultado.length > 0 ? (
//             resultado.map((item, index) => (
//               <li
//                 key={index}
//                 className={`flex items-center gap-2 p-2 rounded-md ${
//                   item.regla === "bad" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
//                 }`}
//               >
//                 {item.regla === "bad" ? (
//                   <CircleOff className="w-5 h-5" />
//                 ) : (
//                   <CircleCheckBig className="w-5 h-5" />
//                 )}
//                 {item.descripcion} <span className="font-semibold">({item.puntos} puntos)</span>
//               </li>
//             ))
//           ) : (
//             <p className="text-gray-500 italic">No hay reglas de evaluación registradas.</p>
//           )}
//         </ul>
//       </div>

//       {/* ✅ Comparaciones Gráficas */}
//       <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
//         {/* 📊 Comparación de Factores */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Comparación de Factores</CardTitle>
//             <CardDescription>
//               Comparación del score crediticio con el promedio del mercado
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer config={chartConfig}>
//               <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis dataKey="factor" tickLine={false} axisLine={false} tickMargin={8} />
//                 <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
//                 <Area dataKey="usuario" type="natural" fill="#2563eb" fillOpacity={0.4} stroke="#2563eb" stackId="a" />
//                 <Area dataKey="promedio" type="natural" fill="#60a5fa" fillOpacity={0.4} stroke="#60a5fa" stackId="a" />
//               </AreaChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         {/* 📊 Evolución del Salario Bruto */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Evolución del Salario Bruto</CardTitle>
//             <CardDescription>
//               Comparación del salario bruto del usuario con el promedio ideal para préstamos
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer config={chartConfig}>
//               <LineChart accessibilityLayer data={salarioBrutoData} margin={{ left: 12, right: 12 }}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
//                 <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//                 <Line dataKey="usuario" type="natural" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} activeDot={{ r: 6 }} />
//                 <Line dataKey="promedio" type="natural" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa" }} activeDot={{ r: 6 }} />
//               </LineChart>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, LineChart, Line } from "recharts";
import { CircleCheckBig, CircleOff, CircleAlert } from "lucide-react";
import { JSX } from "react";

const chartConfig = {
  usuario: {
    label: "Usuario",
    color: "#2563eb",
  },
  promedio: {
    label: "Promedio del Mercado",
    color: "#60a5fa",
  },
};

export default function ScoreResult({ score, reglas, chartData, salarioBrutoData }:{
  score: { prediction_label: string; prediction_score: number };
  reglas: { regla: string; descripcion: string; puntos: string }[];
  chartData: any[];
  salarioBrutoData: any[];
}){
  console.log("Score:", score);
  console.log("Reglas:", reglas);

  // Definir etiquetas, iconos y colores para cada categoría
  const scoreLabels: Record<string, { label: string; color: string; icon: JSX.Element }> = {
    good: {
      label: "Bueno",
      color: "text-green-500",
      icon: <CircleCheckBig className="w-6 h-6 text-green-500" />,
    },
    standard: {
      label: "Estándar",
      color: "text-yellow-500",
      icon: <CircleAlert className="w-6 h-6 text-yellow-500" />,
    },
    bad: {
      label: "Malo",
      color: "text-red-500",
      icon: <CircleOff className="w-6 h-6 text-red-500" />,
    },
  };

  const { label, color, icon } = scoreLabels[score.prediction_label.toLowerCase()] || scoreLabels["bad"];

  return (
    <Card className="w-full mt-6 p-6 shadow-lg bg-white">
      
      {/* ✅ Encabezado del Score */}
      <h2 className={`text-xl font-semibold text-center flex items-center justify-center gap-2 ${color}`}>
        {icon}
        Resultado del Score: {label} ({score.prediction_score})
      </h2>

      {/* ✅ Sección de Motivos (Reglas) */}
      <div className="mt-4 text-gray-700 text-center">
        <h3 className="font-semibold">Motivos de Evaluación:</h3>
        <ul className="mt-2 space-y-2">
          {reglas.length > 0 ? (
            reglas.map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 p-2 rounded-md ${
                  item.regla === "bad" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {item.regla === "bad" ? (
                  <CircleOff className="w-5 h-5" />
                ) : (
                  <CircleCheckBig className="w-5 h-5" />
                )}
                {item.descripcion} <span className="font-semibold">({item.puntos} puntos)</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No hay reglas de evaluación registradas.</p>
          )}
        </ul>
      </div>

      {/* ✅ Comparaciones Gráficas */}
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 📊 Comparación de Factores */}
        <Card>
          <CardHeader>
            <CardTitle>Comparación de Factores</CardTitle>
            <CardDescription>
              Comparación del score crediticio con el promedio del mercado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="factor" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area dataKey="usuario" type="natural" fill="#2563eb" fillOpacity={0.4} stroke="#2563eb" stackId="a" />
                <Area dataKey="promedio" type="natural" fill="#60a5fa" fillOpacity={0.4} stroke="#60a5fa" stackId="a" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 📊 Evolución del Salario Bruto */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución del Salario Bruto</CardTitle>
            <CardDescription>
              Comparación del salario bruto del usuario con el promedio ideal para préstamos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart accessibilityLayer data={salarioBrutoData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="usuario" type="natural" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} activeDot={{ r: 6 }} />
                <Line dataKey="promedio" type="natural" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  );
}
