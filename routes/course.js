const router = require("express-promise-router")();

const Roles = require("../constants/roles");
const courseController = require("../controllers/courseController");

const { protect, authorization } = require("../middlewares/auth");

/**
 * @swagger
 * /course/getAllCourse:
 *  get:
 *    summary : get all course
 *    description : get all course
 *    tags : [course]
 *    security :
 *      - bearerAuth : []
 *    responses :
 *      200:
 *        $ref:  '#/components/responses/CourseSchemaResponse'
 *      400:
 *        description: Invalid request
 *      401:
 *        description: Unauthorized
 *
 */
router
  .route("/course/getAllCourse")
  .get(protect, authorization(Roles.ADMIN), courseController.getAllCourse);

/**
 * @swagger
 * /course/createCourse:
 *   post:
 *     summary : create a course
 *     description : create a course
 *     tags : [course]
 *     security :
 *      - bearerAuth : []
 *     requestBody:
 *       required : true
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#/components/schemas/CourseSchema'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/CourseSchemaCreateResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         description: Unauthorized
 *
 */

router
  .route("/course/createCourse")
  .post(protect, authorization(Roles.ADMIN), courseController.createCourse);

module.exports = router;
