const db = require('../../../database/db');
const {PostMssgNote} = require('./MssgNotfier');
const {UpdateAcknowledgment } = require("../../applicants/SignUp/acknowledgment")


/* CREATE TABLE loan_steps(

      loan_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
      verification VARCHAR(200),
      approval VARCHAR(200),
      bank_review VARCHAR(200),
      accept_offer VARCHAR(200),
      open_account VARCHAR(200),
      letter_status VARCHAR(200),
      ut_letter VARCHAR(200),
      ap_letter VARCHAR(200),
      disbursment VARCHAR(200),
      done VARCHAR(200),
      expiry VARCHAR(200),
      user_token VARCHAR(200),
      createdAtTime VARCHAR(100),
      createdAtDate VARCHAR(100)
); */

HandleVerifyDone_Return = (req,res)=>{



       const {type,user_token,verifier_token} = req.body

       if(!type || !user_token){
           return res.sendStatus(400)
       }

       const sql = "UPDATE sign_up SET verify_status = ? , verifier_token = ? WHERE user_token = ?;"
       const sqlloan_steps = "INSERT INTO loan_steps(verification,user_token,createdAtTime,createdAtDate) VALUES(?,?,?,?);"
       const sqlApprove = "UPDATE loan_steps SET approval = ? WHERE  user_token = ?;"
       const sqlAcceptedOrRejected = "UPDATE loan_steps SET bank_review = ? WHERE  user_token = ?;"
       const sqlapplicant_doc = "SELECT * FROM applicant_doc WHERE user_token = ?;"
       const time  = new Date().toLocaleTimeString()
       const date  = new Date().toLocaleDateString()
       let mssg_subject = ""
       let mssg_body = ""
      
        let verify_status 

        if(type === "verified"){

               verify_status = type
               mssg_subject = "Document Verified"
               mssg_body = "Your document has been successfully verified."



                db.query(sqlapplicant_doc,[user_token],(err,result)=>{

                        if(err) console.log(err)

                           // YOU need to fix this code , base on application status

                                
                               if( result?.length > 0){

                                     const check =  result.every(doc => 
                              ["Accepted", "accepted",null].includes(doc.verify_status)
                           );
                            console.log("Check status of all documents:", check);
                           if(check){

                        db.query(sqlloan_steps,[verify_status,user_token,time,date],(err,result)=>{

                        if(err) console.log(err)

                        db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{

                        if(err) console.log(err.message)

                     
                         res.send({
                        status: true,
                        textStatus: verify_status
                        })

                        PostMssgNote (verifier_token,user_token,mssg_subject,mssg_body,"")



                         })




                        })

                        }else{


                        res.send({
                        status: false,
                        textStatus:"Correct all documents First!"
                        })

                        return

                        }

                           

                          }else{
                              res.send({ 
                                 status: false,
                                 textStatus:"No Applicant found for verification."
                              })
                              return
                          }

                        

                        })

         // at this stage the application is returned to the applicant with a pending status , but flag as returned
        }else if(type === "pending"){

               verify_status = type
                mssg_subject = "Document Returned"
                mssg_body = "Your document has been returned. Please review and resubmit."


                 

                        db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{

                        if(err) console.log(err.message)

                         res.send({
                        status: true,
                        textStatus: verify_status
                        })
                        UpdateAcknowledgment(user_token)
                        PostMssgNote (verifier_token,user_token,mssg_subject,mssg_body,"return_verification")



                        })

                      




        }else if(type === "disqualified"){

              verify_status = type
               mssg_subject = "Application Disqualified"
               mssg_body = "We regret to inform you that your application has been disqualified."



                     db.query(sqlloan_steps,[verify_status,user_token,time,date],(err,result)=>{

                        if(err) console.log(err)

                        db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{

                        if(err) console.log(err.message)

                          res.send({
                        status: true,
                        textStatus: verify_status
                        })
                        PostMssgNote (verifier_token,user_token,mssg_subject,mssg_body,"")



                        })

                        })


        }
        else if(type === "approved"){

                verify_status = type
                mssg_subject = "Loan Approved"
                mssg_body = "Congratulations! Your loan has been approved and is moving to the next stage."

                   db.query(sqlApprove,[verify_status,user_token,time,date],(err,result)=>{

                        if(err) console.log(err)

                        db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{

                        if(err) console.log(err.message)

                        res.send(verify_status)
                        PostMssgNote (verifier_token,user_token,mssg_subject,mssg_body,"")



                        })

                        })



        }else if(type === "returned_by_approver"){

                  verify_status = type
                    mssg_subject = "Loan Returned by Approver"
                    mssg_body = "Your loan has been returned by the approver. Please review the feedback and take necessary actions."

                     db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{

                        if(err) console.log(err.message)

                        res.send(verify_status)
                        PostMssgNote (verifier_token,user_token,mssg_subject,mssg_body,"")



                        })

        }else if(type === "accepted"){

                    verify_status = type
                    mssg_subject = "Loan Accepted by the bank"
                    mssg_body = "Your loan offer has been accepted by the bank. We will proceed with the next steps."

                      const checkOffer = "SELECT search_status FROM credit_search WHERE user_token = ?;"

                        db.query(checkOffer,[user_token],(err,result)=>{

                                        if(err) console.log(err)

                                            if(result.length > 0){

                                               if( result[0].search_status === "notok" || result[0].search_status === "not searched"){
     
                                                    res.send({
                                                          status: false,
                                                          textStatus:" Credit Search not OK. Cannot accept loan."
                                                           }) 
     
                                                           return
                                               }else{
     
     
                                                  db.query(sqlAcceptedOrRejected,[verify_status,user_token,time,date],(err,result)=>{
                           
                                                   if(err) console.log(err)
                           
                                                   db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{
                           
                                                   if(err) console.log(err.message)
                           
                                                   res.send(verify_status)
                                                   PostMssgNote (verifier_token,user_token,mssg_subject,mssg_body,"")
                           
                           
                           
                                                   })
                           
                                                   })
     
     
                                               }

                                            }else{

                                                res.send({
                                                    status: false,
                                                    textStatus:" Credit Search not found. Cannot accept loan."
                                                     }) 
                                            }
                                   
                        }) 




        }else if(type === "rejected"){

             verify_status = type
                    mssg_subject = "Loan Rejected by the bank"
                    mssg_body = "We regret to inform you that your loan application has been rejected by the bank."
                       const checkOffer = "SELECT search_status FROM credit_search WHERE user_token = ?;"

                        db.query(checkOffer,[user_token],(err,result)=>{

                                        if(err) console.log(err)

                                            if(result.length > 0){

                                               if( result[0].search_status === "notok"){
     
                                                   
                                                             db.query(sqlAcceptedOrRejected,[verify_status,user_token,time,date],(err,result)=>{
    
                                                             if(err) console.log(err)
    
                                                             db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{
    
                                                             if(err) console.log(err.message)
    
                                                             res.send({
                                                             status: true,
                                                             textStatus: verify_status
                                                             }) 
    
                                                             PostMssgNote (verifier_token,user_token,mssg_subject,mssg_body,"")
    
    
    
                                                             })
    
                                                                  })
                                                         }else{


                                                             res.send({
                                                          status: false,
                                                          textStatus:" Credit Search not OK. Cannot reject loan."
                                                           })

                                                             return

                                                         }
                                                         
                                                   
                                                         }
                                                         else{


                                                         
                                                         res.send({
                                                             status: false,
                                                             textStatus:" Credit Search not found. Cannot reject loan."
                                                              })






                                                             }



                  }  
                )





        }
        

   


                           







}
      
      









module.exports = HandleVerifyDone_Return