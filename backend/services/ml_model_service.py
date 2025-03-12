import pandas as pd
from pycaret.classification import predict_model, load_model
import numpy as np

class MlModelService:
    def __init__(self, model_file):
        self.model = self.load_model(model_file)

    def load_model(self, model_file):
        print("📢 Loading model from:", model_file)
        model = load_model(model_file)
        print("✅ Model loaded successfully. Type:", type(model))
        return model

    def predict(self, data):
        df = pd.DataFrame([data]) #[expected_features]
        print("🔍 Data used for prediction:\n", df.head())

        # Predicción
        result = predict_model(self.model, data=df)        
        # 🔹 **Seleccionar solo las columnas deseadas**
        selected_columns = ["prediction_label", "prediction_score"]
        print("🔍 Data used for prediction:\n")
        print(result)
        result = result[selected_columns]

        # 🔹 **Convertir valores NumPy a Python estándar (int, float)**
        result = result.astype(object)
        result = result.applymap(lambda x: int(x) if isinstance(x, (np.integer, np.int8, np.int64)) 
                                 else float(x) if isinstance(x, (np.floating, np.float32, np.float64)) else x)

        # Retornar solo la primera fila como diccionario
        return result.iloc[0].to_dict()
        return {}