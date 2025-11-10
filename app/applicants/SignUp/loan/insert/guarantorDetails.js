const db = require('../../../../../database/db');









guarantorDetails = (token)=>{


        
              const sql = "INSERT INTO guarantor_details(token) VALUES(?)";
        
              const list = [token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("guarantor_details inserted")

            })



}



module.exports = guarantorDetails