const nodemailer = require("nodemailer");






const  SendPassward = (email,token,fname) =>{

      
    async function main() {
          
       // create reusable transporter object using the default SMTP transport
       let transporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "admin@mmt-ng.com", // generated ethereal user
          pass: "admin@tech@Mastermind202", // generated ethereal password
        },
      });
      
      // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'admin@mmt-ng.com', // sender address
          to: `${email}`, // list of receivers
          subject: 'KADSSLB PAY', // Subject line
        //   attachments: [""],
         // text: "", // plain text body
          html: `<div> 
        <h1
        background-color:  rgb(68, 58, 4);
        color: white;
        padding: 5px;
        text-transform: uppercase;
        text-align: center;
        >KADSSLB Confirmation of Successful Application Fee Payment
        </h1>
        
         <div style=" padding: 0.3em; ">
          <b> Dear ${fname} </b>
           <p>This is to confirm that your payment for the application fee has been successfully processed. Your payment serves as a substitute for the tax clearance certificate requirement.
           As part of the verification process, we kindly request that you take a screenshot of the email we sent you. Ensure that this email address aligns with the one you used when applying for the scholarship through the portal.
            </p>    

          <p>Below are your reference payment tokens, along with your email address:</p> 
              
 
           <p><b>Token: </b> ${token}</p>
           <p><b>Email Address: </b> ${email}</p>

             <p>
             Thank you for your prompt action in ensuring accurate and timely processing of your scholarship application.
             </p>   

           <h4>Best regards,</h4>

            <h2>KADSSLB Team. </h2>
          </div>   
          `, // html body
      });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // <p>P.S. Follow us on [insert social media links] to stay updated on the latest tech trends and program updates!</p>
       
      }
      
      main().catch(console.error);
  }


  module.exports = SendPassward