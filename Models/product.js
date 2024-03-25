import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is require"],
    },
    img: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user require"],
    },
  },
  { timestamps: true }
);

const ProdectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add product name"],
    },
    images: {
      type: Array,
      required: [true, "please add product images"],
    },
    price: {
      type: Number,
      required: [true, "please add product price"],
    },
    sku: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "please add product category"],
    },
    description: {
      type: String,
      required: [true, "please add product description"],
    },
    color: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    status: {
      type: String,
      required: [true, "please add product status"],
    },
    isShow: {
      type: Boolean,
    },
    isSale: {
      type: Boolean,
    },
    discount: {
      type: Number,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProdectSchema);

export default Product;
