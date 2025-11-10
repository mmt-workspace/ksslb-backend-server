const db = require('../../../database/db');
const VerificationCode = require("../../../email/VerificationCode")
const RandomID = require('../../../functions/RandomID')





 VerifyAccount = (req,res)=>{



  const {code,user_token} = req.params


     const sql = "SELECT * FROM generateCode WHERE generated_code = ?;"
     const sqldelete = "DELETE FROM generateCode WHERE generated_code = ?;"
     const sqldeleteAll = "DELETE FROM generateCode WHERE user_token = ?;"
     const sqlput = "UPDATE applicant_credentials SET verify_email = ? WHERE user_token = ?;"

     db.query(sql,[code],(err,result)=>{

        if(err) console.log(err)


            if(result.length > 0){

              
                    res.send(
                          
                          {
                            status:true,
                            textStatus:"Email verified!!"
                          }
                     )


                db.query(sqlput,["verified",user_token],(err,result)=>{
                            
                          if(err) console.log(err)

                 console.log("email verified")
                        



              db.query(sqldelete,[code],(err,result)=>{
                            
                          if(err) console.log(err)


                            db.query(sqldeleteAll,[user_token],(err,result)=>{
                            
                          if(err) console.log(err)

                            console.log("Code Deleted all")
                        
                })

                            console.log("Code Deleted")
                        
                })





                })

                   


             


                   
            }else{


                    res.send(
                          
                          {
                            status:false,
                            textStatus:"Code not exist"
                          }
                     )


                  
            }





     })
      





}



GenerateCode = (req,res) =>{



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


Check_if_Verify = (req,res)=>{


      const {user_token}  = req.params
      const sql = "SELECT * FROM applicant_credentials WHERE user_token = ?;"


       db.query(sql,[user_token],(err,result)=>{

                if(err) return console.log(err.message)


                    if(result.length > 0){
                               
                            if(result[0].verify_email === "verified"){

                                  res.status(200)
                                   console.log("here1  ")
                            }else{

                                  res.send(
                                    {
                                        status: false,
                                        textStatus:"Verify your email"
                                    }
                                  )
                                   console.log("here2")
                            }

                    }else{

                          res.send({

                               status: false,
                               textStatus:"Account not Exist"
                          })

                          console.log("here")
                    }
       })


}



module.exports = {GenerateCode,VerifyAccount,VerifyAccount,Check_if_Verify}