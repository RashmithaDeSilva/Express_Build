import { StandardResponse } from "./StandardResponse";
import { CommonErrors } from "../errors/CommonErrors";
import { logError } from "../ConsoleLog";
import { Response } from 'express';

const ENV = process.env.ENV || "PROD";
const API_VERSION = process.env.API_VERSION || 'v';

// Log error in database
async function logErrorFunction(location: string | null, errors: Error, data: any) {
    try {
        // Apply your logic

    } catch (error: any) {
        logError(error.message);
    }
}

// Response errors
async function ErrorResponse(error: Error, res: Response, location: string | null = null, data: any = null) {
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
                        redirect: `/api/${ API_VERSION }/auth/login` 
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
        
    } catch (error: any) {
        logError(error);
        return res.status(500).send(StandardResponse(
            false,
            CommonErrors.INTERNAL_SERVER_ERROR,
            null,
            ENV === "DEV" ? [{
                message: error.message
            }] : null // Only expose internal error messages in DEV
        ));
    }
}

export default ErrorResponse;