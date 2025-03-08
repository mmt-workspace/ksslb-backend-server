const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID')



UpdateEdu = (req,res)=>{

        
              const {matric_num,faculty,deparment,university,current_level,gpa,user_token} = req.body
              const valuePer = 25
              
                console.log(university)
              const sql = "UPDATE edu_table SET matric_num = ?,faculty = ?, deparment = ?,gpa = ? , university = ? ,current_level = ? , valuePer = ? WHERE user_token = ?;";
        
              const list = [matric_num,faculty,deparment,gpa,university,current_level,valuePer,user_token]
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