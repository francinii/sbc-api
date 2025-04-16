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
import { z } from "zod";

export default function ConsultaScoreCrediticio() {
  const [sbc_model, setResultado] = useState<{ regla: string; descripcion: string; puntos: string }[]>([]);
  const [score_crediticio, setCreditScore] = useState<{ prediction_label: string; prediction_score: number }>(
    {
      prediction_label: "",
      prediction_score: 0,
    }
  );
  const [graphicData, setGraphicData] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCalculate = (reglas: any, scoreData: any, graphics?: any[]) => {
    setResultado(reglas);
    setCreditScore(scoreData);
    if (graphics) setGraphicData(graphics);
  };

  const form = useForm<z.infer<typeof ScoreFormSchema>>({
    resolver: zodResolver(ScoreFormSchema),
    defaultValues: {
      tipoDocumento: "cedula",
      cedula: "",
      nombre: "",
      apellido: "",
      ocupacion: "Developer",
      meses_trabajando: 0,
      salario_mensual: 0,
      deuda_total: 0,
      cuota_mensual_total: 0,
      delay_from_due_date: 0,
      balance_mensual: 0,
      monthly_inhand_salary: 0,
      outstanding_debt: 0,
      num_credit_cards: 0,
      payment_of_min_amount: "Yes",
      monto_inversion_mensual: 0,
      experiencia_crediticia: 0,
      cantidad_prestamos_activos: 0,
      fecha_nacimiento: new Date("2000-01-01")
    }
  });

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Card className="w-full p-6 shadow-lg bg-white mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-center flex-grow">
            <Landmark className="inline-block mb-1" /> Consulta de Score Crediticio
          </h2>
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
        </div>
        {isExpanded && <ScoreForm form={form} onCalculate={handleCalculate} />}
      </Card>

      {score_crediticio.prediction_score > 0 && (
        <ScoreResult
          score={score_crediticio}
          reglas={sbc_model}
          graphics={graphicData}
        />
      )}
    </div>
  );
}
