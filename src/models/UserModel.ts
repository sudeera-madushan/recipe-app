import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, ],
  },
});

const User = mongoose.models.User || model("User", userSchema);

export default User;
