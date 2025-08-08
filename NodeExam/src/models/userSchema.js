import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
    type: String,
    required: true,
    trim: true,
  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: {type: String}
  },
  { timestamps: true }
);
export default mongoose.model("TaskUser", userSchema);

