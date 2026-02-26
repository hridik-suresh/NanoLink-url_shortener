import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID_O,
  process.env.GOOGLE_CLIENT_SECRET_O,
  "https://developers.google.com/oauthplayground",
);

// Set the refresh token for the OAuth2 client
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sendEmail = async (options) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Format the email 
    const utf8Subject = `=?utf-8?B?${Buffer.from(options.subject).toString("base64")}?=`;
    const messageParts = [
      `To: ${options.email}`,
      `From: NanoLink <${process.env.GOOGLE_EMAIL}>`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      options.message,
    ];
    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    // console.log("Email sent successfully!");
  } catch (error) {
    console.error("Gmail API Error:", error);
    throw error;
  }
};

export default sendEmail;
