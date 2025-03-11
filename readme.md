# 🚀 Inicialización del Proyecto usando Docker

## 📌 Requisitos
Para ejecutar este proyecto, es necesario tener instalados:
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📂 Instalación y Configuración

### 🔹 Clonar el repositorio

1. Clonar el repositorio con Bash o la terminal de preferencia:
```bash
git clone https://github.com/francinii/sbc-api
cd sbc-api
```

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
```
sbc-api
├─ backend
│  ├─ alembic
│  │  ├─ env.py
│  │  ├─ README
│  │  ├─ script.py.mako
│  │  ├─ versions
│  │  │  └─ fef991ad4dc0_initial_migration.py
│  │  └─ __init__.py
│  ├─ alembic.ini
│  ├─ api
│  │  ├─ main.py
│  │  ├─ routes
│  │  │  ├─ clients.py
│  │  │  └─ model.py
│  │  └─ __init__.py
│  ├─ data
│  │  ├─ rules copy.json
│  │  ├─ rules.json
│  │  └─ __init__.py
│  ├─ database.py
│  ├─ Dockerfile
│  ├─ models
│  │  ├─ applicant_models.py
│  │  ├─ request_models.py
│  │  ├─ response_models.py
│  │  └─ __init__.py
│  ├─ readme.md
│  ├─ repositories
│  │  ├─ client_repository.py
│  │  ├─ credit_repository.py
│  │  └─ __init__.py
│  ├─ requirements.txt
│  ├─ services
│  │  ├─ client_service.py
│  │  ├─ inference_motor_service.py
│  │  ├─ service.py
│  │  └─ __init__.py
│  └─ __init__.py
├─ docker-compose.yml
├─ frontend
│  ├─ app
│  │  ├─ consulta-score-crediticio
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ resultado-score
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ app-sidebar.tsx
│  │  ├─ nav-main.tsx
│  │  ├─ score-form.tsx
│  │  ├─ score-result.tsx
│  │  └─ ui
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ chart.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ input.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     └─ tooltip.tsx
│  ├─ components.json
│  ├─ Dockerfile
│  ├─ eslint.config.mjs
│  ├─ hooks
│  │  └─ use-mobile.ts
│  ├─ lib
│  │  └─ utils.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ file.svg
│  │  ├─ globe.svg
│  │  ├─ next.svg
│  │  ├─ vercel.svg
│  │  └─ window.svg
│  ├─ readme.md
│  ├─ services
│  │  └─ ejemplo.ts
│  ├─ settings
│  │  └─ app-settings.ts
│  └─ tsconfig.json
└─ readme.md

```