import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const APP_NAME = process.env.APP_NAME || "Express API";
const API_PORT = Number(process.env.API_PORT || 3456);
const API_VERSION = process.env.API_VERSION || 'v2';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${APP_NAME} API swagger doc`,
      version: '2.0.0',
      description: 'API documentation for an Express API using Swagger with TypeScript project.'
    },
    servers: [{ url: `http://127.0.0.1:${API_PORT}` }],
  },
  apis: ['./src/routers/*.mjs'],  // changed from .ts to .js assuming JS usage
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Setup Swagger middleware
 * @param {import('express').Express} app
 */
export function SetupSwagger(app) {
  app.use(`/api/${API_VERSION || 'v'}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
