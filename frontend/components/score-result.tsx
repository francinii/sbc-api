"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, LineChart, Line } from "recharts";
import { CircleCheckBig, CircleOff } from "lucide-react";

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

export default function ScoreResult({ resultado, chartData, salarioBrutoData }: { resultado: string; chartData: any[]; salarioBrutoData: any[] }) {
  return (
    <Card className="w-full mt-6 p-6 shadow-lg bg-white">
      <h2 className="text-xl font-semibold text-center flex items-center justify-center gap-2">
        {resultado === "Es Apto" ? (
          <CircleCheckBig className="w-6 h-6 text-green-500" />
        ) : (
          <CircleOff className="w-6 h-6 text-red-500" />
        )}
        Resultado: {resultado}
      </h2>
      <p className="text-center mt-2 text-gray-700">
        {resultado === "Es Apto"
          ? "El puntaje obtenido permite al usuario acceder a tasas desde 7.5% hasta 12% para créditos que van desde $5,000 hasta $50,000."
          : "No aplica debido a un historial de pagos inconsistentes y un alto nivel de endeudamiento reciente."}
      </p>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
