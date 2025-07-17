import { Router } from "express";
import { StandardResponse } from "../util/responses/StandardResponse.mjs";
import { getUserService } from "../services/ServicesFactory.mjs";
import ErrorResponse from "../util/responses/ErrorResponse.mjs";

const router = Router();

let userService;

(async () => {
  userService = await getUserService();
})();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', async (req, res) => {
  try {
    if (!userService) {
      return res.status(503).send(StandardResponse(false, "Service not ready", null, null));
    }

    const users = await userService.getUsers();
    res.status(200).send(StandardResponse(true, "Users fetched successfully", users, null));

  } catch (error) {
    await ErrorResponse(error instanceof Error ? error : new Error("Unknown error"), res, "/users", null);
  }
});

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/users', async (req, res) => {
  try {
    if (!userService) {
      return res.status(503).send(StandardResponse(false, "Service not ready", null, null));
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send(StandardResponse(false, "Missing required fields", null, null));
    }

    const newUser = await userService.createUser({ name, email, password, id: "" });
    res.status(201).send(StandardResponse(true, "User created", newUser, null));

  } catch (error) {
    await ErrorResponse(error instanceof Error ? error : new Error("Unknown error"), res, "/users", null);
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/users/:id', async (req, res) => {
  try {
    if (!userService) {
      return res.status(503).send(StandardResponse(false, "Service not ready", null, null));
    }

    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await userService.updateUser(id, updateData);
    res.status(200).send(StandardResponse(true, "User updated", updatedUser, null));

  } catch (error) {
    await ErrorResponse(error instanceof Error ? error : new Error("Unknown error"), res, `/users/${req.params.id}`, null);
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', async (req, res) => {
  try {
    if (!userService) {
      return res.status(503).send(StandardResponse(false, "Service not ready", null, null));
    }

    const { id } = req.params;

    const deleted = await userService.deleteUser(id);
    if (deleted) {
      res.status(200).send(StandardResponse(true, "User deleted", null, null));
    } else {
      res.status(404).send(StandardResponse(false, "User not found", null, null));
    }

  } catch (error) {
    await ErrorResponse(error instanceof Error ? error : new Error("Unknown error"), res, `/users/${req.params.id}`, null);
  }
});

export default router;
