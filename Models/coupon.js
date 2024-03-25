import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add name"],
  },
  expiry: {
    type: Date,
    required: [true, "please add expiry"],
  },
  discount: {
    type: Number,
    required: [true, "please add discount"],
  },
  userID: [{type: mongoose.Schema.Types.ObjectId , ref:"User"}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;
