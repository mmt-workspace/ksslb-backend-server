const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID')



ParentUpdate = (req,res)=>{
       
        
        
              const {father_full_name,mother_full_name,guardian_valid_mobile,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE parent_table SET father_full_name = ?,mother_full_name = ?, guardian_valid_mobile = ?, valuePer = ? WHERE user_token = ?;";
        
              const list = [father_full_name,mother_full_name,guardian_valid_mobile,valuePer,user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                //  console.log("Updated p")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })



}



module.exports = ParentUpdate