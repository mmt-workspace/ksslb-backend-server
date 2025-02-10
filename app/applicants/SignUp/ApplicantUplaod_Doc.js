const db = require("../../../database/db")
const {SetDateFomat,SetTimeFormat}  = require("../../../functions/Date")
const TokensGenerator = require("../../../functions/TokensGenerator")



ApplicantUplaod_Doc = (req,res)=>{
  

     const {document_file_name,document_type_name,file_token,user_token} = req.body
   
     
     
   

     const sql = "INSERT INTO applicant_doc(document_file_name,document_type_name,upload_status,user_token,file_token ,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?);"

     const time = SetTimeFormat()
     const date = SetDateFomat()
     
     const upload_status = "done"
 
  
     db.query(sql,[document_file_name,document_type_name,upload_status,user_token,file_token,time,date],(err,result)=>{

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
    console.log(user_token)

    const sql = "SELECT * FROM applicant_doc WHERE user_token = ?"

    db.query(sql,[user_token],(err,result)=>{

        if(err) return console.log(err.message)

        res.json(result)

    })

}











module.exports = {ApplicantUplaod_Doc,GetUploadDocApplicant}