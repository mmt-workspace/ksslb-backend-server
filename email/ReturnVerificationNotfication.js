const nodemailer = require("nodemailer");
const emailConfig = require("./EmailConfig")





const ReturnVerificationNotfication = async (email) => {
   
  try {
    let transporter = nodemailer.createTransport(emailConfig);

    // optional: verify connection
    await transporter.verify();
    console.log("✅ SMTP Server is ready to send mail (port 465)");

    let info = await transporter.sendMail({
      from: 'srv474867.hstgr.cloud@tienssg.com',
      to: email,
      subject: "Kaduna State Scholarship And Loans Board - One of your uploaded documents was returned",
      html: `
      <body style="margin:0; padding:0; font-family:Arial,sans-serif; background-color:#f4f4f4;">
        <h1>Application Status</h1>
        <table role="presentation" style="width:100%; border-collapse:collapse;">
        <tr>
          <td style="padding:20px 0; text-align:center; background-color:#003366;">
          <h1 style="color:#ffffff; margin:0;">KSSLB Document Application Status</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 30px;">
          <p>Dear Applicant,</p>

          <div style="margin:16px 0; padding:12px; background-color:#fff8e1; border-left:6px solid #ffcc00; border-radius:4px;">
            <strong>Note:</strong> Your application has been returned. Please check for any corrections, make the necessary changes, and resubmit your application.
          </div>

       
          
          <p>Please address the issues and resubmit your application at your earliest convenience.</p>

          </td>
        </tr>
        <tr>
          <td style="padding:20px; text-align:center; background-color:#eeeeee;">
          <p style="margin:0; font-size:12px; color:#666666;">© 2024 KSSLB. All rights reserved.</p>
          </td>
        </tr>
        </table>

        <div style="color:#555;">
        Powered by <a href="https://mmt-ng.com" style="color:#555;">MastermindTech</a>
        </div>
      </body>
      `,
    });

    console.log("📧 Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = ReturnVerificationNotfication;
