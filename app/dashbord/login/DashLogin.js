const db = require("../../../database/db")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const {CreatAccessToken,CreateRefreshToken,UpdateJwtRefreshToken} = require("../../../auth/jwt")



DashLogin = (req,res)  =>{


   const {email,passwrd} = req.body


   if(validator.isEmpty(email) || validator.isEmpty(passwrd)){
    res.sendStatus(422)
    console.log("Empty input not allow")
    return
}

if(!validator.isEmail(email)){
          res.sendStatus(422)
          console.log("not an email")
          return
    }
    
    

  const sql = "SELECT email,passwrd,userToken FROM Administration WHERE email = ?;"


   db.query(sql,[email],async(err,result) =>{

          if(err) return console.log(err.message)
             
        
            if(!result.length > 0) {

                  res.send({
                      text:"Wrong Email or Password",
                      status:false
                  })
                  console.log("wrong email")
                  return
            }else{

               const DbPass = result[0].passwrd
               const token = result[0].userToken
               const Dehash = await bcrypt.compare(passwrd,DbPass)
  
                 if(Dehash){
                    
                     // Set JWT Tokens
                 const accesstoken =    CreatAccessToken(token)
                 const refreshtoken =    CreateRefreshToken(token)
                
                
                 // Update Refresh token 
                 UpdateJwtRefreshToken(token,refreshtoken)
                
                 res.cookie('dash',refreshtoken,{
                  httpOnly: true,
                  secure: true,  // Disable secure for local testing
                  sameSite: 'none', // Lax works on localhost
                  path: '/',
                  maxAge: 24 * 60 * 60 * 1000
                }).send({
                        status: true,
                        accesstoken : accesstoken,
                       //  Usertoken: user_token,
                        textStatus:"Processing",
                  })
                 
                   /*  res.send({
                        text:"Success",
                        status:true,
                        accesstoken,
                        user_token:token,
                      //  createrefreshtoken
                    })
                  //  console.log("You'er logged in")
 */
                 }else{

                    res.send({
                        text:"Wrong Email or Password",
                        status:false
                    })
                   console.log("wrong Password")
                    return

                 }


            }


   })




}




module.exports = DashLogin