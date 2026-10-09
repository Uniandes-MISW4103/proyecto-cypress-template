# Proyecto Base: Pruebas End to End con Cypress

[Cypress](https://docs.cypress.io) es un framework de pruebas E2E para aplicaciones web. Ejecuta las
pruebas dentro del navegador, reintenta automáticamente las consultas y aserciones, y ofrece una
interfaz gráfica para ver cada comando paso a paso.

Este módulo contiene la configuración base de Cypress y un ejemplo que pueden usar como punto de
partida para las pruebas E2E del proyecto.

## Requisitos

- Node.js 24 (`lts/krypton`). El módulo incluye un `.nvmrc`, por lo que pueden usar `nvm use`.
- npm (incluido con Node.js).
- `prepare` descarga el binario de Cypress (unos cientos de MB, una sola vez por versión). En Linux
  se necesitan las [dependencias del sistema](https://docs.cypress.io/app/get-started/install-cypress#Linux-Prerequisites).

## Instalación

Desde la **raíz del repositorio** del proyecto:

```bash
npm run cypress:install
npm run cypress:prepare
```

> [!IMPORTANT]
> Instalen siempre desde la raíz. `cypress:install` deja las dependencias del módulo en su propia
> carpeta `node_modules`, aisladas de los demás módulos. Un `npm install` dentro de la carpeta del
> módulo instala en la raíz del repositorio y modifica el `package-lock.json` raíz sin ese aislamiento.

## Ejecución

| Acción | Desde la raíz | Desde `e2e/misw-4103-cypress` |
|---|---|---|
| Ejecutar las pruebas (headless) | `npm run cypress:test` | `npm test` |
| Abrir la interfaz de Cypress | `npm run cypress:ui` | `npm run test:ui` |

Por defecto las pruebas corren en Electron, el navegador que trae Cypress. Para usar otro navegador
instalado, ejecuten desde la carpeta del módulo, por ejemplo `npx cypress run --browser chrome`.

> [!NOTE]
> Cypress 16 marca Electron como obsoleto y lo retirará en una versión mayor futura. Si tienen Chrome,
> Edge o Firefox instalados, pueden usarlos desde ya con `--browser`.

## Estructura

```plaintext
misw-4103-cypress/
├── .nvmrc
├── package.json
├── abp.cjs                    # lee la configuración de la aplicación bajo pruebas (.env)
├── cypress.config.js          # configuración de Cypress
└── cypress/
    ├── e2e/tutorial.cy.js     # ejemplo incluido
    ├── fixtures/example.json  # datos de ejemplo para cy.fixture()
    └── support/               # comandos personalizados (commands.js) y configuración global (e2e.js)
```

Las capturas de pantalla de pruebas fallidas quedan en `cypress/screenshots/` (en el `.gitignore`).

## Configuración

La URL y el administrador de la aplicación bajo pruebas (ABP) están en el archivo `.env` de la raíz
del repositorio, el mismo que usa `npm run abp:up` para desplegar Ghost. No los copien en el módulo:
`abp.cjs` lee ese archivo y `cypress.config.js` los usa así:

- `e2e.baseUrl` es `ABP_URL`: `cy.visit("/ghost/")` abre la ABP.
- Las pruebas leen las variables con `Cypress.expose`:

  ```javascript
  cy.get("#identification").type(Cypress.expose("ABP_ADMIN_EMAIL"));
  cy.get("#password").type(Cypress.expose("ABP_ADMIN_PASSWORD"));
  ```

Las variables disponibles son `ABP_URL`, `ABP_RC_URL` (la versión de Ghost para regresión visual),
`ABP_ADMIN_NAME`, `ABP_ADMIN_EMAIL` y `ABP_ADMIN_PASSWORD`. Una variable de entorno con el mismo
nombre tiene prioridad sobre el `.env`. Fuera de un repositorio del proyecto (sin `.env`) se usan los
valores por defecto de `abp.cjs`.

> [!IMPORTANT]
> Cypress verifica al iniciar que `baseUrl` responde: levanten la ABP (`npm run abp:up` desde la
> raíz) antes de ejecutar las pruebas, incluso el ejemplo.

Otras opciones disponibles (tiempos de espera, _viewport_, video) están en la
[referencia de configuración](https://docs.cypress.io/app/references/configuration).

## Ejemplo incluido

`cypress/e2e/tutorial.cy.js` prueba el demo
[angular-6-registration-login-example](https://angular-6-registration-login-example.stackblitz.io)
alojado en StackBlitz, no la ABP: muestra cómo usar las credenciales del `.env` sin resolver las
pruebas del proyecto. Antes de cada prueba visita la página de registro del demo (con su URL
completa) y hace clic en el botón con el que StackBlitz inicia el proyecto (espera hasta 30 s, porque
StackBlitz primero muestra "Starting dev server"). Las pruebas verifican:

1. La navegación entre registro e inicio de sesión (`/login` ↔ `/register`).
2. Que enviar el formulario vacío muestra los 4 mensajes de validación.
3. El registro de un usuario con el nombre, el correo (como usuario) y la contraseña de
   `ABP_ADMIN_*`, y el inicio de sesión con él ("Hi Monitor!").

## Solución de problemas

- **`Cypress executable not found` o `The cypress npm package is installed, but the Cypress binary
  is missing`**: ejecuten `npm run cypress:prepare`.
- **`Cannot find module '…/Resources/app/index.js'`**: la variable de entorno `ELECTRON_RUN_AS_NODE`
  está definida (pasa con procesos lanzados desde extensiones de VS Code, por ejemplo asistentes de
  IA). Ejecuten Cypress desde una terminal normal o eliminen la variable
  (`unset ELECTRON_RUN_AS_NODE`).
- **`Cypress could not verify that this server is running`**: la ABP no responde en `ABP_URL`;
  levántenla con `npm run abp:up` desde la raíz.
- **Falla el `beforeEach`**: el demo es un sitio externo; verifiquen que carga en el navegador.
- **Advertencia `EBADENGINE`**: están usando una versión de Node.js anterior a la 24.

## Referencias

- [Documentación de Cypress](https://docs.cypress.io/app/get-started/why-cypress)
- [Buenas prácticas](https://docs.cypress.io/app/core-concepts/best-practices)
- [Configuración](https://docs.cypress.io/app/references/configuration)
