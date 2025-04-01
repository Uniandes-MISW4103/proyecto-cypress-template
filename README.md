# Proyecto Base: Pruebas End to End con Cypress

Cypress es un framework moderno y fácil de usar para realizar pruebas E2E. Ofrece una interfaz intuitiva y herramientas integradas para depuración. Es ideal para pruebas en aplicaciones web modernas.

Este repositorio cuenta con la configuración base de Cypress para la automatización de pruebas E2E.

## Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`.
- npm o yarn para la gestión de dependencias.

## Instalación

Instala las dependencias necesarias utilizando npm:

```bash
npm install
npm run prepare # Instala las demás dependencias de Cypress automáticamente.
```

## Ejecución de Pruebas

Puedes ejecutar las pruebas en modo headless o con interfaz gráfica del navegador:

- Para ejecutar las pruebas en modo headless:

    ```bash
    npm test
    ```

- Para ejecutar las pruebas con interfaz gráfica:

    ```bash
    npm run test:ui
    ```

## Configuración

1. **`cypress.config.js`**: Este archivo contiene la configuración principal de Cypress. En este caso, se define el `projectId` y la URL base para las pruebas:

    ```javascript
    const { defineConfig } = require("cypress");

    module.exports = defineConfig({
      projectId: '7929191-23fa-4724-ae83-7da6a71391ca',
      e2e: {
        baseUrl: 'https://angular-6-registration-login-example.stackblitz.io',
      },
    });
    ```

    - `projectId`: Identificador único del proyecto.
    - `baseUrl`: URL base de la aplicación bajo prueba.

Asegúrate de revisar y personalizar estas configuraciones según las necesidades de tu proyecto.
