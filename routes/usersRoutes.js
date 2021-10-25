const {
  getUserOptions,
  registerUserOptions,
  userLoginOptions,
  verifyUserOptions,
  forgotPasswordOptions,
  updatePasswordOptions,
  sendOTPOptions,
  resendOTPOptions,
  setPasswordOptions,
  updatePhoneNOOptions,
  sendOTPForPhoneNoUpdateOptions,
} = require("../optionsSchemas/userOptionsSchemas");
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

const userRoutes = (fastify, options, done) => {
  //get All Users
  fastify.route({
    method: "GET",
    url: "/users",
    schema: getUserOptions,
    handler: getAllUsers,
  });

  //Login A User
  fastify.route({
    method: "POST",
    url: "/user",
    schema: userLoginOptions,
    handler: userLogin,
  });

  //Register A User
  fastify.route({
    method: "POST",
    url: "/users",
    schema: registerUserOptions,
    handler: registerUser,
  });

  //send otp to user
  fastify.route({
    method: "POST",
    url: "/sendOTP",
    schema: sendOTPOptions,
    handler: sendOTPToUser,
  });

  //resend otp to user
  fastify.route({
    method: "POST",
    url: "/resendOTP",
    schema: resendOTPOptions,
    handler: resendOTPToUser,
  });

  //set Password
  fastify.route({
    method: "POST",
    url: "/setPassword",
    schema: setPasswordOptions,
    handler: setPassword,
  });

  //send OTP to update Phone#
  fastify.route({
    method: "PATCH",
    url: "/updatePhoneNoOPT",
    schema: sendOTPForPhoneNoUpdateOptions,
    handler: sendOtpTOUpdatePhoneNo,
  });

  //update PhoneNO
  fastify.route({
    method: "PATCH",
    url: "/updatePhoneNO",
    schema: updatePhoneNOOptions,
    handler: updatePhoneNo,
  });

  //Verify User
  fastify.route({
    method: "POST",
    url: "/userVerification",
    schema: verifyUserOptions,
    handler: verifyUser,
  });

  //send email for password change
  fastify.route({
    method: "POST",
    url: "/forgotPassword",
    schema: forgotPasswordOptions,
    handler: forgotPassword,
  });

  //set new password
  fastify.route({
    method: "PATCH",
    url: "/forgotPassword/:email",
    schema: updatePasswordOptions,
    handler: updatePassword,
  });

  done();
};

module.exports = userRoutes;
