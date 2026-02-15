const nodemailer = require("nodemailer");

const ReturnUTLetter = async (email,reason) => {
   
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
  subject: "Your Utilization Letter has been returned",
 html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Utilization Letter Returned</title>
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
  background-color: #fff7ed;
  border-left: 4px solid #f59e0b;
  padding: 15px;
  border-radius: 6px;
  font-size: 14px;
  margin: 15px 0;
}
.alert strong {
  color: #b45309;
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
.reason-section {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(245, 158, 11, 0.15);
}
.reason-section h3 {
  color: #92400e;
  font-size: 16px;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
}
.reason-section h3::before {
  content: "📝";
  margin-right: 8px;
  font-size: 20px;
}
.reason-content {
  background-color: #ffffff;
  border-left: 4px solid #d97706;
  padding: 15px;
  border-radius: 4px;
  color: #1f2937;
  font-size: 15px;
  line-height: 1.6;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}
.reason-content p {
  margin: 0;
  font-weight: 500;
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
  <h2>⚠️ Utilization Letter Returned</h2>
  <p>Dear Applicant,</p>

  <div class="alert">
    <strong>Your Utilization Letter has been returned.</strong><br>
    Please read the message below carefully and go back to refill your Utilization Letter.
  </div>

  <p><strong>What you need to do:</strong></p>
  <div class="steps">
    <ol>
      <li>Log in to the KADSSLB portal using your credentials</li>
      <li>Navigate to your <strong>My Application</strong></li>
      <li>Open the <strong>Utilization Letter</strong> section</li>
      <li>Read the message below and make the required corrections</li>
      <li>Submit the updated Utilization Letter</li>
    </ol>
  </div>

  <div class="reason-section">
    <h3>Important Corrections Required</h3>
    <div class="reason-content">
      <p>${reason}</p>
    </div>
  </div>

  <p style="margin-top: 25px;">
    <a href="https://kadsslb.mmt-ng.com" class="button">Go to Portal</a>
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

module.exports = ReturnUTLetter;

