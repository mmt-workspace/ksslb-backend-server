const db = require('../../../../../database/db');









employmentDetails = (token)=>{


        
              const sql = "INSERT INTO employment_details(token) VALUES(?)";
        
              const list = [token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("employment_details inserted")

            })



}



module.exports = employmentDetails

