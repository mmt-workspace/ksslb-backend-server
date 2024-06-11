const db = require("../../database/db")
const validator = require("validator")







// Check Email and Mobile Number

CheckEmail = (req,res,next) =>{


    const {email} = req.body


     if(validator.isEmpty(email.trim())){

             res.sendStatus(422)
             return
     }


    const sql =  "SELECT email FROM register_list WHERE email = ?;"


    db.query(sql,[email],(err,result) =>{

         if(err) return console.log(err.message)


         // Check if Email exist 

         if(result.length > 0){


                res.send({
                    statusText: "Email is taken",
                      status: false
                })
         }else{

              // Pass it to next function
              next()
         }
         


    })




}




module.exports = CheckEmail