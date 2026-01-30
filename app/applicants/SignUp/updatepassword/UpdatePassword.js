const db = require("../../../../database/db");
const VerificationCode = require("../../../../email/VerificationCode")
const bcrypt = require("bcryptjs")


/* 

sign_up
email
pswrd
user_token
*/

// Check if Email exist
const CheckEmailApplicant = (req,res)=>{

      const {email,user_token}  = req.body
       
      const sql = "SELECT email FROM sign_up WHERE email = ?;"

      db.query(sql,[email],(err,result) =>{

            if(err) return console.log(err.message) 
               
             
            if(result.length > 0){


                      res.send({
                        statusText:"Email Exist",
                        status:true
                     }) 

                       GenerateCodeForgetPassword(email)



                }else{

                      
                     res.send({
                        statusText:"Email not Exist",
                        status:false
                     }) 
                     
                } 
      })


}





// ChecK if Password exist
GenerateCodeForgetPassword = (email) =>{




 
  
    const sqlcheck = "SELECT * FROM sign_up WHERE  email = ?;"
    const sqlcode = "INSERT INTO generateCode(user_token,email,generated_code) VALUE(?,?,?);"




    db.query(sqlcheck,[email],(err,result)=>{

              if(err) console.log(err)

               

                if(result.length > 0){

                      const email = result[0].email
                      const userToken = result[0].user_token
                      // generate a 7-digit numeric code (1000000 - 9999999)
                      const generatedCode = Math.floor(1000000 + Math.random() * 9000000).toString();

                      db.query(sqlcode,[userToken, email, generatedCode],(err,result)=>{
                        
                          if(err){
                              console.log(err);
                              return;
                          }

                          console.log("Generated code saved to database");
                      })
                      

                      // send code to email
                      VerificationCode(email,generatedCode)
                      console.log(generatedCode)
                       
                 

                }else{


                         console.log("Email not found in sign_up table");



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




/* check code */
const CheckCode = (req,res)=>{


      const {code,email}  = req.body
      
      const sql = "SELECT * FROM generateCode WHERE generated_code = ? AND email = ?;"

      db.query(sql,[code,email],(err,result) =>{


            if(err) return console.log(err.message) 
                

            if(result.length > 0){
  
                  res.send({
                        statusText:"Code Exist",
                        status:true
                     })
                    

                }else{
                  


                      res.send({
                        statusText:"Code not Exist",
                        status:false
                     }) 

                } 


      })


      

}


const UpdatePasswordApplicant = async (req,res)=>{

   const {newPassword,email,user_token} = req.body
   

   

    // SQL
     const sql = "UPDATE sign_up SET pswrd = ? WHERE email = ? ;"
     const saltRound = 10
     let hashPasswrd = await bcrypt.hash(newPassword,saltRound)

     db.query(sql,[hashPasswrd,email],(err,result)=>{
       
      if(err){
       console.log(err.message)
       return 
         }
          
         res.send({
         statusText: "Password Updated",
         status: true,   
          })

          deleteGeneratedCode(email)

         }) 
 



}


const deleteGeneratedCode = (email) =>{

      const sql = "DELETE FROM generateCode WHERE email = ?;"
          db.query(sql,[email],(err,result)=>{    

                    if(err) return console.log(err.message)
                         console.log("Generated code deleted after password reset")
          })
}




module.exports = {CheckEmailApplicant,CheckCode,UpdatePasswordApplicant}