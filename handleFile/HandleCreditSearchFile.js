const multer = require("multer");
const path = require("path");




// Multer storage configuration
const storage = multer.diskStorage({

    destination: (req,File,callBack) => {
        callBack(null, './assets/credit_search')     // './public/images/' directory name where save the file
    },
    filename: (req,File, callBack) => {
      callBack(null, File.fieldname + '-' + Date.now() + path.extname(File.originalname))
      
    }

    
});

const HandleCreditSearchFile = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});



module.exports = HandleCreditSearchFile;


