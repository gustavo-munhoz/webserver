import {getUser, login, register, removeUser, saveUser} from "./service.mjs";

/**
 * @openapi
 * /hosts/register:
 *   post:
 *     summary: "Registers a new user"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: userRegister
 *     x-eov-operation-handler: host/router
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Register"
 *     responses:
 *       '201':
 *         description: "User registered"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Registration failed"
 */
export async function userRegister(req, res, _) {
    const saved = await register(req.body);
    return saved ? res.sendStatus(201) : res.sendStatus(400);}

/**
 * @openapi
 * /host/login:
 *   post:
 *     summary: "Logs in the user"
 *
 *     tags:
 *       - "auth"
 *
 *     operationId: userLogin
 *
 *     x-eov-operation-handler: host/router
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsernamePassword"
 *
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 */
export async function userLogin(req, res, _) {
    const user = await login(req.body);
    return user ? res.json(user) : res.sendStatus(401);
}

/**
 * @openapi
 * /host/me:
 *   get:
 *     summary: "Retrieves user information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: printUser
 *     x-eov-operation-handler: host/router
 *
 *     responses:
 *       '200':
 *         description: "Returns the user"
 *       '404':
 *         description: "User not found"
 *
 *     security:
 *       - {}
 *       - JWT: ['USER']
 */
export async function printUser(req, res, _) {
    if (!req.user) res.send("Hello, guest!");

    const user = await getUser(parseInt(req.user.id), true);
    return user ? res.json(user) : res.sendStatus(404);
}


/**
 * @openapi
 * /host/me:
 *   delete:
 *     summary: "Deletes the current user"
 *     tags:
 *       - profile
 *
 *     operationId: deleteAccount
 *     x-eov-operation-handler: host/router
 *
 *     responses:
 *       '200':
 *         description: "Account deleted successfully"
 *       '404':
 *         description: "User not found"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function deleteAccount(req, res, _) {
    const deleted = await removeUser(req.user.id);
    return deleted ? res.sendStatus(200) : res.sendStatus(404);
}

/**
 * @openapi
 * /host/me:
 *   put:
 *     summary: "Updates user information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: updateAccount
 *     x-eov-operation-handler: host/router
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Update"
 *
 *     responses:
 *       '200':
 *         description: "User updated successfully"
 *       '400':
 *         description: "Invalid data provided"
 *       '404':
 *         description: "User not found"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function updateAccount(req, res, _) {
    const saved = await saveUser({id: req.user.id, ...req.body});
    return saved ? res.json({id: req.user.id, ...req.body}) : res.sendStatus(404);
}