require("dotenv").config()
const jwt = require("jsonwebtoken")
const db = require("../database/db")



// Access Token
const CreatAccessToken = (usertoken)=>{


    return jwt.sign({usertoken},process.env.ACCESS_TOKEN_SECRETE,{
           expiresIn:'1h'

    })

}


// Refresh Token
const CreateRefreshToken = (usertoken)=>{

    return jwt.sign({usertoken},process.env.REFRESH_TOKEN_SECRETE,{
          expiresIn:"8h"
     })

}



// Authenticate 
const authenticator = (req,res,next)=>{

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


const UpdateJwtRefreshToken = (token,refreshToken) =>{
  
    
  const sql = "UPDATE jwt SET jwt = ? WHERE token = ?;"
 
       db.query(sql,[refreshToken,token],(err,result)=>{
            
          if(err) return console.log(err)
        //   console.log(result)
          console.log(" jwt updated...")

       })
  

}




const GetRefreshTokens =  (req,res)=>{
     
  const cookies = req.cookies

   
  if(!cookies?.applicant) return res.sendStatus(401)

  const applicant = cookies.applicant
      
  const sql = "SELECT * FROM jwt;"


  db.query(sql,async (err,result) =>{
        
       if(err) return console.log(err)

        const Alltokens = result
        // console.log(Alltokens)
        const FoundToken = await Alltokens.find(token => token.jwt === applicant)

         //  console.log(FoundToken)

         if(!FoundToken) {
             res.sendStatus(204)
             console.log('Token Not found')
             return 
         }else{

               let sql = "SELECT token FROM jwt WHERE jwt = ?"

                db.query(sql,[FoundToken.jwt],(err,result) =>{

                    if(err) console.log(err)

                     const token = result[0].token
                     
                    jwt.verify(FoundToken.jwt,process.env.REFRESH_TOKEN_SECRETE,(err,user) =>{
                           if (err) return res.sendStatus(403)

                           const accesstoken = CreatAccessToken(token)
                           res.json({
                            accesstoken,
                            status: true
                          })
                     }) 

                   
                })

         }
  }) 

}



const GetRefreshTokensDash =  (req,res)=>{
     
  const cookies = req.cookies

   
  if(!cookies?.dash) return res.sendStatus(401)

  const dash = cookies.dash
      
  const sql = "SELECT * FROM jwt;"


  db.query(sql,async (err,result) =>{
        
       if(err) return console.log(err)

        const Alltokens = result
       
        const FoundToken = await Alltokens.find(token => token.jwt === dash)

         //  console.log(FoundToken)

         if(!FoundToken) {

             res.sendStatus(204)
             console.log('Token Not found')
             return 
             
         }else{

               let sql = "SELECT token FROM jwt WHERE jwt = ?"

                db.query(sql,[FoundToken.jwt],(err,result) =>{

                    if(err) console.log(err)

                     const token = result[0].token
                     
                    jwt.verify(FoundToken.jwt,process.env.REFRESH_TOKEN_SECRETE,(err,user) =>{
                           if (err) return res.sendStatus(403)

                           const accesstoken = CreatAccessToken(token)
                           res.json({
                            accesstoken,
                            status: true
                          })
                     }) 

                   
                })

         }
  }) 

}



const Logout = (req,res)=>{
     
  const cookies = req.cookies;

  // Check if refreshtokens cookie exists in request
  if (!cookies?.applicant) {
    return res.sendStatus(401); // Unauthorized if cookie is not present
  }

  const applicant = cookies.applicant;

  // Query the database to find the refresh token
  const sql = "SELECT * FROM jwt;";
  db.query(sql, async (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500); // Internal Server Error if database query fails
    }

    const refreshTokens = result;
    const foundToken = refreshTokens.find((token) => token.jwt === applicant);

    if (!foundToken) {
      // If refresh token not found in database, return 401
      console.log('Token Not found');
      return res.sendStatus(401);
    }

    // Update the token in the database (set it to "")
    const updateSql = "UPDATE jwt SET jwt = ? WHERE jwt = ?;";
    db.query(updateSql, ["", foundToken.jwt], (err, result) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500); // Internal Server Error if database update fails
      }

      console.log('Cookie cleared');
      // Clear the cookie in the response
      res.clearCookie('applicant', {
        httpOnly: false,
        secure: false,
        sameSite: 'none',
        maxAge: 0
      }).sendStatus(204); // Send 204 No Content after clearing cookie
    });
  });

}



module.exports = {CreatAccessToken,CreateRefreshToken,authenticator,UpdateJwtRefreshToken,GetRefreshTokens,GetRefreshTokensDash,Logout}