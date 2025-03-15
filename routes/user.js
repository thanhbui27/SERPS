const router = require("express-promise-router")();

const UserController = require("../controllers/userController");

const {
  signinSchema,
  signinResponse,
} = require("../swagger/schema/userLoginSchemaUI");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");

const passport = require("passport");
const Roles = require("../constants/roles");
const { protect, authorization } = require("../middlewares/auth");

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Login and receive JWT tokens
 *     description: Check the account and password, if valid, the JWT token will be returned.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SigninRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SigninSuccess'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route("/signin")
  .post(
    validateBody(schemas.authSignInSchema),
    passport.authenticate("local", { session: false }),
    UserController.signIn
  );

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

router.route("/users").get(protect, UserController.index);

/**
 * @swagger
 * /users/{userID}:
 *   get:
 *     summary: Get a user by ID
 *     description: Get a user by ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router
  .route("/users/:userID")
  .get(
    protect,
    authorization(Roles.ADMIN),
    validateParam(schemas.idSchema, "userID"),
    UserController.findOneUser
  );

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router
  .route("/users/createUser")
  .post(protect, authorization(Roles.ADMIN), UserController.createUser);

/**
 * @swagger
 * /users/findAllTeachers:
 *  get:
 *   summary: Get all teachers
 *   description: Get all teachers
 *   tags: [Users]
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       $ref: '#/components/responses/UserSchemaResponse'
 *     400:
 *       description: Invalid request
 *     401:
 *       description: Unauthorized
 */

router
  .route("/users/findAllTeachers")
  .get(protect, UserController.findAllTeachers);

/**
 * @swagger
 * /users/{userID}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user by ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserSchemaResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router
  .route("/users/:userID")
  .put(
    protect,
    authorization(Roles.ADMIN),
    validateParam(schemas.idSchema, "userID"),
    UserController.updateUser
  );

router
  .route("/users/secret")
  .get(passport.authenticate("jwt", { session: false }), UserController.secret);

module.exports = router;
