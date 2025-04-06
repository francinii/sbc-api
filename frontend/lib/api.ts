import { API_BASE_URL } from "@/lib/config";
import { Applicant } from "@/models/applicant";

interface APIResponse {
  prediction_label?: string;
  prediction_score?: number;
  errorMessage?: any;
  rules?: any;
}

export const submitApplicantData = async (
  applicant: Applicant
): Promise<{ sbc_model: APIResponse; score_crediticio: APIResponse }> => {
  try {
    // ✅ Crear payload para el endpoint `/ml-best-model`
    const mlBestModelData = {
      Age: applicant.edad,
      Monthly_Inhand_Salary: applicant.cuota_mensual_total,
      Delay_from_due_date: applicant.delay_from_due_date,
      Monthly_Balance: applicant.balance_mensual,
    };
    
    // ✅ Realizar ambas llamadas a la API en paralelo
    const [mlBestModelResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/ml-best-model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mlBestModelData),
      }),
    ]);
    const mlBestModelResult: APIResponse = await mlBestModelResponse.json();
    applicant.score_credito = mlBestModelResult.prediction_score || 0;
  
    const [sbcModelResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/sbc-model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicant),
      }),
    ]);

    // ✅ Manejo de errores en las respuestas
    if (!sbcModelResponse.ok || !mlBestModelResponse.ok) {
      throw new Error("Error en la solicitud a uno o ambos endpoints");
    }

    // ✅ Convertir las respuestas a JSON
    const sbcModelResult: APIResponse = await sbcModelResponse.json();

    return {
      sbc_model: sbcModelResult,
      score_crediticio: mlBestModelResult,
    };
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    return {
      sbc_model: { errorMessage: "Error en la comunicación con el servidor" },
      score_crediticio: { errorMessage: "Error en la comunicación con el servidor" }
    };
  }
};

export const getSbcModel = async (applicant: Applicant): Promise<APIResponse> => {
  try {

    const response = await fetch(`${API_BASE_URL}/sbc-model`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicant),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const result: APIResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error al obtener SBC Model:", error);
    return { errorMessage: "Error en la comunicación con el servidor" };
  }
};
