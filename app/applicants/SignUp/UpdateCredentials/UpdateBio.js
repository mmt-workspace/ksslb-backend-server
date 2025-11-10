const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID')



UpdateBio = (req,res)=>{

     


              const { fname,md_name,lname,d_o_b,mobileNumber,user_token} = req.body
              const valuePer = 25

               console.log(fname,md_name,lname,d_o_b,mobileNumber,user_token)

              const sql = "UPDATE bio_table SET fname = ?, md_name = ?, lname = ? , d_o_b = ? , mobileNumber = ?, valuePer = ? WHERE user_token = ?;";
        
              const list = [ fname,md_name,lname,d_o_b,mobileNumber,valuePer,user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
                      console.log(err)
                    if(err) return console.log(err.message)
                 //   console.log("Updated Demographic")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })



}



module.exports = UpdateBio