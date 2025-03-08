const db = require('../../../database/db');






HandleVerify = (req,res)=>{

       const {type,file_token,rejectionReason} = req.body
       
       
       if(!type || !file_token){
           return res.sendStatus(400)
       }
    
       const sql = "UPDATE applicant_doc SET verify_status = ?, rejectionReason = ? WHERE file_token = ?;"
       let verify_status 

        if(type === "accept"){
            verify_status = type
        } else if(type === "revoked"){
             verify_status = type
        }
        else{

            verify_status = type
        }

      db.query(sql,[verify_status,rejectionReason,file_token],(err,result)=>{
             
        if(err) console.log(err.message)

        res.send(verify_status)


      })

 

      
      


}






module.exports = HandleVerify