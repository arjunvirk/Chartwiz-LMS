import Payment from "../models/Payment.js";
import User from "../models/User.js";
import generateInvoiceNumber from "../utils/generateInvoiceNumber.js";
import generateInvoicePDF from "../utils/generateInvoicePDF.js";
import sendEmail from "../utils/sendEmail.js";

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

    // Send invoice email (don't fail payment if email fails)

    try {
      const pdfBuffer = await generateInvoicePDF(payment);

      await sendEmail({
        email: payment.email,
        subject: "ChartWiz Academy - Payment Invoice",
        message: `
      <h2>Payment Successful</h2>
      <p>Dear ${payment.studentName},</p>
      <p>Thank you for your payment.</p>
      <p>Your invoice is attached to this email.</p>
      <p>Invoice Number: <strong>${payment.invoiceNumber}</strong></p>
    `,
        attachments: [
          {
            filename: `${payment.invoiceNumber}.pdf`,
            content: pdfBuffer,
          },
        ],
      });
    } catch (emailError) {
      console.error("Invoice email failed:", emailError.message);
    }

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

export const downloadInvoice = async (req, res) => {
  try {
    console.log("Starting invoice download");

    const payment = await Payment.findById(req.params.id);

    console.log("Payment found");

    const pdfBuffer = await generateInvoicePDF(payment);

    console.log("PDF generated successfully");

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${payment.invoiceNumber}.pdf`,
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error("DOWNLOAD INVOICE ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
