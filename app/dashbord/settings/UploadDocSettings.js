const db = require("../../../database/db");
const TokensGenerator = require("../../../functions/TokensGenerator");
const { SetDateFomat, SetTimeFormat } = require("../../../functions/Date");
const path = require("path");
const fs = require("fs")



// Upload File Controller
 UploadDocSettings = (req,res) => {


  const { file_name, instructions, action,loan_category, user_token } = req.body;

  // Validate request
  if (!req.file) {

    return res.status(400).json({ textStatus: "No file uploaded", status: false });
  }

  if (!file_name || !instructions || !action) {

    return res.status(400).json({ textStatus: "All fields are required", status: false });

  }

  const file_token = TokensGenerator(10);
  const file_path = req.file.filename;
 
  const sql = ` 
    INSERT INTO uploaded_files 
    (file_token, file_name, instructions, action, file_path,uploaded_at, user_token,loan_category)
    VALUES (?, ?, ?, ?, ?, NOW(),?,?)`;

  db.query(sql,[file_token, file_name, instructions, action, file_path, user_token || null,loan_category], (err, result) => {
    if (err) {
      console.error("Error uploading file:", err.message);
      return res.status(500).json({ textStatus: "Error uploading file", status: false });
    }

    res.send({
      textStatus: "File uploaded successfully",
      status: true
    });
  });



  
};








 UploadedFilesGet = (req, res) => {

  const sql = "SELECT * FROM uploaded_files ORDER BY uploaded_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ textStatus: "Error fetching files", status: false });
    }

    // Generate URL for each file (if stored in public/uploads)
    const files = result.map((row) => ({
      ...row,
      file_url: `/uploads/${row.file_path}`,
    }));

    res.send(files);
  });
};





 DeleteUploadedFile = (req, res) => {




  const { file_token } = req.params;

  const getFileSql = "SELECT file_path FROM uploaded_files WHERE file_token = ?";
  const deleteSql = "DELETE FROM uploaded_files WHERE file_token = ?";

  db.query(getFileSql, [file_token], (err, result) => {

    if (err) {
      console.error(err.message);
      return res.status(500).json({ textStatus: "Error fetching file", status: false });
    }

    if (result.length === 0) {
      return res.status(404).json({ textStatus: "File not found", status: false });
    }



const rootPath = path.join(__dirname, "../../../../");
const filePath = path.join(rootPath, "assets/uploads/", result[0].file_path);
 console.log(result[0].file_path)
// Delete file from filesystem
fs.unlink(filePath, (fsErr) => {

  if (fsErr && fsErr.code !== "ENOENT") {
    console.error("File delete error:", fsErr);
    return res.status(500).json({ textStatus: "Error deleting file", status: false });
  }

  // Delete record from DB
  db.query(deleteSql, [file_token], (deleteErr) => {
    if (deleteErr) {
      console.error(deleteErr);
      return res.status(500).json({ textStatus: "Error deleting file record", status: false });
    }

    res.send({ textStatus: "File deleted successfully", status: true });
  });

});








  });




};









module.exports = {UploadDocSettings,UploadedFilesGet,DeleteUploadedFile};
