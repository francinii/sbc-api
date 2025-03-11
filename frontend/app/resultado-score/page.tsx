import { Card, CardContent } from "@/components/ui/card";
import { ExampleServices } from "@/services/ejemplo";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Promedio", score: 75 },
  { name: "Usuario", score: 80 },
];

export default function ResultadoScore() {

  const loadExample = async () => {
    try {
      const exampleData = await ExampleServices.fetchExample("0.2", "0.3");
      return (<p>{exampleData}</p>)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-4">
        <h2 className="text-xl font-semibold mb-4">Resultado de Score Crediticio</h2>
        <CardContent>
          <p className="text-lg font-semibold text-center">Es Apto</p>
          {/* <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer> */}
          { loadExample }
        </CardContent>
      </Card>
    </div>
  );
}
