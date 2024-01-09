const { statusCode } = require("../constants/constants");
const { sequelize } = require("../core/db");
const response = require("../response/response");
const userService = require("../service/user.service");

module.exports = {
  healthCheck,
  createUserRecord,
  getAllUserRecords,
  getUserRecord
};
/**
 * @swagger
 * /healthCheck:
 *  get:
 *    tags:
 *       - "HealthCheck"
 *    summary: Checks if the service is reachable
 *    produces:
 *      - application/json
 *    responses:
 *        200:
 *           description: Healthy Service
 *        503:
 *           description: Unhealthy Service
 */
async function healthCheck(req, res) {
  try {
    res.send({
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(503).send();
  }
}

/**
 * @swagger
 * /user/create:
 *  post:
 *    tags:
 *       - "Crete user"
 *    summary: Create user
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Crete user
 *        description: Cretaing user record
 *        schema:
 *           type: object
 *           required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *           properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *    responses:
 *        200:
 *           description: Success Response
 *        400:
 *           description: Bad request
 *        401:
 *           description: Unauthorized access
 *        404:
 *           description: Not Found
 */
async function createUserRecord(req, res) {
  try {
    const transaction = await sequelize.transaction();
    const result = await userService.createUserRecord(req, transaction);
    if (result.error) {
      let httpStatusCode = statusCode.SERVER_ERROR;
      await transaction.rollback();
      if (result.error.errorCode) httpStatusCode = result.error.errorCode;
      return res.status(httpStatusCode).json(response.errorWith(httpStatusCode, result.error.message, result.error.displayMessage));
    } else {
      await transaction.commit();
      return res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "User created successfully", "User created successfully"));
    }
  } catch (error) {
    console.log(error?.message);
  }
}

/**
 * @swagger
 * /users/fetch:
 *  get:
 *    tags:
 *       - "Fetch users records"
 *    summary: Get all users records
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: authorization
 *        type: string
 *        description: authorization
 *    responses:
 *        200:
 *           description: Healthy Service
 *        503:
 *           description: Unhealthy Service
 */
async function getAllUserRecords(req, res) {
  try {
    const result = await userService.getAllUserRecords();
    if (result.error) {
      let httpStatusCode = statusCode.SERVER_ERROR;
      if (result.error.errorCode) httpStatusCode = result.error.errorCode;
      return res.status(httpStatusCode).json(response.errorWith(null, httpStatusCode, result.error.message, result.error.displayMessage));
    } else {
      return res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Users record fetched successfully", "Users record fetched successfully"));
    }
  } catch (error) {
    console.log(error?.message);
  }
}

/**
 * @swagger
 * /user/fetch/{userId}:
 *  get:
 *    tags:
 *       - "Fetch user record"
 *    summary: Get single user record
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: number
 *        required: true
 *        description: User Id
 *      - in: header
 *        name: authorization
 *        type: string
 *        description: authorization
 *    responses:
 *        200:
 *           description: Healthy Service
 *        503:
 *           description: Unhealthy Service
 */
async function getUserRecord(req, res) {
  try {
    const result = await userService.getUserRecord(req);
    if (result.error) {
      let httpStatusCode = statusCode.SERVER_ERROR;
      if (result.error.errorCode) httpStatusCode = result.error.errorCode;
      return res.status(httpStatusCode).json(response.errorWith(null, httpStatusCode, result.error.message, result.error.displayMessage));
    } else {
      return res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Users record fetched successfully", "Users record fetched successfully"));
    }
  } catch (error) {
    console.log(error?.message);
  }
}
