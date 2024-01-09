const constants = require("../constants/constants");
const response = require("../response/response");
module.exports.isAdminRole = (req, res, next) => {
  if (req.user.roleId === constants.roles.Admin) {
    next();
  } else {
    return res.status(constants.statusCode.UNAUTHORIZED_ACCESS).json(response.errorWith(null, constants.statusCode.UNAUTHORIZED_ACCESS, "You do not have access to this data. Please contact administrator", "You do not have access to this data. Please contact administrator"));
  }
};

module.exports.isAdminOrCustomerRole = (req, res, next) => {
  if (req.user.roleId === constants.roles.Admin || req.user.userId === Number(req.params.userId)) {
    next();
  } else {
    return res.status(constants.statusCode.UNAUTHORIZED_ACCESS).json(response.errorWith(null, constants.statusCode.UNAUTHORIZED_ACCESS, "You do not have access to this data. Please contact administrator", "You do not have access to this data. Please contact administrator"));
  }
};
