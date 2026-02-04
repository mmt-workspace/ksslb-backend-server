const multer = require("multer");
const path = require("path");




// Multer storage configuration
const storage = multer.diskStorage({

    destination: (req,File,callBack) => {
        callBack(null, './assets/documents')     // './public/images/' directory name where save the file
    },
    filename: (req,File, callBack) => {
      callBack(null, File.fieldname + '-' + Date.now() + path.extname(File.originalname))
      
    }

    
});

const HandleFinalLetter = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});



module.exports = HandleFinalLetter;


