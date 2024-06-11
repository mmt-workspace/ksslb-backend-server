const db = require("../../database/db")
const TokensGenerator = require("../../functions/TokensGenerator")
const RandomID = require("../../functions/RandomID")
const SendConfirmationAfterPayment = require("../../email/SendConfirmationAfterPayment")


// Generate user Tokens 
GenerateToken = (userToken,email,fname)=>{


    const sql = "INSERT INTO Validation(user_token,ID,email,generatedTokens) VALUES(?,?,?,?);"
    const Tokens = `${69210}${TokensGenerator(8)}${RandomID(877220)}`
    const list = [userToken,RandomID(8876913),email,Tokens]

    db.query(sql,list,(err,result) =>{

        if(err) return console.log(err.message)
            
          // Send Mail to client
         SendConfirmationAfterPayment(email,Tokens,fname)
         
         console.log('Token Generated...')
    })  


}



module.exports = GenerateToken