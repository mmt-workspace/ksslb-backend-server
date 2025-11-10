const db = require('../../../../../database/db');









resdentialAddress = (token)=>{


        
              const sql = "INSERT INTO residentialAddress(token) VALUES(?)";
        
              const list = [token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("spouseDetails inserted")

            })



}



module.exports = resdentialAddress


