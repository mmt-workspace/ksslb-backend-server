const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



applicant_credentials = (user_token)=>{

    
              const sql = "INSERT INTO applicant_credentials(s_i_d,user_token) VALUES(?,?)"
              const ID = RandomID(4349932).toString()
              const list = [ID,user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("applicant_credentials inserted")
            })

}



module.exports = applicant_credentials