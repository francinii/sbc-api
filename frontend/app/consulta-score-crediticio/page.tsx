// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; 
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ChevronDown, ChevronUp, Landmark } from "lucide-react";
// import ScoreForm from "@/components/score-form";
// import ScoreResult from "@/components/score-result";
// import { ScoreFormSchema } from "@/schemas/score-form-schema"; 

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

// export default function ConsultaScoreCrediticio() {
//   const [resultado, setResultado] = useState<{ regla: string; descripcion: string; puntos: string }[]>([]);
//   const [isExpanded, setIsExpanded] = useState(true);


//   const [creditScore, setCreditScore] = useState<string>("good");

//   // const form = useForm({
//   //   resolver: zodResolver(ScoreFormSchema),
//   //   defaultValues: {
//   //     tipoDocumento: undefined,
//   //     cedula: "",
//   //     nombre: "",
//   //     apellido: "",
//   //     ocupacion: "",
//   //     meses_trabajando: 0,
//   //     salario_mensual: 0,
//   //     fecha_nacimiento: undefined,
//   //     deuda_total: 0,
//   //     cuota_mensual_total: 0,
//   //   },
//   // });

//   const form = useForm({
//     resolver: zodResolver(ScoreFormSchema),
//     defaultValues: {
//       tipoDocumento: undefined,
//       cedula: "",
//       nombre: "Andres",
//       apellido: "Salas",
//       ocupacion: undefined,
//       meses_trabajando: 10,
//       salario_mensual: 10000000000000000,
//       fecha_nacimiento: undefined,
//       deuda_total: 10,
//       cuota_mensual_total: 10,
//     },
//   });

//   return (
//     <div className="flex flex-col items-center w-full p-4">
//       <Card className="w-full p-6 shadow-lg bg-white mb-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-center flex-grow">
//             <Landmark className="inline-block mb-1"/> Consulta de Score Crediticio
//           </h2>
//           <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
//             {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//           </Button>
//         </div>
//         {isExpanded && <ScoreForm form={form} onCalculate={setResultado} />}
//       </Card>
  
//       {resultado.length > 0 && (
//         <ScoreResult CreditScore={creditScore} resultado={resultado} chartData={chartData} salarioBrutoData={salarioBrutoData} />
// )}
//     </div>
//   );
  
// }

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Landmark } from "lucide-react";
import ScoreForm from "@/components/score-form";
import ScoreResult from "@/components/score-result";
import { ScoreFormSchema } from "@/schemas/score-form-schema"; 

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
  const [sbc_model, setResultado] = useState<{ regla: string; descripcion: string; puntos: string }[]>([]);
  const [score_crediticio, setCreditScore] = useState<{ prediction_label: string; prediction_score: number }>({
    prediction_label: "",
    prediction_score: 0,
  });
  const [isExpanded, setIsExpanded] = useState(true);

  // 🏷 Maneja la respuesta del formulario y actualiza estado de resultado y creditScore
  const handleCalculate = (reglas: any, scoreData: any) => {
    setResultado(reglas);
    setCreditScore(scoreData);
  };

  // ✅ Formulario con valores predeterminados
  const form = useForm({
    resolver: zodResolver(ScoreFormSchema),
    defaultValues: {
      tipoDocumento: undefined,
      cedula: "",
      nombre: "Andres",
      apellido: "Salas",
      ocupacion: undefined,
      meses_trabajando: 12,
      salario_mensual: 5000,
      fecha_nacimiento: undefined,
      deuda_total: 1000,
      cuota_mensual_total: 300,
    },
  });

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
        {isExpanded && <ScoreForm form={form} onCalculate={handleCalculate} />}
      </Card>
      
      {score_crediticio.prediction_score > 0 && (
        <ScoreResult score={score_crediticio} reglas={sbc_model} chartData={chartData} salarioBrutoData={salarioBrutoData} />
      )}
    </div>
  );
}
