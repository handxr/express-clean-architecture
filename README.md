# Mi App Express con TypeScript

Este proyecto es una aplicación básica de Express configurada para usar TypeScript.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura:

```
mi-app-express
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── index.ts
│   ├── routes
│   │   └── index.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Descripción de los Archivos

- `src/app.ts`: Este archivo es el punto de entrada de la aplicación. Crea una instancia de la aplicación express y configura los middleware y las rutas.

- `src/controllers/index.ts`: Este archivo exporta una clase `IndexController` que tiene un método `getIndex` que maneja la ruta raíz de la aplicación.

- `src/routes/index.ts`: Este archivo exporta una función `setRoutes` que configura las rutas para la aplicación. Utiliza el `IndexController` para manejar la ruta raíz.

- `src/types/index.ts`: Este archivo exporta las interfaces `Request` y `Response` que extienden las interfaces de la biblioteca `express`.

- `tsconfig.json`: Este archivo es el archivo de configuración para TypeScript. Especifica las opciones del compilador y los archivos a incluir en la compilación.

- `package.json`: Este archivo es el archivo de configuración para npm. Enumera las dependencias y los scripts para el proyecto.

## Cómo Correr el Proyecto

Para correr el proyecto, sigue estos pasos:

1. Instala las dependencias con `npm install`.
2. Compila el código TypeScript a JavaScript con `npm run build`.
3. Corre la aplicación con `npm start`.

## Cómo Contribuir

Si deseas contribuir a este proyecto, por favor crea un fork del repositorio y envía un pull request con tus cambios. Asegúrate de que tu código sigue las convenciones de estilo del proyecto y que has probado tu código antes de enviar el pull request.