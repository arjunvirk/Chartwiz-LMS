import sendEmail from "./sendEmail.js";

const sendWelcomeEmail = async ({ name, email, temporaryPassword }) => {
  const message = `
Hello ${name},

Congratulations! 🎉

Your admission has been approved.

You can now access the ChartWiz Academy Student Portal.

Login URL:
https://chartwizacademy.com/login

Email:
${email}

Temporary Password:
${temporaryPassword}

Please login and change your password immediately.

Welcome to ChartWiz Academy!

Regards,
ChartWiz Academy
`;

  await sendEmail({
    email,
    subject: "Welcome to ChartWiz Academy",
    message,
  });
};

export default sendWelcomeEmail;
