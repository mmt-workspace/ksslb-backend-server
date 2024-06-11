const db = require("../../database/db")
const validator = require("validator")





// Check for Mobile Number
CheckNumber = (req,res,next) =>{


    const {mobileNumber} = req.body


     if(validator.isEmpty(mobileNumber.trim())){

             res.sendStatus(422)
             return
     }


    const sql =  "SELECT mobileNumber FROM register_list WHERE mobileNumber = ?;"


    db.query(sql,[mobileNumber],(err,result) =>{

         if(err) return console.log(err.message)


         // Check if Mobile number exist 
         if(result.length > 0){

                res.send({
                    statusText: "Mobile number is taken",
                      status: false
                })

         }else{

              // Pass it to next function
              next()
         }
         


    })




}




module.exports = CheckNumber