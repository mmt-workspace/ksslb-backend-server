const db = require('../../../database/db');
const VerificationNotfication = require("../../../email/VerificationNotfication")
const {PostMssgNote} = require('./MssgNotfier');



 


const UpdateApplicantDocStatus = (file_token,upload_status)=>{

    const sql = "UPDATE applicant_doc SET upload_status = ? WHERE file_token = ?;"
  
    db.query(sql,[upload_status,file_token],(err,result)=>{

        if(err) return console.log(err.message)
          console.log("applicant doc status updated")

    })

}






HandleVerify = (req,res)=>{



        const {type,file_token,rejectionReason,email,document_type_name,user_token,verifier_token} = req.body
        let mssg_subject = ""
        let mssg_body = ""
       

       if(!type || !file_token){
           return res.sendStatus(400)
       }
  
       
       let verify_status,SqlApplicant_doc

        if(type === "accepted"){

            verify_status = type
            mssg_subject = "Document Accepted"
            mssg_body = "Your  document has been accepted successfully."
            SqlApplicant_doc = "UPDATE applicant_doc SET verify_status = ?, rejectionReason = ? WHERE file_token = ?;"

      db.query(SqlApplicant_doc,[verify_status,rejectionReason,file_token],(err,result)=>{
            
        if(err) console.log(err.message)



       PostMssgNote(verifier_token,user_token,mssg_subject,mssg_body,"")
        res.send(verify_status)


      })


        } else if(type === "revoked"){


             verify_status = type
             mssg_subject = "Document revoked"
             mssg_body = `Reason: ${rejectionReason},  Your document has been revoked.`
             SqlApplicant_doc = "UPDATE applicant_doc SET verify_status = ?, rejectionReason = ? WHERE file_token = ?;"
           //  UpdateApplicantDocStatus(file_token,verify_status)

           
      db.query(SqlApplicant_doc,[verify_status,rejectionReason,file_token],(err,result)=>{
            
        if(err) console.log(err.message)



       PostMssgNote(verifier_token,user_token,mssg_subject,mssg_body,"")
        res.send(verify_status)


      })

           
        }
        else{

             verify_status = type
             mssg_subject = verify_status
             mssg_body = `Reason: ${rejectionReason},  Your document has been rejected.`
             SqlApplicant_doc = "UPDATE applicant_doc SET verify_status = ?, rejectionReason = ?, reupload_status = ? WHERE file_token = ?;"

            UpdateApplicantDocStatus(file_token,verify_status)


              const sql = "SELECT * FROM rejectmsg WHERE applicant_token = ? AND document_token = ?"

              db.query(sql,[user_token,file_token],(err,result)=>{

              if(err) return console.log(err.message)

                VerificationNotfication(email,verify_status,document_type_name,rejectionReason,result[0].mssg)
                PostMssgNote(verifier_token,user_token,mssg_subject,mssg_body,"")


              })




      db.query(SqlApplicant_doc,[verify_status,rejectionReason,'new',file_token],(err,result)=>{
            
        if(err) console.log(err.message)



       PostMssgNote(verifier_token,user_token,mssg_subject,mssg_body,"")
        res.send(verify_status)


      })


              
        }

 

      
      


}






module.exports = {HandleVerify}