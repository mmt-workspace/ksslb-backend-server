const db = require("../../../../database/db")
const TokensGenerator = require("../../../../functions/TokensGenerator")
const {SetTimeFormat,SetDateFomat} = require("../../../../functions/Date")

 

const UpdateApplicantVerifyStatus = (file_token,verify_status)=>{

    const sql = "UPDATE applicant_doc SET verify_status = ? WHERE file_token = ?;"
  
    db.query(sql,[verify_status,file_token],(err,result)=>{

        if(err) return console.log(err.message)
          console.log("applicant verify status updated")

    })

}


// check if file exist update it

CheckDocument = (req,res,next)=>{


            const {user_token,file_token} = req.body

            

              if (!req.file) return res.status(400).json({ message: "No file uploaded" });

              const sql = "UPDATE applicant_doc SET document_file_name = ?, upload_status = ? WHERE user_token = ? AND file_token = ?; "
              const checksql = "SELECT * FROM applicant_doc WHERE  user_token = ? AND file_token = ?;"
              const document_file_name = req.file.filename;

              db.query(checksql,[user_token,file_token],(err,result)=>{

                     if(err) return console.log(err.message)

                       // console.log(result)

                       if(result.length > 0){
                           
                             db.query(sql,[document_file_name,"done",user_token,file_token],(err,result)=>{

                                               if(err) console.log(err.message)

                                                 // clear notification bell
                                                 UpdateApplicantVerifyStatus(file_token,"not")



                                        res.send({
                                        textStatus: "File uploaded successfully",
                                        status: true
                                        })    
                             })
                       } else{

                             next()
                       }
              })
          
}


UploadDocument = (req,res)=>{



    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { document_type_name, user_token, residentialType, ref_doc_token, qualification_type } = req.body;

    if (!document_type_name || !user_token || !residentialType || !ref_doc_token || !qualification_type) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    
    const file_token = TokensGenerator(14)
    const upload_status = "done"
    const document_file_name = req.file.filename; 
    const createdAtTime = SetTimeFormat()
    const createdAtDate = SetDateFomat()

    const sql = `INSERT INTO applicant_doc(document_file_name, document_type_name,residential_type, upload_status, user_token, file_token,ref_doc_token, qualification_type,createdAtTime, createdAtDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?);`;

    const values = [document_file_name,document_type_name,residentialType,upload_status,user_token,file_token,ref_doc_token,qualification_type,createdAtTime, createdAtDate];
    
  
    db.query(sql, values, (err, result) => {

        if (err) {          
            console.log(err)
            return res.status(500).json({ message: "Database error", error: err });
        }

        res.send({
             textStatus: "File uploaded successfully",
             status: true
        })
    });


}
 
const GetUploadDocumentByUserToken = (req, res) => {


    const { user_token,qualification_type,ref_doc_token } = req.params;

    const sql = `SELECT * FROM applicant_doc WHERE user_token = ? AND qualification_type = ? AND ref_doc_token = ?;`;

    db.query(sql, [user_token,qualification_type,ref_doc_token], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No documents found for this user token" });
        }

        res.send(result);

    });
};



const GetUploadDocument_for_checkup = (req, res) => {


    const { user_token,qualification_type,ref_doc_token } = req.params;
    
    
    const sql = `SELECT * FROM applicant_doc WHERE user_token = ? AND qualification_type = ? AND ref_doc_token = ?;`;
    const sql1 = `SELECT * FROM upload_doc WHERE doc_token = ?;`;

    db.query(sql, [user_token,qualification_type,ref_doc_token], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No documents found for this user token" });
        }

        res.send(result);

    });
};






module.exports = { UploadDocument, GetUploadDocumentByUserToken,CheckDocument };


