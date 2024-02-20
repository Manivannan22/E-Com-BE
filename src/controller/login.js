// import { getDB } from "../Config/dbConnection.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/signup.js";
dotenv.config();
const secretKey = process.env.JWT_KEY;
const saltRounds = 10;

const Register = async (req, res) => {
    const { email, name, password } = req.body;
  try { 
    let existingUser = await User.findOne({email});
    console.log(existingUser);
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
    let newPassword = password.toString();
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log(hashedPassword);
    await User.create({ email, password: hashedPassword, name})
    res.status(200).json({ message: "User register successfully", status: true,});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let existingUser = await User.findOne({ email: email });
      if (!existingUser) {                 
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isPasswordValid = await bcrypt.compare(password, existingUser.password) 
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = Jwt.sign({email: existingUser.email, id: existingUser._id}, secretKey, {expiresIn: "5hr"});
     res.status(200).json({ token, message: "Login Successfully" });
    } catch (error) {
        console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "Internal sever error" });
    }
  };


const ForgetPassword = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const db = getDB();
    let existingUser = await db.collection("user").findOne({ email: to });
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "Invalid credentials!", status: false });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.E_MAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const otpLength = 6; 
    const otpNum = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(0, otpLength);

    const mailOptions = {
      from: "Housing Management",
      to,
      subject: "Housing Management - Forgot password OTP",
      text: `Your OTP is ${otpNum}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        res.status(404).send({
          message: "Error sending OTP, please try again!",
          status: false,
        });
      } else {
        await db.collection("forgot_password").deleteMany({ email: to });
        const otp = {
          email: to,
          otp_number: otpNum,
          expire_time: Date.now() + 60000,
        };
        await db.collection("forgot_password").insertOne(otp);
        res.send({
          message: "OTP sent successfully",
          status: true,
          isOTP: true,
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const VerifyPassword = async (req, res) => {
  try {
    const { enter_otp, email } = req.body;
    const db = getDB();
    let existingUser = await db.collection("user").findOne({ email: email });
    let existingUser_otp = await db
      .collection("forgot_password")
      .findOne({ email: email });

    if (!existingUser || !existingUser_otp) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const db_otp = existingUser_otp.otp_number;
    const exp_time = existingUser_otp.expire_time;
    if (exp_time <= Date.now()) {
      await db.collection("forgot_password").deleteOne({ email: email });
      return res
        .status(404)
        .json({ message: "OTP expired, try again!", isOpen: false });
    }
    if (Number(db_otp) !== Number(enter_otp)) {
      return res
        .status(400)
        .json({ message: "Please check the OTP!", isOpen: true });
    } else {
      await db.collection("forgot_password").deleteOne({ email: email });
      return res
        .status(200)
        .json({ message: "OTP successfully verified", isPasOpen: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { to, password } = req.body;
    const db = getDB();
    let existingUser = await db.collection("user").findOne({ email: to });
    if (existingUser) {
      let newPassword = password.toString();
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await db
        .collection("user")
        .findOneAndUpdate(
          { email: to },
          { $set: { password: hashedPassword } },
          { returnDocument: "after" }
        );
      res.status(200).json({ message: "Password reset successfully" });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid credentials!", status: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
};


export {
  Register,
  Login,
  ForgetPassword,
  VerifyPassword,
  ResetPassword,
};