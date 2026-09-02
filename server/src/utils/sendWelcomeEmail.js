import sendEmail from "./sendEmail.js";

const sendWelcomeEmail = async ({ name, email, temporaryPassword }) => {
  const message = `
    <div
      style="
        font-family: Arial, Helvetica, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        color: #222222;
        line-height: 1.6;
      "
    >

      <h2 style="margin-bottom: 20px;">
        Hello ${name},
      </h2>

      <p>
        Congratulations! 🎉
      </p>

      <p>
        Your admission has been approved.
      </p>

      <p>
        You can now access the
        <strong>Alphira Capital Student Portal.</strong>
      </p>

      <div
        style="
          background-color: #f5f5f5;
          border: 1px solid #dddddd;
          border-radius: 10px;
          padding: 20px;
          margin: 25px 0;
        "
      >

        <p style="margin: 0 0 15px 0;">
          <strong>Login URL:</strong><br />
          <a
            href="https://www.alphiracapital.com/login"
            style="
              color: #000000;
              font-weight: bold;
              text-decoration: none;
            "
          >
            www.alphiracapital.com
          </a>
        </p>

        <p style="margin: 15px 0;">
          <strong>Email:</strong><br />

          <span
            style="
              display: inline-block;
              background-color: #fff3cd;
              border: 1px solid #ffe69c;
              border-radius: 6px;
              padding: 8px 12px;
              margin-top: 5px;
              font-weight: bold;
              color: #000000;
            "
          >
            ${email}
          </span>
        </p>

        <p style="margin: 15px 0 0 0;">
          <strong>Temporary Password:</strong><br />

          <span
            style="
              display: inline-block;
              background-color: #fff3cd;
              border: 1px solid #ffe69c;
              border-radius: 6px;
              padding: 8px 12px;
              margin-top: 5px;
              font-weight: bold;
              color: #000000;
              font-family: monospace;
              letter-spacing: 0.5px;
            "
          >
            ${temporaryPassword}
          </span>
        </p>

      </div>

      <p>
        Please login and change your password immediately.
      </p>

      <p>
        Welcome to <strong>Alphira Capital!</strong>
      </p>

      <p style="margin-top: 30px;">
        Regards,<br />
        <strong>Alphira Capital</strong>
      </p>

      <p
        style="
          margin-top: 25px;
          font-size: 13px;
          color: #777777;
        "
      >
        www.alphiracapital.com
      </p>

    </div>
  `;

  await sendEmail({
    email,
    subject: "Welcome to Alphira Capital",
    message,
  });
};

export default sendWelcomeEmail;