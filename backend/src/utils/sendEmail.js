import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. "transporter" (The Postman)
  const transporter = nodemailer.createTransport({
    // Using host instead of 'service' gives more control for production
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // This helps bypass certificate issues common in cloud environments
    tls: {
      rejectUnauthorized: false,
    },
  });

  // 2. Define the email options (The Envelope)
  const mailOptions = {
    from: `NanoLink Support <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2>NanoLink Email Verification</h2>
            <p>${options.message.replace(/\n/g, "<br>")}</p>
           </div>`,
  };

  // 3. Sends the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
