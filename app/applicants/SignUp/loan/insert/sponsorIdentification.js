const db = require('../../../../../database/db');









sponsorIdentification = (token)=>{


        
              const sql = "INSERT INTO sponsorIdentification(token) VALUES(?)";
        
              const list = [token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("sponsorIdentification inserted")

            })



}



module.exports = sponsorIdentification


