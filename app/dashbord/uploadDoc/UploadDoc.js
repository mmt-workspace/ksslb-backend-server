const db = require("../../../database/db")
const validator = require('validator'); 
const {SetDateFomat,SetTimeFormat}  = require("../../../functions/Date")
const TokensGenerator = require("../../../functions/TokensGenerator")



UploadDoc = (req,res)=>{
  

     const {resdentialType,documentType,document_type_name,instrct} = req.body

     const fieldsToValidate = {
        document_type_name,
        resdentialType,
        documentType,
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
     

     const sql = "INSERT INTO upload_doc(document_type_name,resdentialType,documentType,instrct,upload_status,doc_token,createdAtTime,createdAtDate) VALUES(?,?,?,?,?,?,?,?);"
     const time = SetTimeFormat()
     const date = SetDateFomat()
     const file_token = TokensGenerator(14)
     const upload_status = "Uploaded"
 
     
     db.query(sql,[document_type_name,resdentialType,documentType,instrct,upload_status,file_token,time,date],(err,result)=>{

         if(err) return console.log(err.message)

          res.send({
             status:true,
             textStatus:"Uploaded"
          })




     })

  



}



// Get Upload Doc

GetUploadDoc = (req,res)=>{

   

    const sql = "SELECT * FROM upload_doc;"

    db.query(sql,(err,result)=>{

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









module.exports = {UploadDoc,GetUploadDoc,DeleteUploadDoc}