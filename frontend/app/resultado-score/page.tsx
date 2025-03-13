import { Card, CardContent } from "@/components/ui/card";

export default function ResultadoScore() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-4">
        <h2 className="text-xl font-semibold mb-4">Resultado de Score Crediticio</h2>
        <CardContent>
          <p className="text-lg font-semibold text-center">Es Apto</p>
        </CardContent>
      </Card>
    </div>
  );
}
