import mongoose from "mongoose";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { creatError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({ ...req.body, password: hash });

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return next(creatError(404, "User not found"));
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(creatError(400, "Wrong Credential"));
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {}
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      console.log("working");
      const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.SECRETKEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
