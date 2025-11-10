const nodemailer = require("nodemailer");






const  VerificationCode = (email,code) =>{

      
    async function main() {
          
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
     
      
      // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'admin@mmt-ng.com', // sender address
          to: `${email}`, // list of receivers
         subject: "Kaduna State Scholarship And Loans Board: Verification Code", // Subject line
        //   attachments: [""],
         // text: "", // plain text body
          html: `<div> 
  
        <h1
        background-color:  rgb(68, 58, 4);
        color: white;
        padding: 5px;
        text-transform: uppercase;
        text-align: center;
        >KADSSLB PAY</h1>
        
         <div style=" padding: 0.3em; ">
          <b> Dear Applicant </b>

            <p>Copy the code</p>
  
    
           <p><b>Verification Code: </b> ${code}</p>

           
        <div style="color:#555;" className="">
        Powered by <span style="color:#555;"><a href="https://mmt-ng.com" style="color:#555;">MastermindTech</a></span>
      </div>
          </div>   
          `, // html body
      });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // <p>P.S. Follow us on [insert social media links] to stay updated on the latest tech trends and program updates!</p>
       
      }
      
      main().catch(console.error);
  }


  module.exports = VerificationCode