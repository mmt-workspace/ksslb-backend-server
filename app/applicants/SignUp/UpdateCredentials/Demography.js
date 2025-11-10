const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID')



DemographyUpdate = (req,res)=>{

      
              const {home_address,city_town,user_token} = req.body
              const valuePer = 25

              const sql = "UPDATE demography_table SET home_address = ?, city_town = ? , valuePer = ? WHERE user_token = ?;";
        
              const list = [home_address,city_town,valuePer,user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                 //   console.log("Updated Demographic")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })



}



module.exports = DemographyUpdate