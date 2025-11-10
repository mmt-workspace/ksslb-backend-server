const db = require('../../../../../database/db');









loanRequest = (token,loanCategory)=>{


        
              const sql = "INSERT INTO loan_requests(token,loan_category) VALUES(?,?)";
        
              const list = [token,loanCategory]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("loan_requests inserted")

            })



}



module.exports = loanRequest