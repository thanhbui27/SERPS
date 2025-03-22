const { Roles } = require("../constants/roles");
const { protect, authorization } = require("../middlewares/auth");

const ClassController = require("../controllers/classController");
const router = require("express-promise-router")();
/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Quản lý lớp học
 */

/**
 * @swagger
 * /class/getAllClass:
 *   get:
 *     summary: Lấy danh sách tất cả các lớp học
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách lớp học thành công
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
 *                     $ref: "#/components/schemas/ClassSchema"
 *                 message:
 *                   type: string
 *                   example: "Classes retrieved successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/create:
 *   post:
 *     summary: Tạo một lớp học mới
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
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
 *               unitId:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c85"
 *               className:
 *                 type: string
 *                 example: "Java Spring Boot Class"
 *               quantity :
 *                 type: number
 *                 example : 4
 *               lecture:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c77"
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: "Monday"
 *                     time:
 *                       type: string
 *                       example: "08:00 AM - 10:00 AM"
 *     responses:
 *       201:
 *         description: Lớp học được tạo thành công
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
 *                   example: "Class created successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/update/{classID}:
 *   put:
 *     summary: Cập nhật thông tin lớp học
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classID
 *         schema:
 *           type: string
 *         required : true
 *         description: ID của Class
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
 *               unitId:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c85"
 *               className:
 *                 type: string
 *                 example: "Java Spring Boot Class"
 *               quantity :
 *                 type: number
 *                 example : 4
 *               lecture:
 *                 type: string
 *                 example: "60d21b4967d0d8992e610c77"
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: "Monday"
 *                     time:
 *                       type: string
 *                       example: "08:00 AM - 10:00 AM"
 *     responses:
 *       200:
 *         description: Lớp học được cập nhật thành công
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
 *                   example: "Class updated successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/delete/{classID}:
 *   delete:
 *     summary: Xóa một lớp học
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lớp học cần xóa
 *     responses:
 *       200:
 *         description: Xóa lớp học thành công
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
 *                   example: "Class deleted successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

/**
 * @swagger
 * /class/filter:
 *   get:
 *     summary: Lọc lớp học theo tiêu chí
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *         description: Năm học
 *       - in: query
 *         name: semester
 *         schema:
 *           type: number
 *         description: Học kỳ
 *       - in: query
 *         name: unitId
 *         schema:
 *           type: string
 *         description: ID của Unit
 *     responses:
 *       200:
 *         description: Danh sách lớp học theo bộ lọc
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d21b4967d0d8992e610c85"
 *                       className:
 *                         type: string
 *                         example: "Java Spring Boot Class"
 *                       year:
 *                         type: number
 *                         example: 2025
 *                       semester:
 *                         type: number
 *                         example: 2
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 */

router
  .route("/class/getAllClass")
  .get(protect, authorization(Roles.TEACHER), ClassController.getAllClass);

router
  .route("/class/filter")
  .get(protect, authorization(Roles.TEACHER), ClassController.filterClass);

router
  .route("/class/create")
  .post(protect, authorization(Roles.TEACHER), ClassController.createClass);
router
  .route("/class/update/:classID")
  .put(protect, authorization(Roles.TEACHER), ClassController.updateClass);

router
  .route("/class/delete/:classID")
  .delete(protect, authorization(Roles.TEACHER), ClassController.deleteClass);

module.exports = router;
