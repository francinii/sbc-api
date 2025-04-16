import { API_BASE_URL } from "@/lib/config";
import { Applicant } from "@/models/applicant";
import { Rule } from "@/models/Rule";

interface APIResponse {
  prediction_label?: string;
  prediction_score?: number;
  errorMessage?: any;
  rules?: any;
}

export const submitApplicantData = async (
  applicant: Applicant
): Promise<{ sbc_model: APIResponse; score_crediticio: APIResponse; graphics?: any[] }> => {
  try {
    const mlBestModelData = {
      Age: applicant.edad,
      Monthly_Inhand_Salary: applicant.monthly_inhand_salary,
      Delay_from_due_date: applicant.delay_from_due_date,
      Monthly_Balance: applicant.balance_mensual,
      Payment_of_Min_Amount: applicant.payment_of_min_amount,
      Outstanding_Debt: applicant.outstanding_debt,
      Num_Credit_Card: applicant.num_credit_cards,
    };

    const [mlBestModelResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/models/ml-final-model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mlBestModelData),
      }),
    ]);
    const mlBestModelResult: APIResponse = await mlBestModelResponse.json();
    applicant.score_credito = mlBestModelResult.prediction_score || 0;

    const [sbcModelResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/models/sbc-inference-engine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicant),
      }),
    ]);

    if (!sbcModelResponse.ok || !mlBestModelResponse.ok) {
      throw new Error("Error en la solicitud a uno o ambos endpoints");
    }

    const sbcModelResult: APIResponse = await sbcModelResponse.json();

    const variables = [
      "Monthly_Inhand_Salary",
      "Outstanding_Debt",
      "Num_Credit_Card",
      "Age"
    ];

    const graphicsResults = await Promise.all(
      variables.map(async (variable) => {
        try {
          const response = await fetch(`${API_BASE_URL}/graphics/${variable}`);
          if (!response.ok) throw new Error("Error en respuesta");
          const data = await response.json();
          console.log(variable);
          return { variable, ...data };
        } catch (error) {
          console.warn(`No se pudo cargar la variable gráfica: ${variable}`, error);
          return null;
        }
      })
    );

    const validGraphics = graphicsResults.filter(g => g !== null);

    return {
      sbc_model: sbcModelResult,
      score_crediticio: mlBestModelResult,
      graphics: validGraphics
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
    const response = await fetch(`${API_BASE_URL}/models/sbc-inference-engine`, {
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

export const getRules = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/rules`);
    if (!response.ok) throw new Error("Error al obtener reglas");
    const rules = await response.json();
    return { rules };
  } catch (error) {
    console.error("Error al obtener reglas:", error);
    return { rules: [] };
  }
};

export const deleteRule = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rules/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar regla");
    return true;
  } catch (error) {
    console.error("Error eliminando regla:", error);
    return false;
  }
};

export const addRule = async (rule: Omit<Rule, "id">) => {
  try {
    const response = await fetch(`${API_BASE_URL}/rules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule),
    });
    if (!response.ok) throw new Error("Error al agregar regla");
    return await response.json();
  } catch (error) {
    console.error("Error agregando regla:", error);
    throw error;
  }
};