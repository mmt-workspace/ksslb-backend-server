const nodemailer = require("nodemailer");

const CreditSearchNotOk = async (email) => {
   
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
    subject: "Kaduna State Scholarship And Loans Board - Application Status",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Tertiary Education Loan Application Decision</title>
<style>
  body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f8;
  margin: 0;
  padding: 0;
  }

  .email-container {
  max-width: 600px;
  background-color: #ffffff;
  margin: 40px auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  }

  .header {
  background-color: #00703c;
  color: white;
  text-align: center;
  padding: 25px 20px;
  }

  .header img {
  width: 80px;
  height: auto;
  margin-bottom: 10px;
  }

  .header h1 {
  margin: 0;
  font-size: 22px;
  letter-spacing: 1px;
  }

  .content {
  padding: 25px 30px;
  color: #333;
  line-height: 1.7;
  }

  .content h2 {
  color: #c41e3a;
  font-size: 20px;
  margin-bottom: 10px;
  }

  .content p {
  font-size: 15px;
  margin-bottom: 15px;
  }

  .footer {
  text-align: center;
  padding: 15px;
  background-color: #f2f2f2;
  font-size: 13px;
  color: #555;
  }

  .alert {
  background-color: #fff5f5;
  border-left: 4px solid #c41e3a;
  padding: 15px;
  border-radius: 6px;
  font-size: 14px;
  margin: 15px 0;
  }

  .alert strong {
  color: #c41e3a;
  }

  .button {
  display: inline-block;
  background-color: #00703c;
  color: white !important;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 10px;
  font-size: 14px;
  }

  .button:hover {
  background-color: #005c32;
  }
</style>
</head>
<body>

<div class="email-container">
  <div class="header">
  <img src="./email/newksslb.jpg" alt="KADSSLB Logo" />
  <h1>Kaduna State Scholarship and Loans Board</h1>
  </div>

  <div class="content">
  <h2>Application Status - Credit Search Failed</h2>
  <p>Dear Applicant,</p>

  <p>
    Thank you for submitting your application for the <strong>Tertiary Education Loan</strong> through the
    <strong>Kaduna State Scholarship and Loans Board (KADSSLB)</strong> portal.
  </p>

  <div class="alert">
    <strong>Your application has been rejected.</strong><br>
    The credit search verification did not meet the required standards. Unfortunately, this means you do not currently qualify for the loan at this time.
  </div>

  <p>
    The credit search is a crucial part of our verification process to ensure responsible lending and protect both applicants and the Board's interests.
  </p>

  <p>
    <strong>Next Steps:</strong>
    <ul>
    <li>You may reapply after addressing the credit concerns</li>
    <li>For more information, contact the KADSSLB support team</li>
    <li>Review your credit profile to improve your eligibility</li>
    </ul>
  </p>

  <p>
    If you believe this decision was made in error or wish to appeal, please contact our support team for guidance.
  </p>

  <p style="margin-top: 25px;">
    <a href="https://kadsslb.mmt-ng.com" class="button">Return to Portal</a>
  </p>

  <p style="margin-top: 25px;">
    <strong>Regards,</strong><br>
    <span>Kaduna State Scholarship and Loans Board</span><br>
    <span>Supporting Students. Empowering Futures.</span>
  </p>
  </div>

  <div class="footer">
  © 2025 Kaduna State Scholarship and Loans Board. All rights reserved.<br>
  This is an automated message; please do not reply.
  <div style="color:#555;">
    Powered by <span style="color:#555;"><a href="https://mmt-ng.com" style="color:#555;">MastermindTech</a></span>
  </div>
  </div>
</div>

</body>
</html>

 `,
  });

  console.log("📧 Email sent successfully:", info.response);
  } catch (error) {
  console.error("❌ Failed to send email:", error);
  }
};

module.exports = CreditSearchNotOk;
