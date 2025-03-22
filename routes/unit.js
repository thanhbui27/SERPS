const { Roles } = require("../constants/roles");
const UnitController = require("../controllers/unitController");
const { protect, authorization } = require("../middlewares/auth");

const router = require("express-promise-router")();
/**
 * @swagger
 * /unit/getAllUnits:
 *   get:
 *     summary: Retrieve all units
 *     description: Get a list of all academic units.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Units
 *     responses:
 *       200:
 *         $ref: "#/components/responses/GetAllUnits"
 *
 * /unit/create:
 *   post:
 *     summary: Create a new unit
 *     description: Add a new academic unit to the system.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Units
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UnitSchema"
 *     responses:
 *       201:
 *         $ref: "#/components/responses/UnitCreated"
 */

/**
 * @swagger
 * /unit/search:
 *   get:
 *     summary: Tìm kiếm Unit
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Từ khóa để tìm kiếm Unit
 *     responses:
 *       200:
 *         $ref: "#/components/responses/GetAllUnits"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/filter:
 *   get:
 *     summary: Lọc Unit theo Course
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *         description: ID của Course để lọc Units
 *     responses:
 *       200:
 *         $ref: "#/components/responses/GetAllUnits"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/createManyUnit:
 *   post:
 *     summary: Tạo nhiều Units cùng lúc
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: array
 *              items:
 *                 $ref: "#/components/schemas/UnitSchema"
 *
 *     responses:
 *       201:
 *         description: create Multiple Units
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/UnitSchema"
 *                 message:
 *                   type: string
 *                   example: "Unit create Multiple successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/update/{unitID}:
 *   put:
 *     summary: Update Unit
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: unitID
 *         schema:
 *           type: string
 *         required: true
 *         description: The unit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: number
 *                 example: 2025
 *               semester:
 *                 type: number
 *                 example: 2
 *               course:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c90"
 *               name:
 *                 type: string
 *                 example: "Advanced Java Programming"
 *               credits:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: Cập nhật Unit thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Unit updated successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /unit/delete/{unitID}:
 *   delete:
 *     summary: remove Unit
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: unitID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của Unit cần xóa
 *     responses:
 *       200:
 *         description: Unit deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Unit deleted successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

router
  .route("/unit/getAllUnits")
  .get(protect, authorization(Roles.TEACHER), UnitController.getAllUnit);

router
  .route("/unit/create")
  .post(protect, authorization(Roles.TEACHER), UnitController.createUnit);

router
  .route("/unit/search")
  .get(protect, authorization(Roles.TEACHER), UnitController.searchUnit);

router
  .route("/unit/filter")
  .get(protect, authorization(Roles.TEACHER), UnitController.filterByCourse);

router
  .route("/unit/createManyUnit")
  .post(protect, authorization(Roles.TEACHER), UnitController.createManyUnit);

router
  .route("/unit/update/:unitID")
  .put(protect, authorization(Roles.TEACHER), UnitController.updateUnit);

router
  .route("/unit/delete/:unitID")
  .delete(protect, authorization(Roles.TEACHER), UnitController.removeUnit);

module.exports = router;
