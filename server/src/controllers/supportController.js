import Support from "../models/supportModel.js";
import sendEmail from "../utils/sendEmail.js";

export const createSupportRequest = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const support = await Support.create({
      name,
      email,
      message,
    });
    console.log("SUPPORT_EMAIL =", process.env.SUPPORT_EMAIL);
    // Email to Academy Owner
    await sendEmail({
      email: email, // student's email
      subject: "Support Request Received",
      message: `
    <h2>Support Request Received</h2>

    <p>Hello ${name},</p>

    <p>Thank you for contacting ChartWiz Academy.</p>

    <p>We have received your support request and our team will review it shortly.</p>

    <p><strong>Your Message:</strong></p>

    <p>${message}</p>

    <br />

    <p>Regards,</p>
    <p>ChartWiz Academy Support Team</p>
  `,
    });

    res.status(201).json({
      success: true,
      message: "Support request submitted successfully",
      support,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit support request",
    });
  }
};
