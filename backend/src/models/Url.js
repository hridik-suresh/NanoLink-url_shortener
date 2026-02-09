import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, index: true, unique: true },
    clicks: { type: Number, default: 0, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Allows for guest-created URLs
      index: true,
    },
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
