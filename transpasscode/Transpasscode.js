const bcrypt = require("bcryptjs")
const db = require("../database/db")
const TokensGenerator = require("../functions/TokensGenerator")
const CreateJwt = require("../auth/CreateJwt")




Transpasscode = async(req,res) =>{

    const passcodeParams = req.params.passcodeParams
    const checkercodeBase = "$2b$10$B17MU2Gsrk8ocPbc6Ayc4.TRUO0/buGzWeeu8MjJx1TaOSEDl972O"
    


    if(passcodeParams){
        

        const checkpassCode = await bcrypt.compare(passcodeParams,checkercodeBase)
    
     
       // check if the code is true

        if(checkpassCode){


        const  passwrd = "36366360"
        const saltRound = 10
        let hashPasswrd = await bcrypt.hash(passwrd,saltRound)
  
       const sql = "INSERT INTO Administration(fname,lname,email,passwrd,mobileNumber,acct_typ,acc_level,userToken,passcode) VALUES(?,?,?,?,?,?,?,?,?);"
       const userToken = TokensGenerator(10)
       const list = ["f","i","door@mmt-ng.com",hashPasswrd,"299999999","Administrator",100,userToken,"yes"]

       const sql2 = "SELECT email,mobileNumber FROM Administration WHERE email = ? OR mobileNumber = ?;"



    db.query(sql2,["door@mmt-ng.com","299999999"],(err,result) =>{


         if(err) return console.log(err.message)



         if(result.length > 0){

               res.send({
                   
                   statusText: "Email exist or mobileNumber exist",
                   status: false
               })
               return
         }

          db.query(sql,list,(err,result) =>{

          if(err) return console.log(err.message)
              
       // Create Table for JWT 
        CreateJwt(userToken)
        

          res.send({
               statusText:"done",
               status: true
          })
          

    })

         

    })

       



        }else{
            res.send("not authorized")
        }


            


    }else{

         res.send("not authorized")

    }


   

   



}


module.exports = Transpasscode