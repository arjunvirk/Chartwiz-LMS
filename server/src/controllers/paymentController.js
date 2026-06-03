import Payment from "../models/Payment.js";
import User from "../models/User.js";
import generateInvoiceNumber from "../utils/generateInvoiceNumber.js";

export const createOfflinePayment = async (req, res) => {
  try {
    const { studentId, amount, referenceNumber, remarks } = req.body;

    // VALIDATION

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student is required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (!referenceNumber) {
      return res.status(400).json({
        success: false,
        message: "Reference number is required",
      });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const payment = await Payment.create({
      studentId: student._id,
      studentName: student.name,
      email: student.email,

      amount,

      paymentMethod: "offline",

      paymentStatus: "paid",

      invoiceNumber: generateInvoiceNumber(),

      referenceNumber,

      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
