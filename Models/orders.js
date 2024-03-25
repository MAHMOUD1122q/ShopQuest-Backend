import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        qty: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        productImage: {
          type: String,
        },
        productName: {
          type: String,
        },
        productPrice: {
          type: Number,
        },
        color: { type: String },
        size: { type: String },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      mobile: {
        type: String,
        required: true,
      },
      anotherMobile: {
        type: String,
      },
      country: { type: String, required: true },
    },
    // paymentMethod: { type: String, required: true, default: "home" },
    totalPrice: { type: Number, required: true },
    // isPaid: { type: Boolean, required: true },
    // paidAt: { type: Date, required: true },
    status: { type: String, default: "is Processing" },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
