const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



Bio = (fname,lname,mobileNumber,gender,d_o_b,resdential_type,user_token)=>{

              let valuePer = 25
              const sql = "INSERT INTO bio_table(fname,lname,mobileNumber,gender,d_o_b,resdential_type,valuePer,user_token) VALUES(?,?,?,?,?,?,?,?);"
            
              const list = [fname,lname,mobileNumber,gender,d_o_b,resdential_type,valuePer,user_token]
            // Store hash in your password DB.
             db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("bio_table inserted")
            })
            

}



module.exports = Bio