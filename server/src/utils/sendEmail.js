import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `ChartWiz Academy <${process.env.EMAIL_USER}>`,

    to: options.email,

    subject: options.subject,

    html: options.message,
  };

  console.log("MAIL OPTIONS:", mailOptions);

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
