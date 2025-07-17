import { StandardResponse } from "./StandardResponse.mjs";
import { CommonErrors } from "../errors/CommonErrors.mjs";
import { logError } from "../ConsoleLog.mjs";

const ENV = process.env.ENV || "PROD";
const API_VERSION = process.env.API_VERSION || 'v';

// Log error in database or elsewhere
async function logErrorFunction(location, errors, data) {
  try {
    // Apply your logging logic here

  } catch (error) {
    logError(error.message);
  }
}

// Response errors
async function ErrorResponse(error, res, location = null, data = null) {
  try {
    switch (error.message) {
      case CommonErrors.INVALID_JSON_FORMAT:
        return res.status(400).send(StandardResponse(
          false,
          error.message,
          null,
          data
        ));

      case CommonErrors.NOT_FOUND:
        return res.status(404).send(StandardResponse(
          false,
          error.message,
          null,
          [{ 
            redirect: `/api/${API_VERSION}/auth/login`
          }]
        ));

      default:
        await logErrorFunction(location, error, data);
        return res.status(500).send(StandardResponse(
          false,
          CommonErrors.INTERNAL_SERVER_ERROR,
          null,
          ENV === "DEV" ? [{
            message: error.message
          }] : null // Only expose internal error messages in DEV
        ));
    }
  } catch (err) {
    logError(err);
    return res.status(500).send(StandardResponse(
      false,
      CommonErrors.INTERNAL_SERVER_ERROR,
      null,
      ENV === "DEV" ? [{
        message: err.message
      }] : null
    ));
  }
}

export default ErrorResponse;
