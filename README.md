# Proyecto de Gestión de Tareas

![Badge en construcción](https://img.shields.io/badge/estado-en%20construcción-yellow)
![Versión de React](https://img.shields.io/npm/v/react?label=react)
![Versión de Vite](https://img.shields.io/npm/v/vite?label=vite)

Este es el frontend de una aplicación de gestión de tareas construida con React, Vite y TypeScript.

## Características

*   **Autenticación de usuarios:** Registro e inicio de sesión.
*   **Gestión de tareas:** Crear, listar, ver detalles de tareas.
*   **Panel de control:** Visualización principal de las tareas.
*   **Rutas protegidas:** Solo los usuarios autenticados pueden acceder al panel de control.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
/
├── public/               # Archivos estáticos
├── src/
│   ├── assets/           # Imágenes y otros recursos
│   ├── components/       # Componentes reutilizables
│   ├── lib/              # Librerías y utilidades (Redux store)
│   ├── pages/            # Componentes de página
│   ├── routes/           # Configuración de enrutamiento
│   ├── services/         # Lógica de comunicación con la API
│   ├── App.tsx           # Componente raíz de la aplicación
│   ├── main.tsx          # Punto de entrada de la aplicación
│   └── ...
├── .gitignore
├── package.json          # Dependencias y scripts del proyecto
└── ...
```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`

Ejecuta la aplicación en modo de desarrollo.
Abre [http://localhost:5173](http://localhost:5173) para verla en tu navegador.

### `npm run build`

Compila la aplicación para producción en la carpeta `dist`.

### `npm run lint`

Ejecuta el linter para revisar el código en busca de errores.

### `npm run preview`

Ejecuta la aplicación compilada en producción.

## Dependencias Clave

*   **React:** Biblioteca para construir interfaces de usuario.
*   **Vite:** Herramienta de construcción rápida para desarrollo web moderno.
*   **TypeScript:** Superset de JavaScript que añade tipado estático.
*   **React Router:** Para el enrutamiento en la aplicación.
*   **Redux Toolkit:** Para la gestión del estado de la aplicación.
*   **Axios:** Para realizar peticiones HTTP al backend.
*   **Tailwind CSS:** Framework de CSS para un diseño rápido y personalizado.

## Endpoints de la API

La aplicación se comunica con un backend a través de los siguientes endpoints base:

*   **Autenticación:** `http://localhost:3000/api/auth/`
*   **Tareas:** `http://localhost:3000/api/tarea/`
