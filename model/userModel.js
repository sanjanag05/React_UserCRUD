import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
  },
  summary: {
    type: String,
    required: true,
  },
});

export default mongoose.model("users", userSchema);
