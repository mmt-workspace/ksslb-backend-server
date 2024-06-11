const db = require("../../../database/db")






GetApplicantCre = (req,res)=>{

 
    const {email} = req.body
    
    const sql = "SELECT email,user_token FROM sign_up WHERE email = ?;"

    
    db.query(sql,[email],(err,result)=>{

           if(err) console.log(err.message)

           res.send(result) 

    })

    
    










}



module.exports = GetApplicantCre