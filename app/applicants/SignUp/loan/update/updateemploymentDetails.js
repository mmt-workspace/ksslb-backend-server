const db = require('../../../../../database/db');



updateemploymentDetails = (req,res)=>{
       
     


        
              const { employer_name,employer_address,year_of_confirmation,gross_annual_income,psn_ippis,year_of_retirement,net_monthly_income,grade_level,salary_payment_date,employee_id,qualification,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE employment_details SET employer_name = ?,employer_address = ?, year_of_confirmation = ?,gross_annual_income = ? , psn_ippis = ? ,  year_of_retirement = ?, net_monthly_income = ? ,grade_level = ?,salary_payment_date = ?,employee_id = ?,qualification = ?, valuePer = ? WHERE token = ?;";
        
              const list = [employer_name,employer_address,year_of_confirmation,gross_annual_income,psn_ippis,year_of_retirement, net_monthly_income,grade_level,salary_payment_date,employee_id,qualification,valuePer,user_token]
          
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                //  console.log("Updated p")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })
 

            

}




module.exports = updateemploymentDetails





