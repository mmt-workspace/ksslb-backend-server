const nodemailer = require("nodemailer");

const WelcomeEmail = async (email) => {
   
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
      subject: "Kaduna State Scholarship And Loans Board, Welcome Message",
      html: `
       <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to KADSSLB</title>
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
    <h2>Welcome to KADSSLB Portal!</h2>
    <p>Dear Applicant,</p>
    <p>
      We are pleased to welcome you to the <strong>Kaduna State Scholarship and Loans Board (KADSSLB)</strong> online portal. 
      Your account has been successfully created, marking the first step toward accessing educational opportunities offered by the Kaduna State Government.
    </p>

    <p>
      Please keep your login details safe and ensure your profile is complete to enable you to apply for scholarships, grants, or loans when applications are open.
    </p>

    <p>
      For updates and important announcements, always visit our official website or follow us on our verified channels.
    </p>

    <p style="margin-top: 25px;">
      <a href="https://kadsslb.mmt-ng.com" class="button">Visit Portal</a>
    </p>

    <p style="margin-top: 25px;">
      <strong>Warm regards,</strong><br>
      <span>Kaduna State Scholarship and Loans Board</span><br>
      <span>Building a Knowledge-Based Economy</span>
    </p>
  </div>

  <div class="footer">
    © 2025 Kaduna State Scholarship and Loans Board. All rights reserved.<br>
    This is an automated message; please do not reply.
    <div style="color:#555;" className="">
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

module.exports = WelcomeEmail;
