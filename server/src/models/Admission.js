import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
      enum: ["The Forex Program", "The Forex Program with Indian Market"],
    },

    assignedCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    city: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    preferredBatch: {
      type: String,
      default: "",
    },

    batch: {
      type: String,
      default: "",
    },

    mentor: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Contacted",
        "Documents Pending",
        "Payment Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partially Paid", "Paid"],
      default: "Pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },

    rejectedAt: {
      type: Date,
    },

    studentCreated: {
      type: Boolean,
      default: false,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Admission", admissionSchema);
