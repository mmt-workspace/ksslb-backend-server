const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID')



UpdateEdu = (req,res)=>{

        
              const {matric_num,faculty,deparment,gpa,user_token} = req.body
              const valuePer = 25
              
              
              const sql = "UPDATE edu_table SET matric_num = ?,faculty = ?, deparment = ?,gpa = ? , valuePer = ? WHERE user_token = ?;";
        
              const list = [matric_num,faculty,deparment,gpa,valuePer,user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                  console.log("Updated Edu")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })



}



module.exports = UpdateEdu