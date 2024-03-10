import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // cannot have user w/o username
      unique: true,
    },
    email: {
      type: String,
      required: true, // cannot have user w/o email
      unique: true,
    },
    password: {
      type: String,
      required: true, // cannot have user w/o password
    },
  },
  { timestamps: true } // each user will also have time of creation and time of edit
);

const User = mongoose.model(`User`, userSchema);

export default User;
