import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const test = (_req, res) => {
  res.json({
    message: "API is working!",
  });
};

// update user
export const updateUser = async (_req, res, next) => {
  if (_req.user.id !== _req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    if (_req.body.password) {
      _req.body.password = await bcrypt.hash(_req.body.password, 10);
    }
    // findByIdAndUpdate is a mongoDB method, finds user id from the POST-ed signin method
    const updatedUser = await User.findByIdAndUpdate(
      _req.params.id,
      {
        $set: {
          username: _req.body.username,
          email: _req.body.email,
          password: _req.body.password,
          pfp: _req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
