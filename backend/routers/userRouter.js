import bcrypt from "bcryptjs";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/forgotpassword",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.resetEmail });
    if (user) {
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 360000;
      user.save();
      //setting nodemailer Transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });
      const mailOptions = {
        from: "ion.ciorba6996@gmail.com",
        to: `${user.email}`,
        subject: "Link to reset Password",
        text:
          `This link has been sent, because you requested a password reset for your account. \n\n` +
          `This link will expire in one hour, please click it: http://localhost:3000/reset/${token}`,
      };
      console.log("sending email");
      console.log(mailOptions);

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          res.send({
            email: user.email,
            token: token,
          });
          res.status(200).json("recovery email sent");
        }
      });
      return;
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/reset/:token",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 8);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save();
      res.send({
        email: user.email,
        password: user.password,
      });
      return;
    } else {
      res.status(401).send({ message: "Invalid token or token expires" });
    }
  })
);

userRouter.get(
  "/reset/:token",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });
    if (user) {
      res.status(200).send({
        message: "password reset link ok",
      });
    } else {
      res.json("password reset link is invalid or has expired");
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

export default userRouter;
