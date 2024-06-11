const db = require("../../../database/db")




// Get admin User information

GetAdminUsers = (req,res) =>{


    const sql = "SELECT * FROM Administration ORDER BY administration_id DESC;"


    db.query(sql,(err,result)=>{


     if(err)  return console.log(err.message)
         
       res.send(result)       
    })


}



module.exports = GetAdminUsers