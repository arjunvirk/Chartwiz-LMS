import mongoose from "mongoose";

const economicEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
    },

    currency: {
      type: String,
      default: "",
    },

    impact: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    forecast: {
      type: String,
      default: "",
    },

    previous: {
      type: String,
      default: "",
    },

    actual: {
      type: String,
      default: "",
    },

    eventTime: {
      type: Date,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

economicEventSchema.index({ eventTime: 1 });

export default mongoose.model("EconomicEvent", economicEventSchema);
