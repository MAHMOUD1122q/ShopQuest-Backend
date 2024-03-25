import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: [true, "please add fullName "],
    },
    address: {
      type: String,
      required: [true, "please add address "],
    },
    mobile: {
      type: String,
      required: [true, "please add mobile "],
    },
    anotherMobile:{
      type: String,
    },
    country: {
      type: String,
      required: [true, "please add country "],
    },
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default Address;
