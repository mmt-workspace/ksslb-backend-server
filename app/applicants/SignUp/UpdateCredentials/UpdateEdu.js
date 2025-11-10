const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID')



UpdateEdu = (req,res)=>{

       
              const {matric_num,faculty,deparment,university,current_level,gpa,year_of_admission,year_of_graduation,course_of_study,nelfund_status,nelfund_indicator,user_token} = req.body
              const valuePer = 25
              const sql = "UPDATE edu_table SET matric_num = ?,faculty = ?, deparment = ?,gpa = ? , university = ? ,current_level = ?, year_of_admission = ?,year_of_graduation = ?,course_of_study = ?,nelfund_status = ?,nelfund_indicator = ?, valuePer = ? WHERE user_token = ?;";
        
              const list = [matric_num,faculty,deparment,gpa,university,current_level,year_of_admission,year_of_graduation,course_of_study,nelfund_status,nelfund_indicator,valuePer,user_token]
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