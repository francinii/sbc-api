# Usamos una imagen ligera de Python
FROM python:3.12.8-slim

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar la caché de Docker)
COPY backend/requirements.txt /app/

# Instalamos las dependencias
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copiamos el código de la aplicación al contenedor
COPY backend /app/

# Exponemos el puerto donde correrá FastAPI
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
