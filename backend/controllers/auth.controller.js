import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (_req, res, next) => {
  // to create save new user, need to wait for response, hence asynx
  const { username, email, password } = _req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); // if use .hash(), need to add wait in front of value
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (_req, res, next) => {
  const { email, password } = _req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Email or password is incorrect"));

    // implementation of hashing of private info via token (cookies) after ensuring user is logged in and valid
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // functionality to prevent pwd from being sent to client end
    const { password: hashedPassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000); // hour

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest); // http only provides extra security for cookie so other 3rd party apps cant modify it
  } catch (error) {
    next(error);
  }
};
