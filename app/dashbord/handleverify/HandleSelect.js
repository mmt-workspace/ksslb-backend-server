const db = require('../../../database/db');






HandleSelect = (req,res)=>{



       const {selecttype,user_token} = req.body
       
       
       if(!selecttype || !user_token){
           return res.sendStatus(400)
       }
       
       
       const sql = "UPDATE sign_up SET verify_status = ? WHERE user_token = ?;"
     //  let verify_status 

       /*     if(type === "accept"){
            verify_status = type
        } else if(type === "revoked"){
             verify_status = type
        }
        else{

            verify_status = type
        } */



      db.query(sql,[selecttype,user_token],(err,result)=>{
             
        if(err) console.log(err.message)

        res.send(selecttype)


      })

 

      
      


}






module.exports = HandleSelect