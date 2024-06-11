const db = require("../../../database/db")








CheckEmail = (req,res,next) =>{



    const {email} = req.body


    const sql = "SELECT email FROM Administration WHERE email = ?;"



    db.query(sql,[email],(err,result) =>{


         if(err) return console.log(err.message)



         if(result.length > 0){

               res.send({
                   
                   statusText: "Email exist",
                   status: false
               })
               return
         }

          // Move to next middleware
          next()







    })






}


module.exports = CheckEmail