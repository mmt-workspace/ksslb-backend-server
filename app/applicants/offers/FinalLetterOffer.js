const db = require("../../../database/db")
const {SetDateFomat,SetTimeFormat} = require("../../../functions/Date")
const TokensGenerator = require("../../../functions/TokensGenerator")
const FinalOfferLetter = require("../../../email/FinalOfferLetter")








FinalLetterOffer = (req,res)=>{

      

    const {user_token} = req.body


    const file = req.file.filename
    const file_name = "Final Offer Letter"

     if(!user_token || !file_name){
         return res.sendStatus(400)
     }
   
     if(!req.file){
         return res.sendStatus(400)
     }


    const checkSql = 'SELECT * FROM loan_steps WHERE user_token = ? AND done = ?'
    const sql = "INSERT INTO disbursement_requests_submit_file(user_token,file_token,file_name,updatedAtTime,updatedAtDate) VALUES(?,?,?,?,?);"
    const approved_disbursement = "accepted_disbursement"
    const file_token = TokensGenerator(10)
    const getEmailSql = "SELECT email FROM sign_up WHERE user_token = ?;"

 

    db.query(checkSql, [user_token, approved_disbursement], (err, result) => {


           if(err) {
              console.log(err.message)
              return res.send({status: false, textStatus: "Error checking record"})
          }


            if(result.length > 0) { 

                db.query(sql, [user_token,file_token,file,SetTimeFormat(),SetDateFomat()], (err) => {
                     
                     if(err) {
                         console.log(err.message)
                         return res.send({status: false, textStatus: "Error inserting record"})
                     }

        db.query(getEmailSql,[user_token],(err,emailResult)=>{

          if(err) {
              console.log(err.message)
              return res.send({status: false, textStatus: "Error retrieving email"})
          }

          if(emailResult.length > 0) {

               const email = emailResult[0].email
               FinalOfferLetter(email)

                return  res.send({  
                         status:true,
                         textStatus:"Final Letter Offer Uploaded"
                     })  
          }

     })

                    

                })

            } else {
                return res.send({  
                    status:false,
                    textStatus:"Accepted Disbursement is required before uploading Final Letter Offer"
                })  
            }   



    })




  }




  accepted_disbursement = (req,res)=>{


        const {user_token} = req.body
        const status = "accepted_disbursement"
        const sql = "UPDATE loan_steps SET done = ? WHERE user_token = ?;"
         const checkSql = 'SELECT * FROM loan_steps WHERE user_token = ? AND disbursment = ?;'
           const approved_disbursement = "approved_disbursement"


            db.query(checkSql, [user_token, approved_disbursement], (err, result) => {

                if(err) {
                    console.log(err.message)
                    return res.send({status: false, textStatus: "Error checking record"})
                }

                if(result.length === 0) {
                    return res.send({ status: false, textStatus: "Disbursement not approved yet" });
                }else{

                     db.query(sql,[status,user_token], (err) => {
  
              if (err) {
                  console.log(err);
                  return res.send({ status: false, textStatus: "Error updating loan steps" });
              }
  
              res.send({ status: true, textStatus: "Disbursement accepted" });
  
          });


                }


             })   
  
       
  }



  GetLoanSteps = (req,res)=>{

        const {user_token} = req.params

        const sql = "SELECT * FROM loan_steps WHERE user_token = ?;"

        db.query(sql,[user_token],(err,result)=>{
            
            if(err) return console.log(err.message)
            res.send(result)    
        })
    }


Getdisbursement_requests_submit_file = (req,res)=>{

        const {user_token} = req.params

        const sql = "SELECT * FROM disbursement_requests_submit_file WHERE user_token = ?;"

        db.query(sql,[user_token],(err,result)=>{
            
            if(err) return console.log(err.message)
            res.send(result)    
        })
    }


  module.exports = {FinalLetterOffer,accepted_disbursement,GetLoanSteps,Getdisbursement_requests_submit_file}