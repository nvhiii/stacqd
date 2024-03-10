import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
