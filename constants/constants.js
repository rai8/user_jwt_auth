const tables = {
  userTable: "User",
  roleTable: "Role"
};
const roles = {
  Admin: 1,
  User: 2
};

const unknownErrorMessage = "Something wen't wrong";

const statusCode = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  SESSION_EXPIRED: 440,
  UNAUTHORIZED_ACCESS: 401
};
module.exports = {
  tables,
  roles,
  statusCode,
  unknownErrorMessage
};
