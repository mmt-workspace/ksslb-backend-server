const db = require('../../../database/db');
const RandomID = require('../../../functions/RandomID')



SocialMediaSet = (user_token)=>{


        
              const sql = "INSERT INTO social_media_table(user_token) VALUES(?)";
        
              const list = [user_token]
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                    if(err) return console.log(err.message)
                    console.log("social_media_table inserted")

            })

}



module.exports = SocialMediaSet