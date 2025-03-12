
# 🚀 Configuración del proyecto


## 📌 Prerequisitos
Para ejecutar este proyecto, es necesario tener instalados git, docker y docker compose:
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)


## 📌 Clonar los archivos en tu computadora
Nota: es requerido descargar dos repositorios. 
- El primer repositorio contiene el backend y fronted del sistema basado en conocimiento. 
- El segundo repositorio corresponde al modelo creado. 
Para esto es necesario clonar el repositorio en tu local. Para esto, diríjase a la carpeta de su preferencia y ejecute los siguientes comandos


Sistema basado en conocimiento
```sh
git clone https://github.com/francinii/sbc-api.git
```

Modelo
```sh
git https://github.com/adoljc87/SCORE.git
```

```sh
cd sbc-api
```

# 🚀 Inicialización del Proyecto sbc-api usando Docker
## 📂 Requisitos
1. Antes de correr la aplicación es necesario agregar el archivo "mejor_modelo_pycaret.pkl" en la carpeta backend/data/mejor_modelo_pycaret.pkl
Este archivo se adjunta en la carpeta comprimida, sin embargo, tambien puede generarse corriendo el modelo desde el proyecto SCORE previamente descargado. 


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