const db = require("../../../database/db")
const {SetDateFomat,SetTimeFormat} = require("../../../functions/Date")
const TokensGenerator = require("../../../functions/TokensGenerator")
const FinalOfferLetter = require("../../../email/FinalOfferLetter")








FinalLetterOffer = (req,res)=>{

      

    const {user_token} = req.body


   
    const file_name = "Final Offer Letter"

     if(!user_token || !file_name){
         return res.sendStatus(400)
     }
   
    


    const checkSql = 'SELECT * FROM loan_steps WHERE user_token = ? AND done = ?'
    const sql = "INSERT INTO disbursement_requests_submit_file(user_token,file_token,updatedAtTime,updatedAtDate) VALUES(?,?,?,?);"
    const approved_disbursement = "accepted_disbursement"
    const file_token = TokensGenerator(10)
    const getEmailSql = "SELECT email FROM sign_up WHERE user_token = ?;"

 

    db.query(checkSql, [user_token, approved_disbursement], (err, result) => {


           if(err) {
              console.log(err.message)
              return res.send({status: false, textStatus: "Error checking record"})
          }


            if(result.length > 0) { 

                db.query(sql, [user_token,file_token,SetTimeFormat(),SetDateFomat()], (err) => {
                     
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


Submit_SignFinalOfferLetter = (req,res)=>{

        const {user_token,type,from} = req.body
        let sql , sign,stage ,stepsql
        
        


     


        if(from === "applicant"){
         
        if(type === "borrower"){

             sql = "UPDATE disbursement_requests SET file_applicant_sign = ?, updatedAtTime_applicant = ?, updatedAtDate_applicant = ? WHERE user_token = ?;"
            stepsql = "UPDATE loan_steps SET agreed_sign = ? WHERE user_token = ?;"
             sign = "agreed"
             stage = "agreed"
            

        }else if(type === "guarantor"){

             sql = "UPDATE disbursement_requests SET file_guarantor_sign = ?, updatedAtTime_guarantor = ?, updatedAtDate_guarantor = ? WHERE user_token = ?;"
            stepsql = "UPDATE loan_steps SET agreed_g = ? WHERE user_token = ?;"
              sign = "agreed"
              stage = "agreed"
             

          
        }else{

            return res.send({status: false, textStatus: "Invalid signer type"})

        }

    }


    if(from === "sponsor"){

          
            if(type === "borrower"){

            sql = "UPDATE disbursement_requests SET file_sponsor_sign = ?, updatedAtTime_sponsor = ?, updatedAtDate_sponsor = ? WHERE user_token = ?;"
               stepsql = "UPDATE loan_steps SET agreed_sign = ? WHERE user_token = ?;"
            sign = "agreed"
           stage = "agreed"
            
            }else if(type === "guarantor"){


                sql = "UPDATE disbursement_requests SET file_guarantor_sign_t = ?, updatedAtTime_guarantor_t = ?, updatedAtDate_guarantor_t = ? WHERE user_token = ?;"
                 stepsql = "UPDATE loan_steps SET  agreed_g = ? WHERE user_token = ?;"
                sign = "agreed"
              stage = "agreed"
              
                



            }





    }


       db.query("SELECT * FROM disbursement_requests_submit_file WHERE user_token = ?;",[user_token],(err,result)=>{


                   if(err) return console.log(err)
                    
                    if(!result.length > 0){

                        res.send({
                           
                             status:false,
                             textStatus:"no record found"
                        })

                        return

                    }

       })

        db.query(sql,[sign, SetTimeFormat(), SetDateFomat(), user_token],(err,result)=>{
            
            if(err) return console.log(err)


                   db.query(stepsql,[stage,user_token],(err,result)=>{
                      if(err) return console.log(err)
                        
                       })
                
            res.send({
         
                 status:true,
                 textStatus:"Agreed & Signed"
            })  
            
            
        })





    }


  module.exports = {FinalLetterOffer,accepted_disbursement,GetLoanSteps,Getdisbursement_requests_submit_file,Submit_SignFinalOfferLetter}