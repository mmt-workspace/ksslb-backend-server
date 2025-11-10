const db = require('../../../../../database/db');



updateSpouseDetails = (req,res)=>{
       
      
        
              const { first_name,middle_name,surname,office_address,phone_no_1,phone_no_2,email,user_token} = req.body
              const valuePer = 25

      
              const sql = "UPDATE spouse_details SET first_name = ?,middle_name = ?, surname = ?,office_address = ? , phone_no_1 = ? ,phone_no_2 = ?,email = ?, valuePer = ? WHERE token = ?;";
        
              const list = [first_name,middle_name,surname,office_address,phone_no_1,phone_no_2,email,valuePer,user_token]
          
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                //  console.log("Updated p")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })
 


}



module.exports = updateSpouseDetails







