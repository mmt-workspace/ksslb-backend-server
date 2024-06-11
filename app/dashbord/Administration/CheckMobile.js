const db = require("../../../database/db")








CheckMobile = (req,res,next) =>{



    const {mobileNumber} = req.body


    const sql = "SELECT mobileNumber FROM Administration WHERE mobileNumber = ?;"



    db.query(sql,[mobileNumber],(err,result) =>{


         if(err) return console.log(err.message)



         if(result.length > 0){

               res.send({
                   
                   statusText: "Mobile number exist",
                   status: false
               })
               return
         }

          // Move to next middleware
          next()


    })






}


module.exports = CheckMobile