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

              const sql = "UPDATE applicant_doc SET document_file_name = ?, upload_status = ? , reupload_status = ? WHERE user_token = ? AND file_token = ?; "
              const checksql = "SELECT * FROM applicant_doc WHERE  user_token = ? AND file_token = ?;"
              const document_file_name = req.file.filename;
              const reupload_status = "reuploaded"

              db.query(checksql,[user_token,file_token],(err,result)=>{

                     if(err) return console.log(err.message)

                       // console.log(result)

                       if(result.length > 0){
                           
                             db.query(sql,[document_file_name,"done",reupload_status,user_token,file_token],(err,result)=>{

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

   
     const sql = `SELECT * FROM applicant_doc WHERE user_token = ? AND ref_doc_token = ? AND qualification_type = ?;`;
  


    db.query(sql, [user_token,ref_doc_token,qualification_type], (err, result) => {

          // console.log(result)
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
             
             db.query(sql, [user_token,ref_doc_token,"both"], (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Database error", error: err });

                }  

                res.send(result);
                 console.log(result);

            });
             return
        }

        res.send(result);

    });
};



const get_doc_for_applicant_profile = (req, res) => {

/* CREATE TABLE upload_doc(

          upload_doc_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
          document_type_name VARCHAR(200) NOT NULL,
          resdentialType VARCHAR(200) NOT NULL,
          documentType VARCHAR(200) NOT NULL,
          document_for VARCHAR(200) NOT NULL,
          loan_category VARCHAR(200),
          upload_for VARCHAR(200),
          visibility VARCHAR(200),
          instrct VARCHAR(500) NOT NULL,
          upload_status VARCHAR(100),
          doc_token VARCHAR(200),
          createdAtTime VARCHAR(100),
          createdAtDate VARCHAR(100)

);

CREATE TABLE applicant_doc(

    applicant_doc_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    document_type_name VARCHAR(200) NOT NULL,
    document_file_name VARCHAR(200) NOT NULL,
    residential_type VARCHAR(200),
    ref_doc_token VARCHAR(200),
    qualification_type VARCHAR(200),
    upload_status VARCHAR(100),
    verify_status VARCHAR(50),
    rejectionReason VARCHAR(200),
    user_token VARCHAR(200),
    file_token VARCHAR(200),
    createdAtTime VARCHAR(100),
    createdAtDate VARCHAR(100)
);
 */
    const { loanRequest,from,user_token } = req.params;
     
    if (!loanRequest || !from || !user_token) {
        return res.status(400).json({ message: "All fields are required" });
    }
     let upload_docSql , applicant_docSql, allSql;

       if(from === "verification" || from === "loanapproval"){

          allSql = `SELECT up.*,ad.* FROM upload_doc up LEFT JOIN applicant_doc ad ON up.doc_token = ad.ref_doc_token WHERE ad.user_token = ? AND up.loan_category = ?;`;
       
            db.query(allSql, [user_token,loanRequest], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No documents found for this user token" });
        }


        res.send(result);



    });

       }else  if(from === "bankreviewer"){

          
        allSql = `SELECT up.*,ad.* FROM upload_doc up LEFT JOIN applicant_doc ad ON up.doc_token = ad.ref_doc_token WHERE ad.user_token = ? AND up.loan_category = ? AND visibility = ? ;`;
       

         db.query(allSql, [user_token,loanRequest,'yes'], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No documents found for this user token" });
        }

       //  console.log(result)
        res.send(result);




    });

       }
       
  




   
};






module.exports = { UploadDocument, GetUploadDocumentByUserToken,CheckDocument ,get_doc_for_applicant_profile};


