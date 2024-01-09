const { statusCode, unknownErrorMessage } = require("../constants/constants");

module.exports = {
  successWith: (data, httpStatusCode, message, displayMessage) => {
    if (!data) data = null;
    if (!httpStatusCode) httpStatusCode = statusCode.SUCCESS;
    if (!message) message = null;
    if (!displayMessage) displayMessage = null;
    return { httpStatusCode, result: { data, message, displayMessage, status: "OK" } };
  },

  errorWith: (data, httpStatusCode, message, displayMessage) => {
    if (!data) data = null;
    if (!httpStatusCode) httpStatusCode = statusCode.SERVER_ERROR;
    if (!message) message = null;
    if (!displayMessage) displayMessage = unknownErrorMessage;
    return { httpStatusCode, result: { data: null, message, displayMessage, status: "Failure" } };
  },

  customError: (errorCode, message, displayMessage) => {
    if (!errorCode) errorCode = statusCode.SERVER_ERROR;
    return { errorCode, message, displayMessage };
  }
};
