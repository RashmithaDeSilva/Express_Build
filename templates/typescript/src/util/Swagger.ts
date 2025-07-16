import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const APP_NAME = process.env.APP_NAME || "Express API";
const API_PORT: number = Number(process.env.API_PORT || 3456);
const API_VERSION = process.env.API_VERSION || 'v2';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${ APP_NAME } API swagger doc`,
            version: '2.0.0',
            description: 'API documentation for an Express API using Swagger with TypeScript project.'
        },
        servers: [{ url: `http://127.0.0.1:${ API_PORT || 3456 }` }],
    },
    apis: ['./src/routers/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export function SetupSwagger(app: Express) {
    app.use(`/api/${ API_VERSION || 'v' }/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}