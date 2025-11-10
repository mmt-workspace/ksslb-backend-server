const db = require("../../../database/db")
const {CreatAccessToken,CreateRefreshToken,UpdateJwtRefreshToken} = require("../../../auth/jwt")
 




LoginApplicant = (req,res)=>{

   const {email} = req.body

   // Get user data
   
   
   let sql = "SELECT email,user_token FROM sign_up WHERE email = ?;"

   db.query(sql,[email],(err,result)=>{

    if(err) return console.log(err)

    let AccessToken =  CreatAccessToken(result[0].user_token)
    let RefreshToken =  CreateRefreshToken(result[0].user_token)
    let user_token = result[0].user_token
   
    // Update Refresh token 
    UpdateJwtRefreshToken(user_token,RefreshToken)
   

    res.cookie('applicant',RefreshToken,{
      httpOnly: true,
      secure: true,  // Disable secure for local testing
      sameSite: 'none', // Lax works on localhost
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    }).send({
            status: true,
            accesstoken : AccessToken,
           //  Usertoken: user_token,
            textStatus:"Processing",
      })
     
  })
 


}


module.exports = LoginApplicant