const nodemailer = require("nodemailer");






const  SendPassward = (email,psswrd) =>{

      
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
        >KADSSLB PAY</h1>
        
         <div style=" padding: 0.3em; ">
          <b> Login Details </b>
  
        
           <p><b>Username: </b> ${email}</p>
           <p><b>Passward: </b> ${psswrd}</p>

           <h3>You can update your password through the dashboard</h3>

       
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