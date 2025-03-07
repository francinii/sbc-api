# 🚀 Inicialización del Proyecto usando Docker

## 📌 Requisitos
Para ejecutar este proyecto, es necesario tener instalados:

- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📂 Instalación y Configuración

Ejecuta los siguientes comandos dentro de la carpeta `sbc-api/` para inicializar el proyecto:

### 🔹 Opción 1: Construcción y ejecución en un solo paso
```sh
docker compose up --build
```

### 🔹 Opción 2: Comandos por separado
Si el comando anterior falla, puedes ejecutar los pasos por separado:
```sh
docker compose build
```
```sh
docker compose up -d
```

## 🌐 Aplicativos
Una vez iniciado el entorno con Docker, puedes acceder a los aplicativos en las siguientes direcciones:

### 🔹 Frontend
📍 [http://localhost:3000/](http://localhost:3000/)

### 🔹 Backend
📍 [http://localhost:8000/docs](http://localhost:8000/docs)

---
Si tienes algún problema, verifica que los contenedores estén corriendo con:
```sh
docker ps
```
¡Listo! Tu entorno está preparado. 🚀