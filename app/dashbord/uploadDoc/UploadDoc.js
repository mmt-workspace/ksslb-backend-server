const db = require("../../../database/db")
const validator = require('validator'); 
const {SetDateFomat,SetTimeFormat}  = require("../../../functions/Date")
const TokensGenerator = require("../../../functions/TokensGenerator")



UploadDoc = (req,res)=>{
  

     const {resdentialType,documentType,document_type_name,document_for,instrct} = req.body

     const fieldsToValidate = {
        document_type_name,
        resdentialType,
        documentType,
        document_for,
        instrct, 
      };
  
      const isEmpty = (value) => {
        return validator.isEmpty(value, { ignore_whitespace: true });
      };


      // Loop through the fields and check if they are empty
for (const [fieldName, fieldValue] of Object.entries(fieldsToValidate)) {
    if (isEmpty(fieldValue)) {
      return res.status(400).json({ error: `${fieldName} cannot be empty` });
    }
  }
     

     const sql = "INSERT INTO upload_doc(document_type_name,resdentialType,documentType,document_for,instrct,upload_status,doc_token,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?,?,?);"
     const time = SetTimeFormat()
     const date = SetDateFomat()
     const file_token = TokensGenerator(14)
     const upload_status = "Uploaded"
 
     
     db.query(sql,[document_type_name,resdentialType,documentType,document_for,instrct,upload_status,file_token,time,date],(err,result)=>{

         if(err) return console.log(err.message)

          res.send({
             status:true,
             textStatus:"Document required Set"
          })




     })

  



}



// Get Upload Doc

GetUploadDoc = (req,res)=>{

   

    const sql = "SELECT * FROM upload_doc ORDER BY upload_doc_id DESC;;"

    db.query(sql,(err,result)=>{

        if(err) return console.log(err.message)

        res.json(result)

    })

}

GetUploadDocForApplicantSection = (req,res)=>{



    const document_for = req.params.document_for
    const sql = "SELECT * FROM upload_doc WHERE document_for = ? ORDER BY upload_doc_id DESC;"

    db.query(sql,[document_for],(err,result)=>{

        if(err) return console.log(err.message)

        res.json(result)

    })

}

// Delete Upload Doc
DeleteUploadDoc = (req, res) => { 


  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const sql = "DELETE FROM upload_doc WHERE doc_token = ?;";

  db.query(sql, [id], (err, result) => {

    if (err) return console.log(err.message);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Document not found" });
    }
  
    res.send({
      status: true,
      textStatus: "Deleted"
    });
  });


};









module.exports = {UploadDoc,GetUploadDoc,DeleteUploadDoc,GetUploadDocForApplicantSection}