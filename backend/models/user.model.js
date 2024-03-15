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
    pfp: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamps: true } // each user will also have time of creation and time of edit
);

const User = mongoose.model(`User`, userSchema);

export default User;
