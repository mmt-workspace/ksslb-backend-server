const nodemailer = require("nodemailer");

const VerificationNotfication = async (email,verify_status,document_type_name,rejectionReason,reject_message) => {
   
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.hmailplus.com",
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: "admin@mmt-ng.com",
        pass: "36366360mmT@@", // use actual password
      },
      tls: {
        rejectUnauthorized: false, // optional
      },
    });

    // optional: verify connection
    await transporter.verify();
    console.log("✅ SMTP Server is ready to send mail (port 465)");

    let info = await transporter.sendMail({
      from: 'admin@mmt-ng.com',
      to: email,
      subject: "Kaduna State Scholarship And Loans Board, One of your uploaded document is rejected",
      html: `
        <body style="margin:0; padding:0; font-family:Arial,sans-serif; background-color:#f4f4f4;">
              <h1>  Application Status </h1>
          <table role="presentation" style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:20px 0; text-align:center; background-color:#003366;">
                <h1 style="color:#ffffff; margin:0;">KSSLB Document Application Status</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 30px;">
                <p>Dear Applicant,</p>


                <div style="font-family: monospace; position: relative; margin-bottom: 1em; padding: 0.5em; background-color: #f5f5f5; border-radius: 8px; border: 2.5px solid rgba(6, 3, 54, 0.815);">
                <div style="display:flex; flex-direction:row; align-items: center; margin-bottom: 1em; padding: 0.5em; background-color: #f5f5f5; border-radius: 8px; border: 2.5px solid rgba(6, 3, 54, 0.815);">
                <p><b>Status:</b></p>
                <p style="background-color: #1a0505; padding: 0.25rem; color:white;">${verify_status}</p>
                </div>

                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 0.5em;">
                <p><b>Uploaded Document Name: </b></p>
                <p style="color: #014d01;"> ${document_type_name}</p>
                </div>

                <div>
                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 0.5em;">
                <p><b>Reason:</b></p>
                <p style="color: #014d01;">${rejectionReason || "No reason provided"}</p>
                </div>
                <p>
                <b>Message:</b> <span style="color: #014d01;">${reject_message || "No message"}</span>
                </p>
                </div>
                </div>



              </td>
            </tr>
            <tr>
              <td style="padding:20px; text-align:center; background-color:#eeeeee;">
                <p style="margin:0; font-size:12px; color:#666666;">© 2024 KSSLB. All rights reserved.</p>
              </td>
            </tr>
          </table>

          <div style="color:#555;" className="">
        Powered by <span style="color:#555;"><a href="https://mmt-ng.com" style="color:#555;">MastermindTech</a></span>
      </div>
        </body>
      `,
    });

    console.log("📧 Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = VerificationNotfication;
