const validator = require("validator")
const db = require("../../database/db")
const TokensGenerator = require("../../functions/TokensGenerator")
const GenerateToken = require("./GenerateToken")
const Details = require("./Details")




// Register administration
MakePayment = (req,res) =>{


    const {fname,lname,email,mobileNumber,qualification_type,resdential_type,state_of_origin,local_gov,amount} =  req.body

    const qualification_type_filter = qualification_type.slice(0,qualification_type.indexOf("="))
    
   
     // Validate 
     
     if(validator.isEmpty(fname.trim()) || validator.isEmpty(lname.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(mobileNumber.trim()) || validator.isEmpty(amount.trim()) || validator.isEmpty(qualification_type_filter.trim()) || validator.isEmpty(resdential_type.trim()) || validator.isEmpty(state_of_origin.trim()) || validator.isEmpty(local_gov.trim()) ){

          console.log("no empty input allow")
          res.sendStatus(422)
          return
     }
   
     if(!validator.isEmail(email.trim())){
         console.log("not email")
         res.sendStatus(422)
          return
     }


     if(!validator.isNumeric(mobileNumber.trim())){
        console.log("not number")
        res.sendStatus(422)
         return
    }

    if(!validator.isNumeric(amount)){
        console.log("amount not number")
        res.sendStatus(422)
         return
    }


    const sql = "INSERT INTO register_list(fname,lname,email,mobileNumber,amount,user_token) VALUES(?,?,?,?,?,?);"
    const user_token = TokensGenerator(10)
    const list = [fname,lname,email,mobileNumber,amount,user_token]



    db.query(sql,list,(err,result) =>{

     if(err) return console.log(err.message)

     // Generate Token Function
     GenerateToken(user_token,email,fname)
    // Insert user details 
    Details(user_token,qualification_type_filter,resdential_type,state_of_origin,local_gov)
   
     res.send({
      statusText:"Successfully Paid",
      status: true
          })
    })    
}



module.exports  = MakePayment