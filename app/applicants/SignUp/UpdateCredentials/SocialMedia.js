const db = require('../../../../database/db');
const RandomID = require('../../../../functions/RandomID')



SocialMedia = (req,res)=>{

    
              const {  facebook_handle,instergram_handle,twitter_handle,user_token} = req.body
              const valuePer = 25

             

              const sql = "UPDATE social_media_table SET facebook_handle = ?, instergram_handle = ?, twitter_handle = ?, valuePer = ? WHERE user_token = ?;";
        
              const list = [  facebook_handle,instergram_handle,twitter_handle,valuePer,user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err)
                   //     console.log(result)
                 //   console.log("Updated social media")
                res.send({
                        textStatus:"Updated!!",
                        status:true,
                })
 
            })



}



module.exports = SocialMedia