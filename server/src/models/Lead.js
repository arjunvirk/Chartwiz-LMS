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
      enum: [
        "new",
        "contacted",
        "demo_booked",
        "visit_scheduled",
        "payment_pending",
        "converted",
        "closed",
      ],
      default: "new",
    },

    notes: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
    },
    email: {
      type: String,
      default: "",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    source: {
      type: String,
      enum: ["Website", "Meta Ads", "Google", "WhatsApp", "Referral"],
      default: "Website",
    },
    lastContacted: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    visitDate: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    convertedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
