const db = require('../../../database/db');
const validator = require("validator")
const bcrypt = require("bcrypt")
const TokensGenerator = require('../../../functions/TokensGenerator')
const applicant_credentials = require("./applicant_credentials")
const Bio = require("./Bio")
const Demography = require("./Demography")
const Parent = require("./Parent")
const Edu = require("./Edu")


Signup = (req,res)=>{

    const {fname,lname,email,mobileNumber,gender,d_o_b,resdential_type,degree_type,state_of_origin,local_gov,pswrd} = req.body

       
     if(validator.isEmpty(fname),validator.isEmpty(lname),validator.isEmpty(email),validator.isEmpty(mobileNumber),validator.isEmpty(gender),validator.isEmpty(d_o_b),validator.isEmpty(resdential_type),validator.isEmpty(state_of_origin),validator.isEmpty(local_gov),validator.isEmpty(pswrd)){
          return res.sendStatus(422)
     }

     if(!validator.isNumeric(mobileNumber)){
           console.log("Not a number")
          return res.sendStatus(422)
     }


     if(!validator.isEmail(email)){
          console.log("Not an Email")
        return res.sendStatus(422)
   }

      const sql = "INSERT INTO sign_up(email,mobileNumber,pswrd,user_token) VALUES(?,?,?,?);"

        const user_token = TokensGenerator(10)
        const saltRounds = 10;
        
        
        (async () => {
            // Technique 1 (generate a salt and hash on separate function calls):
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(pswrd,salt);
            const list = [email,mobileNumber,hash,user_token]
          
            // Store hash in your password DB.
            db.query(sql,list,(err,result)=>{
       
                   if(err) return console.log(err.message)
       
                    // Send applicant_credentials 
                    applicant_credentials(user_token)
                    // Send bio_table
                    Bio(fname,lname,mobileNumber,gender,d_o_b,resdential_type,user_token)
                    // Send demography_table
                    Demography(state_of_origin,local_gov,user_token)
                    // Send parent_table
                    Parent(user_token)
                    // Send edu_table
                    Edu(user_token,degree_type)

                    console.log("sign_up inserted")


                    res.send({
                           textStatus: 'Your account has been created successfully',
                           status: true
                    })
     
            })


    
        })();











}



module.exports = Signup