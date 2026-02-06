import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Url",
    required: true,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
  device: String,
  browser: String,
  os: String,
  country: String,
  city: String,
  referrer: String,
  ipAddress: String,
});

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
