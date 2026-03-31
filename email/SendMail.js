const nodemailer = require("nodemailer");
const emailConfig = require("./EmailConfig")



const SendMail = async (email, text) => {
  try {
    let transporter = nodemailer.createTransport(emailConfig);

    // optional: verify connection
    await transporter.verify();
    console.log("✅ SMTP Server is ready to send mail (port 465)");

    let info = await transporter.sendMail({
      from: 'srv474867.hstgr.cloud@tienssg.com',
      to: email,
      subject: "Kaduna State Scholarship And Loans Board",
      html: `
        <body style="margin:0; padding:0; font-family:Arial,sans-serif; background-color:#f4f4f4;">
              <h1>  Application Status </h1>
          <table role="presentation" style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:20px 0; text-align:center; background-color:#003366;">
                <h1 style="color:#ffffff; margin:0;">KSSLB Application Status</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 30px;">
                <p>Dear Applicant,</p>
                <p style="white-space:pre-line;">${text}</p>
                <div style="margin:30px 0; text-align:center;">
                  <a href="#" style="background-color:#003366; color:#ffffff; padding:12px 30px; text-decoration:none; border-radius:5px;">View Application Status</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; text-align:center; background-color:#eeeeee;">
                <p style="margin:0; font-size:12px; color:#666666;">© 2024 KSSLB. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </body>
      `,
    });

    console.log("📧 Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = SendMail;
