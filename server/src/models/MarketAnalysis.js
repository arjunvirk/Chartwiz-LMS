import mongoose from "mongoose";

const marketAnalysisSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    market: {
      type: String,
      required: true,
      enum: ["Forex", "Gold", "Crypto", "Stocks", "Indices"],
      default: "Forex",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  },
);

marketAnalysisSchema.index({ createdAt: -1 });

export default mongoose.model("MarketAnalysis", marketAnalysisSchema);
