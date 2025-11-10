const db = require('../../../database/db');
const validator = require("validator")
const bcrypt = require("bcryptjs")
const TokensGenerator = require('../../../functions/TokensGenerator')
const applicant_credentials = require("./applicant_credentials")
const {Bio} = require("./Bio")
const Demography = require("./Demography")
const Parent = require("./Parent")
const Edu = require("./Edu")
const BankDetail = require("./BankDetails")
const CreateJwt = require("../../../auth/CreateJwt")
const {application_type} = require('./application_type');
const SocialMediaSet = require('./SocialMediaSet');
const employmentDetails = require('./loan/insert/employmentDetails');
const guarantorDetails =  require('./loan/insert/guarantorDetails');
const loanRequest =  require('./loan/insert/loanRequest');
const personelReference = require('./loan/insert/personelReference'); 
const resdentialAddress = require('./loan/insert/resdentialAddress'); 
const salaryBankDetails = require('./loan/insert/salaryBankDetails'); 
const sponsorIdentification = require('./loan/insert/sponsorIdentification');
const spouseDetails = require('./loan/insert/spouseDetails');
const WelcomeEmail = require("../../../email/WelcomeEmail")


Signup = (req,res)=>{

    const {fname,md_name,lname,email,mobileNumber,gender,marital_status,d_o_b,resdential_type,degree_type,state_of_origin,local_gov,pswrd,applicationtype,loanCategory} = req.body

       
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
                    Bio(fname,md_name,lname,mobileNumber,gender,marital_status,d_o_b,resdential_type,user_token)
                    // Send demography_table
                    Demography(state_of_origin,local_gov,user_token)
                    // Send parent_table
                    Parent(user_token)
                    // Send edu_table
                    Edu(user_token,degree_type)
                    // Banl Details
                    BankDetail(user_token)

                    console.log("sign_up inserted")
                    // create jwt table
                    CreateJwt(user_token)
                    // set application_type
                    application_type(applicationtype,user_token)
                    // set social media table
                    SocialMediaSet(user_token)
                    
                    // set loan tables
                    sponsorIdentification(user_token)
                    employmentDetails(user_token)
                    guarantorDetails(user_token)
                    loanRequest(user_token,loanCategory)
                    personelReference(user_token)
                    resdentialAddress(user_token)
                    salaryBankDetails(user_token)
                    spouseDetails(user_token)

                    // send email
                    WelcomeEmail(email)

                    res.send({
                           textStatus: 'Your account has been created successfully',
                           status: true
                    })
     
            })


    
        })();











}



module.exports = Signup