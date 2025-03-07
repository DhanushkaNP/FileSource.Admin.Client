import { message } from "antd";

const { ErrorCodes } = require("@/shared/errorCodes");

// pass the response that get from error #error.response
export const getErrorMessage = (errorResponse) => {
  console.log("Error Response", errorResponse);
  logError(errorResponse.data.Message, errorResponse.data.AdditionalData);

  if (errorResponse.status >= 400 && errorResponse.status < 500) {
    switch (errorResponse.data.ErrorCode) {
      case ErrorCodes.LogginUserDetailsIncorrect:
        return {
          message: "One or more user details incorrect",
        };

      case ErrorCodes.ExisitingUser:
        return {
          message: "User already exsist with provided email",
        };

      default:
        return {
          message: errorResponse.data.Message,
        };
    }
  } else {
    throw new Error(errorResponse.data.message || errorResponse.message);
  }
};

const logError = (message, AdditionaDetails = null) => {
  console.error(`Message: ${message} \n + ${AdditionaDetails} `);
};
