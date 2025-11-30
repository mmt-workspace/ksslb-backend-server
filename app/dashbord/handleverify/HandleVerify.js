const db = require('../../../database/db');
const VerificationNotfication = require("../../../email/VerificationNotfication")




 


const UpdateApplicantDocStatus = (file_token,upload_status)=>{

    const sql = "UPDATE applicant_doc SET upload_status = ? WHERE file_token = ?;"
  
    db.query(sql,[upload_status,file_token],(err,result)=>{

        if(err) return console.log(err.message)
          console.log("applicant doc status updated")

    })

}






HandleVerify = (req,res)=>{

       const {type,file_token,rejectionReason,email,document_type_name,user_token} = req.body
       
       
       if(!type || !file_token){
           return res.sendStatus(400)
       }
    
       const sql = "UPDATE applicant_doc SET verify_status = ?, rejectionReason = ? WHERE file_token = ?;"
       let verify_status 

        if(type === "accepted"){

            verify_status = type


        } else if(type === "revoked"){


             verify_status = type
           //  UpdateApplicantDocStatus(file_token,verify_status)


           
        }
        else{

            verify_status = type
           
            UpdateApplicantDocStatus(file_token,verify_status)


              const sql = "SELECT * FROM rejectmsg WHERE applicant_token = ? AND document_token = ?"

              db.query(sql,[user_token,file_token],(err,result)=>{

              if(err) return console.log(err.message)


              VerificationNotfication(email,verify_status,document_type_name,rejectionReason,result[0].mssg)


              })

              
        }

      db.query(sql,[verify_status,rejectionReason,file_token],(err,result)=>{
             
        if(err) console.log(err.message)

        res.send(verify_status)


      })

 

      
      


}






module.exports = {HandleVerify}