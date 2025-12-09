# README.md

# 🥋 Dojo VMC - Sistema de Gestión de Empleados/Estudiantes

Este es el proyecto de **Análisis y Desarrollo de Software (ADSO) SENA** implementando una aplicación web para la gestión integral de Estudiantes, Senseis y Administradores (CRUD completo).

La aplicación sigue una arquitectura de **Cliente-Servidor (Full Stack)**.

## ⚙️ Arquitectura y Tecnologías

El proyecto se divide en dos módulos principales:

| Módulo | Carpeta | Tecnologías Clave | Descripción |
| :--- | :--- | :--- | :--- |
| **Backend (Servidor)** | `backend/` | **Node.js, Express.js, Mongoose** | API RESTful que maneja la lógica de negocio, la conexión a la base de datos (MongoDB) y define los *endpoints* CRUD. |
| **Frontend (Cliente)** | `frontend/` | **HTML, CSS, JavaScript** | Interfaz de usuario moderna (estilo Vercel) y responsive, que consume la API del Backend. |

### Base de Datos

  * **Motor:** MongoDB.
  * **ORM:** Mongoose.
  * **Colecciones:** `students`, `senseis`, `admins`.

-----

## ▶️ Guía de Despliegue y Ejecución Local

Sigue estos pasos para poner el proyecto en funcionamiento en tu máquina local.

### 1\. Requisitos Previos

Asegúrate de tener instalado lo siguiente:

  * **Node.js** (versión v22.x.x o superior)
  * **npm** (instalado automáticamente con Node.js)
  * **MongoDB** (servicio local o un cluster de MongoDB Atlas)
  * **VS Code** (o cualquier editor de código)

### 2\. Configuración e Instalación

1.  **Instalar Dependencias:** Abre la terminal y navega a la carpeta `backend`.

    ```bash
    cd backend
    npm install
    ```

2.  **Configurar MongoDB:**

      * Localiza el archivo `backend/database.js`.
      * Asegúrate de que la cadena de conexión (URI) apunte a tu instancia de MongoDB:
        ```javascript
        // Ejemplo de URI en database.js
        const URI = 'mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.mongodb.net/DojoVMC';
        ```

3.  **Configurar Nodemon:**

      * Nodemon está configurado para **ignorar** los cambios en la carpeta `frontend/` y solo reiniciar el servidor cuando se modifica un archivo en `backend/` (ver `backend/nodemon.json`).

### 3\. Arranque de Servicios

Necesitas iniciar el Backend y el Frontend por separado.

#### A. Iniciar el Backend (API REST)

Abre una terminal en la carpeta `backend/` y ejecuta:

```bash
npm run dev
# El servidor iniciará en http://localhost:3000
```

**Verificación:** La terminal debe mostrar: `Servidor activo en el puerto 3000` y `✅ Base de datos Dojo VMC conectada`.

#### B. Iniciar el Frontend (Interfaz de Usuario)

Abre el archivo `frontend/index.html` con un servidor web local (como la extensión **Live Server** de VS Code) para evitar problemas de CORS.

  * **URL de Acceso:** `http://127.0.0.1:5500/frontend/index.html` (El puerto puede variar).

-----

## 🚀 Endpoints de la API (Backend)

Todos los *endpoints* utilizan la base `http://localhost:3000/api/`.

| Módulo | Rutas | Funcionalidad |
| :--- | :--- | :--- |
| **Estudiantes** | `/students` | GET, POST, PUT, DELETE |
| **Senseis** | `/senseis` | GET, POST, PUT, DELETE |
| **Administradores** | `/admins` | GET, POST, PUT, DELETE |

-----

## 🛠️ Contribuciones y Mantenimiento

Para cualquier mantenimiento o adición de funcionalidad (ej. un nuevo módulo "Clases"), se debe seguir el patrón **MVC** establecido:

1.  **Modelo:** Crear el esquema Mongoose en `backend/models`.
2.  **Controlador:** Implementar la lógica CRUD en `backend/controllers`.
3.  **Ruta:** Definir el *endpoint* Express en `backend/routes`.
4.  **Frontend:** Crear la interfaz y el JavaScript para consumir el nuevo *endpoint*.
