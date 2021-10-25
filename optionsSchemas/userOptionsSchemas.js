const {
  registerUser,
  userLogin,
  getAllUsers,
  verifyUser,
  forgotPassword,
  updatePassword,
  sendOTPToUser,
  resendOTPToUser,
  setPassword,
  sendOtpTOUpdatePhoneNo,
  updatePhoneNo,
} = require("../controllers/userControllers");
const mongodb = require("mongodb");

const registerUserOptions = {
  schema: {
    body: {
      type: "object",
      required: ["email", "name", "phone", "address", "city", "country"],
      properties: {
        email: { type: "string" },
        name: { type: "string" },
        phone: { type: "number" },
        address: { type: "string" },
        city: { type: "string" },
        country: { type: "string" },
        verificationId: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const sendOTPOptions = {
  schema: {
    body: {
      type: "object",
      required: ["phone"],
      properties: {
        phone: { type: "number" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const resendOTPOptions = {
  schema: {
    body: {
      type: "object",
      required: ["phone"],
      properties: {
        phone: { type: "number" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const verifyUserOptions = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const setPasswordOptions = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const sendOTPForPhoneNoUpdateOptions = {
  schema: {
    body: {
      type: "object",
      required: ["phone"],
      properties: {
        phone: { type: "number" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const updatePhoneNOOptions = {
  schema: {
    body: {
      type: "object",
      required: ["email", "phone"],
      properties: {
        email: { type: "string" },
        phone: { type: "number" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
          user: {
            type: "object",
            properties: {
              _id: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
              name: { type: "string" },
              phone: { type: "number" },
              address: { type: "string" },
              city: { type: "string" },
              country: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const getUserOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        users: {
          type: "object",
          properties: {
            _id: { type: mongodb.ObjectId },
            email: { type: "string" },
            password: { type: "string" },
            name: { type: "string" },
            phone: { type: "number" },
            address: { type: "string" },
            city: { type: "string" },
            country: { type: "string" },
          },
        },
      },
    },
  },
};

const userLoginOptions = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              _id: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
              name: { type: "string" },
              phone: { type: "number" },
              address: { type: "string" },
              city: { type: "string" },
              country: { type: "string" },
            },
          },
          token: { type: "string" },
        },
      },
    },
  },
};

const forgotPasswordOptions = {
  schema: {
    body: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const updatePasswordOptions = {
  schema: {
    body: {
      type: "object",
      required: ["password"],
      properties: {
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          name: { type: "string" },
          phone: { type: "number" },
          address: { type: "string" },
          city: { type: "string" },
          country: { type: "string" },
        },
      },
    },
  },
};

module.exports = {
  registerUserOptions,
  getUserOptions,
  userLoginOptions,
  verifyUserOptions,
  forgotPasswordOptions,
  updatePasswordOptions,
  sendOTPOptions,
  resendOTPOptions,
  setPasswordOptions,
  sendOTPForPhoneNoUpdateOptions,
  updatePhoneNOOptions,
};
