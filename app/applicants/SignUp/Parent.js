const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



Parent = (user_token)=>{


        


         const sql = "INSERT INTO parent_table(user_token) VALUES(?)";
        
         const list = [user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("parent_table inserted")

            })

}



module.exports = Parent