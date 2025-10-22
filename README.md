<div align="center">
  
  <h1>Arquetipo MFA · Nexus Portal Web (Banking Portal)</h1>

  <p>
    <strong>Fecha:</strong> 19 de Octubre, 2025 · <strong>Versión:</strong> 2.0 ⭐ ACTUALIZADO<br>
    <strong>Proyecto:</strong> Frontend Bancario Empresarial – Gestión de Clientes, Cuentas y Transacciones<br>
    <strong>Estado:</strong> ✅ DESPLEGADO EN PRODUCCIÓN
  </p>

  <p>Frontend bancario moderno basado en <strong>Angular 20</strong>, arquitectura modular y <strong>Micro Frontends (MFA)</strong>.<br>
  Diseñado con componentes reutilizables, lazy loading y optimización para producción.</p>

  <p>
    <img src="./front.png" alt="Nexus Portal Web - Banking Frontend" style="max-width: 100%; border-radius: 8px;" />
  </p>

  <p>
    <img alt="Angular" src="https://img.shields.io/badge/Angular-20-dd0031?logo=angular&logoColor=white"> 
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white"> 
    <img alt="Build" src="https://img.shields.io/badge/Build-ngx--build--plus-blue"> 
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
  </p>
</div>

---

### Producción (Demo)

- **URL pública**: [`http://vps-5405471-x.dattaweb.com:4200`](http://vps-5405471-x.dattaweb.com:4200)
- **Nota**: Este enlace apunta al entorno desplegado para demostración del portal. La ruta inicial recomendada es `\clients`.

---

### 🚀 Inicio Rápido (Frontend)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Jeffers199817/arquetipo-mfa-nexus-portal-web.git
cd arquetipo-mfa-nexus-portal-web

# 2. Instalar dependencias
npm install

# 3. Construir el proyecto (opcional, para verificar que todo compila)
npm run build

# 4. Ejecutar en modo desarrollo
npm start
# Frontend disponible en: http://localhost:4200
```

**Nota importante**: Asegúrate de tener Node.js ≥ 18.19.x instalado. El servidor de desarrollo incluye proxy automático al backend configurado en `proxy.conf.json`.

---

### Backend (Apex Core Service)

- Documento completo del proyecto – SPF MSA APEX CORE SERVICE
- Fecha: 19 de Octubre, 2025 · Versión: 2.0 ⭐ ACTUALIZADO
- Proyecto: Microservicio Bancario – Gestión de Clientes, Cuentas y Transacciones
- Enlace: [Repositorio y Endpoints API](https://github.com/Jeffers199817/spf-msa-apex-core-service/tree/main?tab=readme-ov-file#-endpoints-api)

Inicio rápido (Docker):

```bash
# Backend - construir y ejecutar
docker build -t apex-core-service.jar .
docker run -p 9090:9090 apex-core-service.jar
# API disponible en: http://localhost:9090
```

Recursos incluidos del backend:

- BaseDatos.sql – esquema y datos de prueba
- postman_collection.json – endpoints y casos de prueba
- Dockerfile – contenedor listo para producción

### Tabla de contenidos

- Introducción
- Características
- Arquitectura y rutas
- Requisitos
- Instalación y ejecución local
- Comandos disponibles
- Configuración de entornos
- Proxy de desarrollo (API)
- **Docker para desarrollo local** ⭐ [Ver guía completa](./DOCKER-LOCAL.md)
- Construcción para producción
- Despliegue con Nginx
- Despliegue con Docker Compose
- Estructura del proyecto
- Contribución y licencia

---

### Introducción

Este repositorio contiene el frontend del Portal Bancario, nombre del paquete `arquetipo-mfa-nexus-portal-web` y aplicación Angular `banking-portal`. El proyecto aprovecha Module Federation para escenarios de Micro Frontends y sigue buenas prácticas de diseño y mantenimiento.

### Características

- **Angular 20** con Standalone Components
- **Micro Frontends** con Module Federation (`@module-federation/enhanced` + `ngx-build-plus`)
- **Arquitectura modular**: `core`, `features`, `shared`
- **SCSS** y tipografías modernas (Inter)
- **RxJS** para flujos reactivos
- **Testing** con Karma + Jasmine (CLI)

### Arquitectura y rutas

- Rutas principales: `/clients`, `/accounts`, `/movements`, `/reports` (redirección por defecto a `/clients`).
- SPA con `index.html` único y navegación por `Router`.

### Requisitos

- Node.js ≥ 18.19.x (recomendado 20 LTS)
- npm ≥ 9

### Instalación y ejecución local

```bash
git clone <url-del-repositorio>
cd arquetipo-mfa-nexus-portal-web
npm install
npm start
# Disponible en http://localhost:4200
```

Nota: En modo desarrollo se aplica el `proxy.conf.json` automáticamente según `angular.json`.

### Comandos disponibles

```bash
# Desarrollo
npm start                 # ng serve (config dev + proxy)

# Build
npm run build             # build por defecto (production)
npm run build:prod        # build forzado a producción
npm run watch             # build en watch para desarrollo

# Tests
npm test                  # Karma + Jasmine (CLI)
npm run test:ci           # ChromeHeadless sin watch

# SSR (si aplica distribución SSR)
npm run serve:ssr
```

### Configuración de entornos

Los entornos viven en `src/environments`.

```ts
// src/environments/environment.ts (desarrollo)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090/spf-msa-apex-core-service',
  appName: 'arquetipo-mfa-nexus-portal-web',
  version: '1.0.0',
  enableLogging: true,
  enableMockData: false,
  features: {
    enableReports: true,
    enablePdfDownload: true,
    enableAdvancedSearch: true
  }
};
```

```ts
// src/environments/environment.prod.ts (producción)
export const environment = {
  production: true,
  apiUrl: '/spf-msa-apex-core-service',
  appName: 'arquetipo-mfa-nexus-portal-web',
  version: '1.0.0',
  enableLogging: false,
  enableMockData: false,
  features: {
    enableReports: true,
    enablePdfDownload: true,
    enableAdvancedSearch: true
  }
};
```

### Proxy de desarrollo (API)

El proxy enruta peticiones locales al backend para evitar CORS durante desarrollo.

```json
// proxy.conf.json
{
  "/spf-msa-apex-core-service": {
    "target": "http://localhost:9090",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "info"
  }
}
```

`ng serve` ya usa este proxy según `angular.json` (configuración "development").

### Construcción para producción

Salida por defecto: `dist/banking-portal`.

```bash
npm run build            # producción (output hashing, budgets)
npm run build:prod       # equivalente con flag explícito
```

El proyecto usa `ngx-build-plus` con `webpack.config.js` para habilitar Module Federation.

### Despliegue con Nginx

Se incluye una configuración lista para SPA en `nginx.conf`:

```nginx
# Redirige rutas SPA a index.html y aplica cache estática
location / {
  try_files $uri $uri/ /index.html;
}

location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

Opcionalmente, puedes exponer `/api/` hacia tu backend ajustando el `proxy_pass`.

Producción (`nginx/nginx.prod.conf`):

- Puerto: `4200`
- SPA: `try_files` a `index.html`
- Compresión y cache estática para `js/css/assets`
- Seguridad: encabezados `X-*`, `CSP` con `connect-src` al backend
- Proxy a backend: `/spf-msa-apex-core-service` → `http://vps-5405471-x.dattaweb.com:9090/spf-msa-apex-core-service`

**Desarrollo Local** (`nginx/nginx.local.conf`):

- Puerto: `4200`
- Proxy a backend local: `/spf-msa-apex-core-service` → `http://host.docker.internal:9090/spf-msa-apex-core-service`
- CORS habilitado para desarrollo

```nginx
# SPA
location / {
  try_files $uri $uri/ /index.html;
}

# Proxy API a backend (mismo path base que environment.apiUrl)
location /spf-msa-apex-core-service/ {
  proxy_pass http://vps-5405471-x.dattaweb.com:9090/spf-msa-apex-core-service/;
}

# Health
location /health { return 200 "healthy\n"; }
```

### Despliegue con Docker Compose

Se incluyen configuraciones separadas para desarrollo local y producción.

#### **Producción** (apunta al backend en producción)

```bash
# Requisitos: Docker Desktop o Docker Engine

# Construir y levantar en segundo plano
docker compose up -d --build

# Ver logs
docker compose logs -f web

# Detener y eliminar recursos
docker compose down
```

#### **Desarrollo Local** (apunta a tu backend local) ⭐

```bash
# Opción 1: Usar el script de Windows
docker-local.bat

# Opción 2: Comando manual
docker-compose -f docker-compose.local.yml up --build

# Ver logs
docker-compose -f docker-compose.local.yml logs -f

# Detener
docker-compose -f docker-compose.local.yml down
```

**📖 Guía completa**: [DOCKER-LOCAL.md](./DOCKER-LOCAL.md)

Acceso local tras el despliegue:

- Aplicación: `http://localhost:4200/clients`
- Backend (debe estar corriendo): `http://localhost:9090`

Detalles relevantes del servicio (`web`):

- Puerto mapeado: `4200:4200`
- Healthcheck: `GET http://localhost:4200/health` (responde 200 con el HTML de la app)
- **Local**: Usa `host.docker.internal` para conectar al backend en Windows

### Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── features/
│   │   ├── clients/
│   │   ├── accounts/
│   │   ├── movements/
│   │   └── reports/
│   ├── shared/
│   │   └── components/
│   └── app.routes.ts
├── environments/
└── styles.scss
```

### Arquitectura modular

- **Capas**:
  - `core`: servicios (`ApiService`, `ClientService`, etc.) y modelos Tipados
  - `shared`: componentes y utilidades reutilizables
  - `features`: páginas por dominio (`clients`, `accounts`, `movements`, `reports`)
- **Acceso a API**: `ApiService` construye URLs como `environment.apiUrl + endpoint`.
  - Dev: `http://localhost:9090/spf-msa-apex-core-service`
  - Prod: `/spf-msa-apex-core-service` (mismo origen vía Nginx)
- **Module Federation** (`webpack.config.js`): expone páginas de dominio como remotos (`remoteEntry.js`) para escenarios MFE.

**Principios de modularidad**

- Carga perezosa por ruta (`loadComponent`) para cada `feature`.
- Servicios singleton en `core/services` inyectados por `providedIn: 'root'`.
- Modelos tipados en `core/models` re-exportados mediante `core/models/index.ts`.
- Componentes de `shared` son presentacionales, sin lógica de dominio.
- Límite de dependencias: `features` no importan entre sí; se comunican vía servicios o `@Input/@Output`.
- Aliases TypeScript (`tsconfig.json`): `@core/*`, `@shared/*`, `@features/*`, `@environments/*` para imports claros y controlados.

### ¿Por qué esta arquitectura?

- **Separación por dominio**: facilita mantenimiento y escalabilidad del portal bancario.
- **Angular 20 Standalone**: menos boilerplate y mejor rendimiento.
- **Module Federation**: permite desacoplar módulos y evolucionar a microfrontends.
- **Nginx como reverse proxy**: sirve SPA eficientemente y evita CORS en producción.

### Metodología ágil (resumen práctico)

- **Backlog**: épicas (Clientes, Cuentas, Movimientos, Reportes) → historias de usuario → tareas.
- **Historia de usuario (formato)**: “Como [rol], quiero [acción] para [beneficio]”.
- **Criterios de aceptación**: lista verificable (Given/When/Then) por historia.
- **Definición de Hecho (DoD)**: funcionalidad probada, validaciones, sin errores de consola, unit tests básicos, docs/README actualizados.
- **Flujo de trabajo**: rama `feature/*` → PR a `main` con revisión → despliegue.


### Product Backlog (Frontend) — Priorización (MoSCoW)

| ID | Épica | Historia de Usuario | Prioridad | Story Points | Estado |
| --- | --- | --- | --- | --- | --- |
| E1 | Gestión de Clientes | Como admin quiero crear clientes | MUST | 8 | ✅ DONE |
| E1 | Gestión de Clientes | Como admin quiero consultar clientes | MUST | 5 | ✅ DONE |
| E1 | Gestión de Clientes | Como admin quiero actualizar clientes | MUST | 5 | ✅ DONE |
| E1 | Gestión de Clientes | Como admin quiero eliminar clientes | MUST | 3 | ✅ DONE |
| E2 | Gestión de Cuentas | Como admin quiero crear cuentas | MUST | 8 | ✅ DONE |
| E2 | Gestión de Cuentas | Como admin quiero consultar cuentas | MUST | 5 | ✅ DONE |
| E2 | Gestión de Cuentas | Como admin quiero actualizar cuentas | MUST | 5 | ✅ DONE |
| E2 | Gestión de Cuentas | Como admin quiero eliminar cuentas | MUST | 3 | ✅ DONE |
| E3 | Gestión de Transacciones | Como cajero quiero registrar depósitos | MUST | 13 | ✅ DONE |
| E3 | Gestión de Transacciones | Como cajero quiero registrar retiros | MUST | 13 | ✅ DONE |
| E3 | Gestión de Transacciones | Como cajero quiero consultar movimientos | MUST | 8 | ✅ DONE |
| E3 | Gestión de Transacciones | Como cajero quiero actualizar transacciones | SHOULD | 8 | ✅ DONE |
| E3 | Gestión de Transacciones | Como cajero quiero eliminar transacciones | SHOULD | 5 | ✅ DONE |
| E4 | Reportes y Consultas | Como gerente quiero generar reportes por fechas | MUST | 13 | ✅ DONE |
| E4 | Reportes y Consultas | Como gerente quiero exportar reportes en PDF | SHOULD | 8 | ✅ DONE |
| E5 | Validaciones de Negocio | Como sistema quiero validar saldo insuficiente | MUST | 8 | ✅ DONE |
| E5 | Validaciones de Negocio | Como sistema quiero recalcular balances | MUST | 13 | ✅ DONE |

Total Story Points: 132  
Velocidad del equipo: 40 SP por sprint  
Sprints estimados: 4 sprints

🏛️ ÉPICAS (Frontend)

ÉPICA 1: Gestión de Clientes 👥  
Descripción: UI para administración completa de clientes.

Criterios de Aceptación de la Épica:

✅ CRUD UI con formularios reactivos y validaciones  
✅ Validación de datos únicos (identificación, nombre) con validadores asíncronos  
✅ Notificaciones de éxito/error  
✅ Listado con búsqueda y paginación

ÉPICA 2: Gestión de Cuentas Bancarias 🏦  
Descripción: UI para administración de cuentas y asociación con clientes.

Criterios de Aceptación de la Épica:

✅ CRUD UI de cuentas  
✅ Relación visible con clientes (selector buscable)  
✅ Tipos de cuenta y estados  
✅ Validación de número de cuenta único

ÉPICA 3: Gestión de Transacciones 💰  
Descripción: UI para depósitos y retiros con feedback de saldo.

Criterios de Aceptación de la Épica:

✅ Registro de depósitos y retiros desde UI  
✅ Cálculo y vista de saldo antes/después  
✅ Validación de saldo insuficiente en UI  
✅ Historial visible en tabla

ÉPICA 4: Reportes y Consultas 📊  
Descripción: Pantalla de reportes por fechas, cliente y descarga PDF.

Criterios de Aceptación de la Épica:

✅ Filtros obligatorios (cliente, fechas)  
✅ Tabla con resultados y totales  
✅ Descarga de PDF en Base64  
✅ Respuesta renderizada en UI

ÉPICA 5: Validaciones de Negocio ⚡  
Descripción: Reglas de negocio reflejadas en la UI.

Criterios de Aceptación de la Épica:

✅ Bloqueos por saldo insuficiente (retiros)  
✅ Reglas de recálculo mostradas en saldos  
✅ Manejo de errores de negocio con mensajes claros  
✅ Integridad visual y de datos en tablas

📖 HISTORIAS DE USUARIO (Frontend)

HU-FE-001: Crear Cliente (UI)  
Como: Administrador del banco  
Quiero: Crear un nuevo cliente desde la interfaz  
Para: Registrar personas que desean abrir cuentas bancarias

Criterios de Aceptación:
- DADO formulario válido con campos requeridos
- CUANDO presiono “Crear”
- ENTONCES veo notificación de éxito y el cliente aparece en la tabla
- Y si identificación/nombre existen, ENTONCES veo error claro de duplicado

Tareas:
□ Crear formulario reactivo con validaciones (sincronas/asincronas)  
□ Integrar `ClientService.createClient()`  
□ Mostrar notificaciones con `NotificationService`  
□ Actualizar tabla tras creación  
□ Pruebas unitarias de validadores y componente

DoD:
✅ UI sin errores de consola  
✅ Validaciones y mensajes correctos  
✅ Tests pasando  
✅ Documentación actualizada

HU-FE-002: Registrar Depósito (UI)  
Como: Cajero del banco  
Quiero: Registrar un depósito desde la interfaz  
Para: Aumentar el saldo de la cuenta

Criterios de Aceptación:
- DADO cuenta válida seleccionada
- CUANDO ingreso valor > 0 y confirmo
- ENTONCES se registra el movimiento y se actualiza el saldo en la UI

Tareas:
□ Formulario (cuenta, tipo, valor)  
□ Integración `MovementService.createMovement()`  
□ Refrescar tabla y saldos  
□ Notificaciones

DoD:
✅ Movimiento visible en tabla  
✅ Saldos recalculados en UI  
✅ Tests básicos

HU-FE-003: Registrar Retiro (UI)  
Como: Cajero del banco  
Quiero: Registrar un retiro desde la UI  
Para: Permitir al cliente retirar dinero

Criterios de Aceptación:
- DADO saldo insuficiente
- CUANDO intento retirar
- ENTONCES el sistema bloquea la acción y muestra mensaje “Saldo no disponible”

Tareas:
□ Validación UI de saldo insuficiente  
□ Integración `MovementService.createMovement()` con monto negativo  
□ Mensajes de error claros

DoD:
✅ Validación UI activa  
✅ Mensajes claros  
✅ Tests de error

HU-FE-004: Generar Reporte (UI)  
Como: Gerente del banco  
Quiero: Generar reportes por fechas y cliente  
Para: Analizar movimientos

Criterios de Aceptación:
- DADO filtros (cliente, fechas) válidos
- CUANDO presiono “Generar Reporte”
- ENTONCES veo tabla con resultados y totales; puedo descargar PDF

Tareas:
□ Formulario de filtros  
□ Integrar `ReportService.generateAccountStatement()`  
□ Tabla y totales; descarga PDF

DoD:
✅ Datos renderizados  
✅ PDF descargable  
✅ Tests básicos


### Contribución

1. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
2. Haz commits atómicos y claros
3. Abre un Pull Request con contexto y evidencia (capturas o gifs)

### Licencia

MIT. Consulta el archivo `LICENSE` si aplica.

