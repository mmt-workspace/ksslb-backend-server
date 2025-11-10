const db = require("../../../database/db")
const {SetDateFomat,SetTimeFormat}  = require("../../../functions/Date")
const TokensGenerator = require("../../../functions/TokensGenerator")



ApplicantUplaod_Doc = (req,res)=>{
  

     const {document_file_name,document_type_name,file_token,user_token} = req.body
   
     
     
   

     const sql = "INSERT INTO applicant_doc(document_file_name,document_type_name,upload_status,user_token,file_token,verify_status,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?,?);"

     const time = SetTimeFormat()
     const date = SetDateFomat()
     
     const upload_status = "done"
     const verify_status = "not"
 
  
     db.query(sql,[document_file_name,document_type_name,upload_status,user_token,file_token,verify_status,time,date],(err,result)=>{

         if(err) return console.log(err.message)

          res.send({
             status:true,
             textStatus:"Uploaded"
          })



     })



}



// Get Upload Doc

GetUploadDocApplicant = (req,res)=>{

    const user_token = req.params.user_token
    const file_token = req.params.file_token
   // console.log(user_token)

    const sql = `SELECT 
    ad.applicant_doc_id,
    ad.document_type_name,
    ad.document_file_name,
    ad.rejectionReason,
    ad.user_token,
    ad.file_token,
    ad.verify_status,
    ad.upload_status,
    rm.mssg AS reject_message,
    rm.verifier_token,
    rm.insertdate
FROM applicant_doc AS ad
INNER JOIN rejectmsg AS rm
    ON ad.user_token = rm.applicant_token
    AND ad.file_token = rm.document_token
WHERE ad.user_token = ? AND ad.verify_status = 'rejected' ORDER BY ad.applicant_doc_id DESC;

`

    db.query(sql,[user_token],(err,result)=>{

        if(err) return console.log(err.message)

        res.json(result)

    })

}


// reject message
// update reject table through applicant token and document token

RejectMssgApplicantDoc = (req,res)=>{

    const {applicant_token,document_token,verifier_token,mssg} = req.body

     // check  if column exists
     const checkSql = "SELECT * FROM rejectmsg WHERE applicant_token = ? AND document_token = ?"
     
    // update rejectmsg table
    const sql = "UPDATE rejectmsg SET mssg = ?,verifier_token = ? WHERE applicant_token = ? AND document_token = ?"

    db.query(checkSql,[applicant_token,document_token],(err,result)=>{

        if(err) return console.log(err.message)

        if(!result.length > 0){
            
              res.send({
                status:false,
                textStatus:"No record found"
              })

        }else{

      db.query(sql,[mssg,verifier_token,applicant_token,document_token],(err,result)=>{

        if(err) return console.log(err.message)
            
        res.send({
            status:true,
            textStatus:"Message Sent"
        })  
    })



        }


})



    
}

// get reject message by applicant token and document token

GetRejectMssgApplicantDoc = (req,res)=>{

    const {applicant_token,document_token} = req.params

    const sql = "SELECT * FROM rejectmsg WHERE applicant_token = ? AND document_token = ?"

    db.query(sql,[applicant_token,document_token],(err,result)=>{

        if(err) return console.log(err.message)

        res.json(result)

    })

}



module.exports = {ApplicantUplaod_Doc,GetUploadDocApplicant,RejectMssgApplicantDoc,GetRejectMssgApplicantDoc}