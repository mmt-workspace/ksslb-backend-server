const db = require("../../../database/db")
const bcrypt = require("bcrypt")




CheckEmailApplicant = (req,res,next)=>{


const {email} = req.body



    if(email.trim() === "") return res.sendStatus(422)

     let sql = "SELECT * FROM sign_up WHERE email = ?;"

     db.query(sql,[email],(err,result) =>{
           
      if(err) return console.log(err)


            if(result.length > 0){
                   
              
                res.send({
                    textStatus: "Email Exist",
                    status:false
 
                })
                console.log("Email Exist")

            }else{
             
                // Move to the next function
                next()
               
            }

        })


}



module.exports = CheckEmailApplicant