"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis, ComposedChart, Line, Bar } from "recharts";
import { CircleCheckBig, CircleOff, CircleAlert } from "lucide-react";
import { JSX } from "react";

const colorMap = {
  red: "#ef4444",
  green: "#22c55e",
  brown: "#92400e",
};

export default function ScoreResult({
  score,
  reglas,
  graphics,
}: {
  score: { prediction_label: string; prediction_score: number };
  reglas: { regla: string; descripcion: string; puntos: string }[];
  graphics: any[];
}) {
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
      <h2 className={`text-xl font-semibold text-center flex items-center justify-center gap-2 ${color}`}>
        {icon}
        Resultado del Score: {label} ({score.prediction_score})
      </h2>

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
                {item.regla === "bad" ? <CircleOff className="w-5 h-5" /> : <CircleCheckBig className="w-5 h-5" />}
                {item.descripcion} 
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic">No hay reglas de evaluación registradas.</p>
          )}
        </ul>
      </div>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {graphics.map((graphic, idx) => {
          const chartData = graphic.labelx.map((x: any, i: number) => {
            const lineValues = graphic.lines.reduce((acc: any, line: any) => {
              acc[line.name] = line.data[i];
              return acc;
            }, {});
            return {
              x,
              [graphic.bar.name]: graphic.bar?.data?.[i],
              ...lineValues,
            };
          });

          return (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{graphic.title}</CardTitle>
                <CardDescription>{graphic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}}>
                  <ComposedChart data={chartData} margin={{ left: 40, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="x" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    {graphic.bar && (
                      <Bar
                        yAxisId="left"
                        dataKey={graphic.bar.name}
                        fill="#3b82f6"
                        barSize={30}
                        radius={[4, 4, 0, 0]}
                      />
                    )}
                    {graphic.lines.map((line: any) => (
                      <Line
                        key={line.name}
                        yAxisId="right"
                        dataKey={line.name}
                        stroke={colorMap[line.color as keyof typeof colorMap] || "#000"}
                        strokeWidth={2}
                        dot={{ fill: colorMap[line.color as keyof typeof colorMap] || "#000" }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </ComposedChart>
                </ChartContainer>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
