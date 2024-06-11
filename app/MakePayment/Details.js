const db = require("../../database/db")
const validator = require("validator")





// Insert client details

Details = (user_token,qualification_type,resdential_Type,state_of_origin,local_gov) =>{

    
     if(validator.isEmpty(qualification_type.trim())|| validator.isEmpty(resdential_Type.trim()) || validator.isEmpty(state_of_origin.trim()) || validator.isEmpty(local_gov.trim())){

             console.log("Details input connt be empty")
             return
     }

   // Insert data into details table
    const sql =  "INSERT INTO details(user_token,qualification_type,resdential_Type,state_of_origin,local_gov) VALUES(?,?,?,?,?);"


    db.query(sql,[user_token,qualification_type,resdential_Type,state_of_origin,local_gov],(err,result) =>{

         if(err) return console.log(err.message)

         console.log("details inserted")


    })




}




module.exports = Details