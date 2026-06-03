import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["offline", "razorpay"],
      default: "offline",
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "paid",
    },

    invoiceNumber: {
      type: String,
      unique: true,
    },

    referenceNumber: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    paidAt: {
      type: Date,
      default: Date.now,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    liveCourseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LiveCourse",
    },

    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    razorpaySignature: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
