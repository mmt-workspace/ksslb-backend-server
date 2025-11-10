const multer = require("multer");
const path = require("path");




// Multer storage configuration
const storage = multer.diskStorage({

    destination: (req,File,callBack) => {
        callBack(null, './assets/profile')     // './public/images/' directory name where save the file
    },
    filename: (req,File, callBack) => {
      callBack(null, File.fieldname + '-' + Date.now() + path.extname(File.originalname))
      
    }

    
});

const HandlePicture = multer({ 
    storage,
    limits: { fileSize: 500 * 1024 } // Limit file size to 500kb
});



module.exports = HandlePicture;


