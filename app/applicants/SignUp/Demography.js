const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



Demography = (state_of_origin,local_gov,user_token)=>{


        
              const sql = "INSERT INTO demography_table(state_of_origin,local_gov,user_token) VALUES(?,?,?)";
        
              const list = [state_of_origin,local_gov,user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("demography_table inserted")

            })

}



module.exports = Demography