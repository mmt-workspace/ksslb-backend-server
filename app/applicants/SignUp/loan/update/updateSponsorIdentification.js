const db = require('../../../../../database/db');



updateSponsorIdentification = (req,res)=>{
       
 
        
              const { first_name,middle_name,surname,date_of_birth,gender,marital_status,phone_no_1,phone_no_2,email,number_of_dependants,mother_maiden_name,bvn,nin_number,tin_number,billing_address,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE sponsorIdentification SET first_name = ?,middle_name = ?, surname = ?,date_of_birth = ? , gender = ? ,  marital_status = ?, phone_no_1 = ? ,phone_no_2 = ? ,email = ?,number_of_dependants = ?,mother_maiden_name = ?,bvn = ?,nin_number = ?,tin_number = ?,billing_address = ? , valuePer = ? WHERE token = ?;";
        
              const list = [first_name,middle_name,surname,date_of_birth,gender ? gender : "not selected",marital_status, phone_no_1,phone_no_2,email,number_of_dependants ? number_of_dependants : 0 ,mother_maiden_name,bvn,nin_number,tin_number,billing_address,valuePer,user_token]
          
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                //  console.log("Updated p") 
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })
 


}



module.exports = updateSponsorIdentification





