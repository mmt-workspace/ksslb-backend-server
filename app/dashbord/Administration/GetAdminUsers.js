const db = require("../../../database/db")




// Get admin User information

GetAdminUsers = (req,res) =>{


    const sql = "SELECT * FROM Administration WHERE passcode = ? ORDER BY administration_id DESC;"
    passcode = "no"

    db.query(sql,[passcode],(err,result)=>{


     if(err)  return console.log(err.message)
         
       res.send(result)       
    })


}

// Get data for signle admin 
GetDataForSingleAdmin = (req,res)=>{

 
      const user_token = req.params.user_token
      console.log(user_token)
 
   const sql = "SELECT * FROM Administration WHERE userToken = ?;"
   
    db.query(sql,[user_token],(err,result)=>{


     if(err)  return console.log(err.message)
         
       res.send(result)       
    })



}








module.exports = {GetAdminUsers,GetDataForSingleAdmin}