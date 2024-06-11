const validator = require("validator")
const db = require("../../../database/db")
const TokensGenerator = require("../../../functions/TokensGenerator")




// Amount function
Amount = (req,res) =>{


 

        const {amount,qualification_type} = req.body
   
     // Validate 
        
     if(validator.isEmpty(amount.trim()) || validator.isEmpty(qualification_type.trim()) ){

          console.log("no empty input allow")
          res.sendStatus(422)
          return
     }

     
     
     const amount_token = TokensGenerator(10)
     const qualification_type_Attached = `${qualification_type}=${amount}`

    const sql = "INSERT INTO amount_to_pay(amount,qualification_type,amount_token) VALUES(?,?,?);"
    const list = [amount,qualification_type_Attached,amount_token]

     console.log(amount)

    db.query(sql,list,(err,result) =>{

     if(err) return console.log(err.message)

     res.send({
      statusText:"Done",
      status: true
          })
    })    
}



module.exports  = Amount