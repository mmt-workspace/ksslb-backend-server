const db = require("../../../database/db")
/* const {CreateAccessToken,CreateRefreshToken} = require("../../../auth/jwt")
const {UpdateJwtRefreshToken} = require("../../../auth/UpdateJwtRefreshToken") */



LoginApplicant = (req,res)=>{

   const {email} = req.body

   // Get user data
   
   
   let sql = "SELECT email,user_token FROM sign_up WHERE email = ?;"

   db.query(sql,[email],(err,result)=>{

    if(err) return console.log(err)

  //  let AccessToken =  CreateAccessToken(result[0].user_token)
   // let RefreshToken =  CreateRefreshToken(result[0].user_token)
    let user_token = result[0].user_token
   
    // Update Refresh token 
   // UpdateJwtRefreshToken(user_token,RefreshToken)
   

    res./* cookie('clienttokens',RefreshToken,{
       httpOnly:true,
       secure: true,
       sameSite: 'none',
       maxAge: 24 * 60 * 60 * 1000
      } // lax
    ). */send({
            status: true,
           // accessToken : AccessToken,
            Usertoken: user_token,
            textStatus:"Processing",
      })
     
  })
 


}


module.exports = LoginApplicant