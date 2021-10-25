const {
  sendEmailConfirmation,
  emailVerification,
  emailUpdatePassword,
} = require("../utils/emailConfirmation");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTP, resendOTP, verifyOTP } = require("../utils/OTP");

async function registerUser(req, reply) {
  let verificationId = uuidv4();
  const { email, phone, name, address, city, country } = req.body;
  if (!email || !phone || !name || !address || !city || !country) {
    throw new Error("Fill All Fields");
  }
  const userCollection = await this.mongo.db.collection("users");
  const user = await userCollection.findOne({ email });
  if (!user) {
    const collection = await this.mongo.db.collection("userVerification");
    await collection.insertOne({
      email,
      verificationId,
      name,
      phone,
      city,
      address,
      country,
    });
    // const otpCollection = await this.mongo.db.collection("OTP");
    // sendOTP(phone,otpCollection);
    // emailVerification(email, verificationId);
    return { message: "Check Email for Conformation", statusCode: 201 };
  }
  throw new Error("User Already Exists!");
}

// async function verifyUser(req, reply) {
//   const { verificationId } = req.params;
//   const userVerificationCollection = await this.mongo.db.collection(
//     "userVerification"
//   );
//   const user = await userVerificationCollection.findOneAndDelete({
//     verificationId,
//   });
//   if (user) {
//     const {email, password, name, phone, city, address, country} = user.value;
//     const userCollection = await this.mongo.db.collection("users");
//     await userCollection.insertOne({ email, password, name, phone, city, address, country});
//     sendEmailConfirmation(
//       email,
//       "New User",
//       "Your Account Has Been Registered"
//     );
//     return { message: "User Has Been Registered", statusCode: 201 };
//   } else {
//     throw new Error("User Not Found");
//   }
// }

async function sendOTPToUser(req, reply) {
  const { phone } = req.body;
  const otpCollection = await this.mongo.db.collection("OTP");
  const userCollection = await this.mongo.db.collection("users");
  if (!(await userCollection.findOne({ phone }))) {
    await sendOTP(phone, otpCollection);
    return {
      message: "Enter the code sent to your phone,With In Sixty Seconds",
      statusCode: 200,
    };
  }
  throw new Error("User Is Already Registered!");
}

async function resendOTPToUser(req, reply) {
  const { phone } = req.body;
  const otpCollection = await this.mongo.db.collection("OTP");
  const userCollection = await this.mongo.db.collection("users");
  if (!(await userCollection.findOne({ phone }))) {
    await resendOTP(phone, otpCollection);
    return {
      message: "Enter the code sent to your phone,With In Sixty Seconds",
      statusCode: 200,
    };
  }
  throw new Error("User Is Already Registered!");
}

async function setPassword(req, reply) {
  const { email, password } = req.body;
  const userCollection = await this.mongo.db.collection("users");
  try {
    const hashedPassword = await this.bcrypt.hash(password);
    const user = await userCollection.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );
    if (user) {
      return { message: "New Account Has Been Created!", statusCode: 200 };
    }
    throw new Error("User Not Found!");
  } catch (err) {
    throw new Error(err);
  }
}

async function sendOtpTOUpdatePhoneNo(req, reply) {
  const { phone } = req.body;
  const otpCollection = await this.mongo.db.collection("OTP");
  await sendOTP(phone, otpCollection);
  return {
    message: "Enter the code sent to your phone, With In Sixty Seconds",
    statusCode: 200,
  };
}

async function updatePhoneNo(req, reply) {
  const { email, phone, updatedPhone, OTP } = req.body;
  const userCollection = await this.mongo.db.collection("users");
  const otpCollection = await this.mongo.db.collection("OTP");
  const result = await verifyOTP(phone, OTP, otpCollection);
  if (result) {
    const user = await userCollection.findOneAndUpdate(
      { email },
      { $set: { phone: updatedPhone } }
    );
    return {
      message: "PhoneNo Has been updated!",
      statusCode: 200,
      user: { ...user.value, phone: updatedPhone },
    };
  }
  throw new Error("Code Send To You Has Expired!");
}

async function verifyUser(req, reply) {
  const { phone, OTP } = req.body;
  const otpCollection = await this.mongo.db.collection("OTP");
  const result = await verifyOTP(phone, OTP, otpCollection);
  console.log(result);
  if (result) {
    const userVerificationCollection = await this.mongo.db.collection(
      "userVerification"
    );
    const user = await userVerificationCollection.findOneAndDelete({
      phone,
    });
    if (user.value) {
      const { email, name, phone, city, address, country } = user.value;
      const userCollection = await this.mongo.db.collection("users");
      await userCollection.insertOne({
        email,
        name,
        phone,
        city,
        address,
        country,
      });
      sendEmailConfirmation(
        email,
        "New User",
        "Your Account Has Been Registered"
      );
      return { message: "User Has Been Registered", statusCode: 201 };
    } else {
      throw new Error("User Not Found");
    }
  }
}

async function userLogin(req, reply) {
  const { email, password } = req.body;
  const collection = await this.mongo.db.collection("users");
  const user = await collection.findOne({ email });
  if (user.password) {
    if (await this.bcrypt.compare(password, user.password)) {
      const token = this.jwt.sign({
        email: user.email,
        _id: user._id,
      });
      return reply.code(200).send({ user, token });
    }
  }
  throw new Error("User Not Registered!");
}

async function getAllUsers(req, reply) {
  let data = [];
  const collection = await this.mongo.db.collection("users");
  const searchCursor = await collection.find();
  while (await searchCursor.hasNext()) {
    data.push(await searchCursor.next());
  }
  return data;
}

async function forgotPassword(req, reply) {
  const { email } = req.body;
  const collection = await this.mongo.db.collection("users");
  const user = await collection.findOne({ email });
  if (user) {
    emailUpdatePassword(email);
    return {
      message: "Check your Email and click on the link to update the password",
      statusCode: 200,
    };
  } else {
    throw new Error("User with this email does not exists.");
  }
}

async function updatePassword(req, reply) {
  const { email } = req.params;
  const { password } = req.body;
  try {
    const hashedPassword = await this.bcrypt.hash(password);
    const collection = await this.mongo.db.collection("users");
    const user = await collection.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );
    return reply.code(200).send(user.value);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
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
};
