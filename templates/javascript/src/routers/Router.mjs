import { Router } from "express";
import { StandardResponse } from "../util/responses/StandardResponse.mjs";
import UserRouter from "./UserRouter.mjs";

const router = Router();
router.use(UserRouter);

/**
 * @swagger
 * /api/v1/status:
 *   get:
 *     summary: Get API description
 *     description: Returns a simple description of the API.
 *     responses:
 *       200:
 *         description: A brief API description.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to the API."
 */
router.get('/status', (req, res) => {
  res.status(200).send(StandardResponse(true, "Server is up and running", null, null));
});

export default router;
