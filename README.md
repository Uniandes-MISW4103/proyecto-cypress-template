# Proyecto Base: Pruebas End to End con Cypress

Cypress es un framework moderno y fácil de usar para realizar pruebas E2E. Ofrece una interfaz intuitiva y herramientas integradas para depuración. Es ideal para pruebas en aplicaciones web modernas.

Este repositorio cuenta con la configuración base de Cypress para la automatización de pruebas E2E.

## Requisitos Básicos

- Node.js (versión 22 o superior). Recomendamos utilizar la versión `lts/jod`.
- npm para la gestión de dependencias.

## Instalación

Desde la **raíz del repositorio**, instala las dependencias y prepara la herramienta:

```bash
npm run cypress:install
npm run cypress:prepare
```

O bien, desde el directorio del módulo:

```bash
npm install
npm run prepare
```

## Ejecución de Pruebas

Desde la **raíz del repositorio**:

- Para ejecutar las pruebas en modo headless:

  ```bash
  npm run cypress:test
  ```

- Para ejecutar las pruebas con interfaz gráfica:

  ```bash
  npm run cypress:ui
  ```

O bien, desde el directorio del módulo:

- Para ejecutar las pruebas en modo headless:

  ```bash
  npm test
  ```

- Para ejecutar las pruebas con interfaz gráfica:

  ```bash
  npm run test:ui
  ```

## Configuración

1. **`cypress.config.js`**: Este archivo contiene la configuración principal de Cypress. Actualiza el campo `baseUrl` con la URL de la aplicación bajo prueba:

   ```javascript
   const { defineConfig } = require("cypress");

   module.exports = defineConfig({
     projectId: "7929191-23fa-4724-ae83-7da6a71391ca",
     e2e: {
       baseUrl: "https://angular-6-registration-login-example.stackblitz.io",
     },
   });
   ```

   - `projectId`: Identificador único del proyecto.
   - `baseUrl`: URL base de la aplicación bajo prueba. Actualiza este valor según tu entorno.

Asegúrate de revisar y personalizar estas configuraciones según las necesidades de tu proyecto.
