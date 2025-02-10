const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



Edu = (user_token,degree_type)=>{


    
         const sql = "INSERT INTO edu_table(user_token,applying_for_type) VALUES(?,?)";
        
         const list = [user_token,degree_type]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("edu_table inserted")

            })

            

} 



module.exports = Edu