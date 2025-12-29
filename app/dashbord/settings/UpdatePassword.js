const db = require("../../../database/db");
const bcrypt = require("bcryptjs")



// Check if Email exist
const CheckEmailAdmin = (req,res,next)=>{

      const {email,user_token}  = req.body
    
      const sql = "SELECT email FROM Administration WHERE userToken = ?;"

      db.query(sql,[user_token],(err,result) =>{

            if(err) return console.log(err.message) 
               
             
            if(!result[0].email > 0){

                     res.send({
                        statusText:"Email not Exist",
                        status:false
                     }) 
                }else{
                     next()
                } 
      })


}




// ChecK if Password exist
const CheckPasswordAdmin = async (req,res,next) =>{


    const {oldPassword,user_token}  = req.body

    const sql = "SELECT passwrd FROM Administration WHERE userToken = ?;"


    db.query(sql,[user_token],async(err,result) =>{


          if(err) return console.log(err.message) 
             
            const DbPass = result[0].passwrd
            const Dehash = await bcrypt.compare(oldPassword,DbPass)
           

                 if(Dehash){
                    next()
                 }else{

                    res.send({
                        statusText:"Wrong Password",
                        status:false
                    }) 

                 } 
           
  
 


    })






}



const UpdatePassword = async (req,res)=>{

   const {newPassword,email,user_token} = req.body
   
   

   
    // SQL
     const sql = "UPDATE Administration SET passwrd = ? WHERE email = ? AND userToken = ? ;"
     const saltRound = 10
     let hashPasswrd = await bcrypt.hash(newPassword,saltRound)

     db.query(sql,[hashPasswrd,email,user_token],(err,result)=>{
       
      if(err){
       console.log(err.message)
       return 
         }
          
         res.send({
         statusText: "Password Updated",
         status: true,   
          })

         }) 
 







}




module.exports = {UpdatePassword,CheckEmailAdmin,CheckPasswordAdmin}