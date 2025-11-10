const db = require("../../../database/db")
const bcrypt = require("bcryptjs")
const validator = require("validator")




CheckEmptyEmail = (req,res,next)=>{


const {email,userpassword} = req.body



    if(email.trim() !== "" && userpassword.trim() !== ""){

        if(!validator.isEmail(email)) return res.send({
            statusText:"incorrect email",
            status:false

        })

     let sql = "SELECT * FROM sign_up WHERE email = ?"

        db.query(sql,[email],(err,result) =>{
           
            if(err) return console.log(err)


            if(result.length > 0){
                   
                (  async ()=>{

                    let valid = await bcrypt.compare(userpassword,result[0].pswrd)
                      // console.log(valid)
                    if(valid){
                        next()
                    }else{
                        res.send({
                            textStatus:"Email or Password incorrect",
                            status:false

                        })
                        console.log("Wrong Passoword")
                    }
                })()
 
            }else{

                res.send({
                    textStatus: "Email or Password incorrect",
                    status:false
 
                })
                console.log("Wrong Email")
            }

        })
   
    }else{
      
        console.log("email or password is empty")
        res.sendStatus(422)
    }


}



module.exports = CheckEmptyEmail