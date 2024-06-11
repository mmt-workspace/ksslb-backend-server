const db = require("../database/db")





CreateJwt = (token)=>{

  const sql = "INSERT INTO jwt(token) VALUES(?);"


  db.query(sql,[token],(err,result) =>{

          if(err) return console.log(err.message)
          console.log("User token inserted in Jwt Table")
  })


  

}



module.exports = CreateJwt