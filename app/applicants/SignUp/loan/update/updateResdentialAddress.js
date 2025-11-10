const db = require('../../../../../database/db');



updateResdentialAddress = (req,res)=>{
       
    
        
              const { residential_address,residential_status,years_in_apartment,nearest_landmark,profession,profession_type,position
,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE residentialAddress SET residential_address = ?,residential_status = ?, years_in_apartment = ?,nearest_landmark = ? , profession = ? ,profession_type = ?,position = ?, valuePer = ? WHERE token = ?;";
        
              const list = [residential_address,residential_status,years_in_apartment,nearest_landmark,profession,profession_type,position,valuePer,user_token]
          
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                //  console.log("Updated p")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })
 


}



module.exports = updateResdentialAddress







