import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "interested", "not_interested", "converted"],
      default: "new",
    },

    notes: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
