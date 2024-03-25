import mongoose from "mongoose";

const sliderImageSchema = mongoose.Schema({
  image: {
    type: String,
    required: [true, "please enter image"],
  },
  link: {
    type: String,
    required : [true, "please enter a link"],
  },
});

const sliderImage =
  mongoose.models.sliderImage || mongoose.model("sliderImage", sliderImageSchema);

export default sliderImage;
