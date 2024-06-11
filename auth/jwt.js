const jwt = require("jsonwebtoken")
require("dotenv").config()



// Access Token

CreatAccessToken = (usertoken)=>{


    return jwt.sign({usertoken},process.env.ACCESS_TOKEN_SECRETE,{
           expiresIn:'10m'

    })

}


// Refresh Token

CreateRefreshToken = (usertoken)=>{

    return jwt.sign({usertoken},process.env.REFRESH_TOKEN_SECRETE,{
          expiresIn:"4m"
     })

}



// Authenticate 

authenticator = (req,res,next)=>{

    // Grab header

   const autherHeader =  req.headers["authorization"]
   const token = autherHeader && autherHeader.split(" ")[1]

   // check if token exist

   if(token === null) return res.sendStatus(401)


     jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE,(err,user)=>{

                  if(err) {
                    console.log(err.message)
                    res.sendStatus(403)
                    return
                  }

                  req.user = user
                  next()

     })

}



module.exports = {CreatAccessToken,CreateRefreshToken,authenticator}