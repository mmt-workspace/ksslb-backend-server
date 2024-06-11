const db = require("../database/db")




DeleteRecoveryCode = (id)=>{

   

    // Excute the timer function

   const timer =    setTimeout(()=>{

        
        const sql = "DELETE FROM ForgetPassword WHERE forget_password_id = ?;"
    
         db.query(sql,[id],(err,result) =>{
    
              if(err) console.log(err)
    
              console.log("Recovery Code has been deleted")
    
         })

         clearTimeout(timer)

    },100000)




}






module.exports= {DeleteRecoveryCode}