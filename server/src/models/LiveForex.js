import mongoose from "mongoose";

const forexNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Forex",
    },

    url: {
      type: String,
      unique: true,
    },

    publishedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

forexNewsSchema.index({ publishedAt: -1 });

export default mongoose.model("ForexNews", forexNewsSchema);
