
# 🚀 Configuración del proyecto


## 📌 Prerequisitos
Para ejecutar este proyecto, es necesario tener instalados git, docker y docker compose (se recomienda Compose V2):
- El proyecto fue probado en sistemas operativos con Windows.
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)
--- 

## 📌 Clonar los archivos en tu computadora
Nota: es requerido descargar dos repositorios. 
- El primer repositorio "sbc-api" contiene el backend y frontend del sistema basado en conocimiento. 
- El segundo repositorio "SCORE" corresponde al proceso de análisis de las variables del modelo.



Sistema basado en conocimiento
```sh
git clone https://github.com/francinii/sbc-api.git
```

Modelo
```sh
git clone https://github.com/adoljc87/SCORE.git
```
Nos dirijimos a la carpta del proyecto

```sh
cd sbc-api
```
---
# 🚀 Inicialización del Proyecto sbc-api usando Docker
## 📂 Requisitos
1. Antes de correr la aplicación es necesario agregar el archivo **"modelo_final.pkl"** en la carpeta **backend/data/modelo_final.pkl** del proyecto sbc-api
Para usar el modelo hay dos opciones. 
- **Opción 1:** Crear el ".pkl". Se debe correr este proyecto desde colab https://colab.research.google.com/drive/1qdICHMB16XyHOjfR2Aw3-Eduz3G0tLnS?usp=sharing (Se dieron permisos a la cuenta del profesor asociada al Cenfotec). Una vez en Colab puede correr celda por celda el cuaderno o bien, en el menú principal seleccionar "Entorno de ejecución" -> "Ejecutar todo".
Una vez ejecutado el cuaderno, se debe descargar el archivo mejor_modelo_pycaret.pkl (El archivo se puede visualizar en Colab en el menú lateral último icono de carpeta).
Importante: El proceso de ejecución del modelo puede tardar 15 minutos aproximadamente.
- **Opción 2:** Usar el pkl que se adjunto en el .zip descargado.(Esto depende de si la plataforma Moodle nos deje cargar el archivo ya que es un archivo pesado).


## 📂 Instalación y Configuración
Ejecuta los siguientes comandos dentro de la carpeta `sbc-api/` para inicializar el proyecto:

### 🔹Comando para construir el contenedor

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
**Nota importante**: En el archivo "Avance Proyecto I" se adjuntan algunos ejemplos de como se pueden realizar pruebas desde el Frontend.
Es posible que la llamada del modelo desde el formulario de la interfaz dure un poco. (Si la solicitud está en proceso, se verá el botón como "Procesando").
**Nota importante 2**: para correr en batch se adjunta en el .zip un archivo "applicants_sample.xlsx" que puede correrse como ejemplo.


### 🔹 Backend
📍 [http://localhost:8000/docs](http://localhost:8000/docs)

---
Si tienes algún problema, verifica que los contenedores estén corriendo con:

```sh
docker ps
```
¡Listo! Tu entorno está preparado. 🚀