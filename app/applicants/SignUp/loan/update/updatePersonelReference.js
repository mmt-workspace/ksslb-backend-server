const db = require('../../../../../database/db');



updatePersonelReference = (req,res)=>{
       
      



              const { first_ref_first_name,first_ref_middle_name,first_ref_surname,first_ref_relationship,first_ref_address,first_ref_phone_no_1,first_ref_phone_no_2,first_ref_email,second_ref_first_name,second_ref_middle_name,second_ref_surname,second_ref_relationship,second_ref_address,second_ref_phone_no_1,second_ref_phone_no_2,second_ref_email,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE personal_references SET first_ref_first_name = ?,first_ref_middle_name = ?, first_ref_surname = ?,first_ref_relationship = ? , first_ref_address = ? ,first_ref_phone_no_1 = ? ,first_ref_phone_no_2 = ?, first_ref_email = ?,second_ref_first_name = ?,second_ref_middle_name = ?,second_ref_surname = ?,second_ref_relationship = ?,second_ref_address = ?,second_ref_phone_no_1 = ?,second_ref_phone_no_2 = ?,second_ref_email = ?,valuePer = ? WHERE token = ?;";
        
              const list = [first_ref_first_name,first_ref_middle_name,first_ref_surname,first_ref_relationship,first_ref_address,first_ref_phone_no_1,first_ref_phone_no_2,first_ref_email,second_ref_first_name,second_ref_middle_name,second_ref_surname,second_ref_relationship,second_ref_address,second_ref_phone_no_1,second_ref_phone_no_2,second_ref_email,valuePer,user_token]
          
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                //  console.log("Updated p")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })
 


}



module.exports = updatePersonelReference

