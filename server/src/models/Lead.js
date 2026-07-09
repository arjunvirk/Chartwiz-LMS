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
      type: String,
      required: true,
      enum: ["The Forex Program", "The Forex Program with Indian Market"],
    },
    source: {
      type: String,
      default: "Website",
    },
    utmSource: {
      type: String,
      default: "",
    },
    referrer: {
      type: String,
      default: "",
    },

    utmMedium: {
      type: String,
      default: "",
    },

    utmCampaign: {
      type: String,
      default: "",
    },

    utmContent: {
      type: String,
      default: "",
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
