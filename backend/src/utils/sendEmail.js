import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. "transporter" (The Postman)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options (The Envelope)
  const mailOptions = {
    from: `NanoLink Support <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    
  };

  // 3. Sends the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
