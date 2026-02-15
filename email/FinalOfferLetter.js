const nodemailer = require("nodemailer");

const FinalOfferLetter = async (email) => {
   
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
  subject: "Kaduna State Scholarship And Loans Board - Final Loan Offer Letter Available",
  html: `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Final Loan Offer Letter Available</title>
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
  color: #00703c;
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
  background-color: #f0fdf4;
  border-left: 4px solid #00703c;
  padding: 15px;
  border-radius: 6px;
  font-size: 14px;
  margin: 15px 0;
  }

  .alert strong {
  color: #00703c;
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

  .steps {
  background-color: #f9fafb;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  }

  .steps ol {
  margin: 10px 0;
  padding-left: 20px;
  }

  .steps li {
  margin-bottom: 10px;
  font-size: 14px;
  }

  .congrats {
  background: linear-gradient(135deg, #00703c 0%, #005c32 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
  }

  .congrats h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
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
  <h2>🎉 Final Loan Offer Letter Available</h2>
  <p>Dear Applicant,</p>

  <div class="congrats">
  <h3>Congratulations on Reaching the Final Stage!</h3>
  <p style="margin: 0;">You have successfully completed all requirements for your loan application.</p>
  </div>

  <p>
  We are delighted to inform you that your <strong>Final Loan Offer Letter</strong> is now ready and requires your signature along with your guarantor's signature.
  </p>

  <div class="alert">
  <strong>Action Required:</strong><br>
  Please log in to your account and sign your Final Offer Letter. Both you (the borrower) and your guarantor must sign the document to proceed.
  </div>

  <p><strong>Important Signing Instructions:</strong></p>
  <div class="steps">
  <ol>
  <li>Log in to the KADSSLB portal using your credentials</li>
  <li>Navigate to your <strong>Dashboard</strong></li>
  <li>Go to <strong>My Applications</strong> section</li>
  <li>Click on <strong>View Details</strong></li>
  <li>Click on <strong>Final Offer Letter</strong></li>
  <li><strong>For Borrower:</strong> Only the <strong>borrower</strong> is allowed to click the <strong>"Sign"</strong> button to sign as the borrower</li>
  <li><strong>For Guarantor:</strong> Only the <strong>guarantor</strong> is allowed to click the <strong>"Guarantor Sign"</strong> button to sign as the guarantor/co-debtor</li>
  <li>Once both signatures are completed, the document will be processed</li>
  </ol>
  </div>

  <p>
  This is a significant milestone in your educational journey. We are proud to support your academic aspirations and look forward to empowering your future.
  </p>

  <p style="margin-top: 25px;">
  <a href="https://kadsslb.mmt-ng.com" class="button">Go to Portal & Sign</a>
  </p>

  <p style="margin-top: 25px;">
  <strong>Warm Regards,</strong><br>
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

module.exports = FinalOfferLetter;

