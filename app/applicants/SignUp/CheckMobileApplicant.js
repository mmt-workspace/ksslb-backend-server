const db = require("../../../database/db")




CheckMobileApplicant  = (req,res,next)=>{


const {mobileNumber} = req.body



    if(mobileNumber.trim() === "") return res.sendStatus(422)

     let sql = "SELECT * FROM sign_up WHERE mobileNumber = ?;"

     db.query(sql,[mobileNumber],(err,result) =>{
           
      if(err) return console.log(err)


            if(result.length > 0){
                   
              
                res.send({
                    textStatus: "Mobile number Exist",
                    status:false
 
                })
                console.log("Mobile number Exist")

            }else{
             
                // Move to the next function
                next()
               
            }

        })


}



module.exports = CheckMobileApplicant 