import mongoose from "mongoose";

const SizeSchema = mongoose.Schema({
  label: {
    type: String,
    required: [true, "please add Size label"],
  },
  value: {
    type: String,
  },
});

const Size = mongoose.models.Size || mongoose.model("Size", SizeSchema);

export default Size;
