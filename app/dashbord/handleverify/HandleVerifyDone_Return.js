const db = require('../../../database/db');






HandleVerifyDone_Return = (req,res)=>{



       const {type,user_token} = req.body

       if(!type || !user_token){
           return res.sendStatus(400)
       }

    
       const sql = "UPDATE sign_up SET verify_status = ? WHERE user_token = ?;"
      
        let verify_status 

        if(type === "verified"){

            verify_status = type

        }else if(type === "returned"){

             verify_status = type
        }
        

      db.query(sql,[verify_status,user_token],(err,result)=>{
             
        if(err) console.log(err.message)

        res.send(verify_status)


      })

 

      
      


}






module.exports = HandleVerifyDone_Return