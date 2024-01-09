const { statusCode, roles } = require("../constants/constants");
const { User, Role } = require("../core/db");
const response = require("../response/response");
const { hashPassword } = require("../utils/password");

module.exports = {
  /**
   * Create user
   * @param {*} req
   * @param {*} res
   */
  createUserRecord: async function (req, transaction) {
    try {
      // check if email already exists
      const userExists = await this.findUserByEmailId(req.body.email);
      if (userExists) throw response.customError(statusCode.BAD_REQUEST, "User with that email already exists", "User with that email already exists");

      await User.create(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          roleId: roles.User,
          email: req.body.email,
          password: hashPassword(req.body.password),
          isArchived: false
        },
        { transaction: transaction }
      );
      return true;
    } catch (error) {
      return { error: error };
    }
  },

  /**
   * Find user by email
   * @param {*} req
   */
  findUserByEmailId: async function (emailId) {
    try {
      const user = await User.findOne({ where: { email: emailId, isArchived: false } });
      return user;
    } catch (error) {
      return { error: error };
    }
  },

  /**
   * Find user by userId
   * @param {*} req
   */
  findUserByUserId: async function (userId) {
    try {
      const user = await User.findOne({ where: { user: userId, isArchived: false } });
      return user;
    } catch (error) {
      return { error: error };
    }
  },

  /**
   * Get all user records
   * @param {*} req
   */
  getAllUserRecords: async function () {
    try {
      const users = await User.findAll({ attributes: ["userId", "firstName", "lastName", "email", "isArchived"], where: { isArchived: false }, include: [{ model: Role, as: "userRole", where: { isArchived: false } }] });
      return users;
    } catch (error) {
      return { error: error };
    }
  },

  /**
   * Get single record
   * @param {*} req
   */
  getUserRecord: async function (req) {
    try {
      const user = await User.findOne({ attributes: ["userId", "firstName", "lastName", "email", "isArchived"], where: { userId: req.params.userId, isArchived: false }, include: [{ model: Role, as: "userRole", where: { isArchived: false } }] });
      if (!user) throw response.customError(statusCode.NOT_FOUND, "User does not exist", "User does not exist");
      return user;
    } catch (error) {
      return { error: error };
    }
  }
};
