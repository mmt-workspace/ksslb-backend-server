const db = require('../../../../../database/db');









salaryBankDetails = (token)=>{


        
              const sql = "INSERT INTO salary_bank_details(token) VALUES(?)";
        
              const list = [token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("salary_bank_details inserted")

            })



}



module.exports = salaryBankDetails




