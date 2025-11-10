const db = require('../../../../../database/db');




personelReference = (token)=>{


        
              const sql = "INSERT INTO personal_references(token) VALUES(?)";
        
              const list = [token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("personal_references inserted")

            })



}



module.exports = personelReference

