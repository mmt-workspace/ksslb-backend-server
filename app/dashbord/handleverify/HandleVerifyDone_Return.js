const db = require('../../../database/db');




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
       const sqlAccepted = "UPDATE loan_steps SET bank_review = ? WHERE  user_token = ?;"

    const time  = new Date().toLocaleTimeString()
    const date  = new Date().toLocaleDateString()
      
        let verify_status 

        if(type === "verified"){

            verify_status = type

        }else if(type === "returned"){

             verify_status = type

        }else if(type === "approved"){

             verify_status = type

        }else if(type === "returned_by_approver"){

             verify_status = type
        }else if(type === "accepted"){

             verify_status = type
        }else if(type === "rejected"){

             verify_status = type
        }
        

      db.query(sql,[verify_status,verifier_token,user_token],(err,result)=>{
             
        if(err) console.log(err.message)

           if(type === "verified"){

             db.query(sqlloan_steps,[verify_status,user_token,time,date],(err,result)=>{

                  if(err) console.log(err)
   
             })

           }


            if(type === "approved"){

             db.query(sqlApprove,[verify_status,user_token],(err,result)=>{

                  if(err) console.log(err)
   
             })

           }

            if(type === "accepted"){

             db.query(sqlAccepted,[verify_status,user_token],(err,result)=>{

                  if(err) console.log(err)
   
             })

           }

           

        res.send(verify_status)


      })

 

      
      


}






module.exports = HandleVerifyDone_Return