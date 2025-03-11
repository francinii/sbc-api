#FROM python:3.12.8-slim
FROM python:3.9-slim
WORKDIR /app
RUN apt-get update && apt-get install -y libgomp1
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt
COPY . .
#EXPOSE 8000
CMD ["sh", "-c", "alembic upgrade head && uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload"]
