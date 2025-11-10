const db = require('../../../../../database/db');



updatesalaryBankDetails = (req,res)=>{
 


              const { account_name,bank,account_number,account_type,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE salary_bank_details SET account_name = ? , bank = ? , account_number = ? , account_type = ? , valuePer = ? WHERE token = ?;";
        
              const list = [account_name,bank,account_number,account_type,valuePer,user_token]
          
              db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                //  console.log("Updated p")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                 })

 
               })
 





}



module.exports = updatesalaryBankDetails




