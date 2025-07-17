import express from 'express';
import ErrorResponse from './util/responses/ErrorResponse.mjs';
import { CommonErrors } from './util/errors/CommonErrors.mjs';
import router from "./routers/Router.mjs";
import { logError, logInfo } from "./util/ConsoleLog.mjs";
import dotenv from 'dotenv';

dotenv.config();
const API_PORT = Number(process.env.API_PORT || 3456);
const API_VERSION = process.env.API_VERSION || 'v2';
const ENV = process.env.ENV || 'PROD';

// Express app
const app = express();

// Swagger doc
if (ENV === 'DEV') {
  const { SetupSwagger } = await import('./util/Swagger.mjs'); // dynamic import if top-level await allowed
  SetupSwagger(app);
}

// JSON setup
app.use(express.json());

// Handle bad JSON
app.use(async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    await ErrorResponse(new Error(CommonErrors.INVALID_JSON_FORMAT), res);
  } else {
    next(err); // forward to other error handlers
  }
});

// Routers setup
app.use(`/api/${API_VERSION}/`, router);

/**
 * @swagger
 * /api/v1/{any}:
 *   all:
 *     summary: Invalid endpoint
 *     description: Handles all undefined routes and returns a 404 error.
 *     parameters:
 *       - in: path
 *         name: any
 *         required: true
 *         schema:
 *           type: string
 *         description: Any undefined route
 *     responses:
 *       404:
 *         description: Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Not Found !"
 *                 redirect:
 *                   type: string
 *                   example: "Invalid endpoint, redirect to '/api/v1'"
 */
app.use(async (req, res, next) => {
  await ErrorResponse(new Error(CommonErrors.NOT_FOUND), res);
});

// Final Global Error Handler (Unexpected errors)
app.use(async (err, req, res, next) => {
  logError(`Unexpected Error: ${err.stack || err.message}`);
  await ErrorResponse(new Error(CommonErrors.INTERNAL_SERVER_ERROR), res);
});

// Setup listen
app.listen(API_PORT, '127.0.0.1', () => {
  logInfo(
    ENV === "DEV"
      ? `Swagger doc available on http://127.0.0.1:${API_PORT}/api/${API_VERSION}/api-docs`
      : `Server is running at http://127.0.0.1:${API_PORT}`
  );
});
