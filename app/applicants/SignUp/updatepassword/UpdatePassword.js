const db = require("../../../database/db");
const VerificationCode = require("../../../../email/VerificationCode")
const bcrypt = require("bcryptjs")


/* 

sign_up
email
pswrd
user_token
*/

// Check if Email exist
const CheckEmailApplicant = (req,res,next)=>{

      const {email,user_token}  = req.body
    
      const sql = "SELECT email FROM sign_up WHERE user_token = ?;"

      db.query(sql,[user_token],(err,result) =>{

            if(err) return console.log(err.message) 
               
             
            if(!result[0].email > 0){

                     res.send({
                        statusText:"Email not Exist",
                        status:false
                     }) 
                }else{
                     next()
                } 
      })


}

/* check code */
const CheckCode = (req,res)=>{


      const {code,user_token}  = req.body
    
      const sql = "SELECT generated_code FROM generateCode WHERE user_token = ?;"

      db.query(sql,[user_token],(err,result) =>{


            if(err) return console.log(err.message) 
               
             
            if(!result[0].email > 0){

                     res.send({
                        statusText:"Code not Exist",
                        status:false
                     }) 
                }else{
                     next()
                } 


      })


      

}




/*  CREATE TABLE generateCode(
      generateCode_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      user_token VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      generated_code VARCHAR(200) NOT NULL
 ); */



// ChecK if Password exist
GenerateCodeForgetPassword = (req,res) =>{



    const {usertoken} = req.params
   
 
  
    const sqlcheck = "SELECT * FROM sign_up WHERE  user_token = ?;"
    const sqlcode = "INSERT INTO generateCode(user_token,email,generated_code) VALUE(?,?,?);"




    db.query(sqlcheck,[usertoken],(err,result)=>{

              if(err) console.log(err)

               

                if(result.length > 0){

                      const email = result[0].email
                      const userToken = result[0].user_token
                      // generate a 7-digit numeric code (1000000 - 9999999)
                      const generatedCode = Math.floor(1000000 + Math.random() * 9000000).toString();

                      db.query(sqlcode,[userToken, email, generatedCode],(err,result)=>{
                        
                          if(err){
                              console.log(err);
                              return res.status(500).send({ status:false, textStatus:"Database error" });
                          }

                          res.send({
                              status:true,
                              textStatus:"Code generated",
                          });
                      })
                      

                      // send code to email
                      VerificationCode(email,generatedCode)
                      console.log(generatedCode)
                       
                 

                }else{


                     res.send(
                          
                          {
                            status:false,
                            textStatus:"Account not exist"
                          }
                     )



                }


    })





/*  CREATE TABLE generateCode(
      generateCode_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      user_token VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      generated_code VARCHAR(200) NOT NULL
 );

 */




}



const UpdatePassword = async (req,res)=>{

   const {newPassword,email,user_token} = req.body
   

   

    // SQL
     const sql = "UPDATE sign_up SET pswrd = ? WHERE email = ? AND user_token = ? ;"
     const saltRound = 10
     let hashPasswrd = await bcrypt.hash(newPassword,saltRound)

     db.query(sql,[hashPasswrd,email,user_token],(err,result)=>{
       
      if(err){
       console.log(err.message)
       return 
         }
          
         res.send({
         statusText: "Password Updated",
         status: true,   
          })

         }) 
 






}




module.exports = {GenerateCodeForgetPassword}