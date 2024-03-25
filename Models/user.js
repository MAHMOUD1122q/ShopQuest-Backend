import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please add your name"],
    unique: [true, "this username is taken"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  cart: {
    type: Array,
    default: [],
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "/default.png",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
