const db = require("../../../database/db")
const validator = require("validator")
const bcrypt = require("bcrypt")
const RanDomID = require("../../../functions/RandomID")
const TokensGenerator = require("../../../functions/TokensGenerator")
const CreateJwt = require("../../../auth/CreateJwt")
const SendPassward = require("../../../email/SendPassward")



// Register administration
RegisterAdministration = async(req,res) =>{

   
    const {firstName,lastName,email,mobileNumber,userType} =  req.body
 
     // Validate 
     if(validator.isEmpty(firstName.trim()) || validator.isEmpty(lastName.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(userType.trim()) || validator.isEmpty(mobileNumber.trim())){

          console.log("no empty input allow")
          res.sendStatus(422)
          return
     }

     if(!validator.isEmail(email)){
         console.log("not email")
         res.sendStatus(422)
          return
     }

     if(!validator.isNumeric(mobileNumber)){

          console.log("not a number")
          res.sendStatus(422)
           return
     }

     const  user_roles = [
          "Administrator",
          "Manage",
          "Finance Manager",
          "Client Support",
          "Auditor / Compliance Officer",
          "Read-Only / Viewer",
          
          //"Developer / Technical Support",
      ]

       let acc_level
      
       switch(userType) {

          case user_roles[0]:
            // code block
            acc_level = 100
            break;
          case user_roles[1]:
            // code block
            acc_level = 90
            break;
          case user_roles[2]:
               // code block
               acc_level = 80
            break;
          case user_roles[3]:
               // code block
               acc_level = 70
             break;
          case user_roles[4]:
               // code block
               acc_level = 60
               break;
          case user_roles[5]:
                    // code block
                    acc_level = 50
              break;
              default:
                   // code block
             res.sendStatus(422)
             return
        }

        const  passwrd = RanDomID(32996582).toString()
        const saltRound = 10
        let hashPasswrd = await bcrypt.hash(passwrd,saltRound)
  
       const sql = "INSERT INTO Administration(fname,lname,email,passwrd,mobileNumber,acct_typ,acc_level,userToken) VALUES(?,?,?,?,?,?,?,?);"
       const userToken = TokensGenerator(10)
       const list = [firstName,lastName,email,hashPasswrd,mobileNumber,userType,acc_level,userToken]


    db.query(sql,list,(err,result) =>{

          if(err) return console.log(err.message)
              
       // Create Table for JWT 
        CreateJwt(userToken)
        // Send login details to user email
        SendPassward(email,passwrd)

          res.send({
               statusText:"Registered",
               status: true
          })

    })

     
}


module.exports  = RegisterAdministration