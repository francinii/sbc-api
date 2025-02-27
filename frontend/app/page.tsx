export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Bienvenido al Sistema de Score Crediticio</h1>
      <p className="text-lg text-gray-600 mt-2">Consulta tu score de forma rápida y sencilla.</p>
      <a href="/consulta-score-crediticio" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Consultar Score Crediticio
      </a>
    </main>
  );
}
