import mongoose from "mongoose";

const ColorSchema = mongoose.Schema({
  label: {
    type: String,
    required: [true, "please add color label"],
},
  value: {
    type:String
  }
});

const Color =
  mongoose.models.Color || mongoose.model("Color", ColorSchema);

export default Color;
