import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    device: String,
    browser: String,
    os: String,
    country: { type: String, default: "Unknown" },
    city: { type: String, default: "Unknown" },
    referrer: String,
    ipAddress: { type: String, default: "Unknown" },
  },
  { timestamps: true },
);

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
