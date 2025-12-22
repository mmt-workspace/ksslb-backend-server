const db = require('../../../database/db');





CheckReturenApplication = (req,res)=>{



        const {user_token} = req.params

     const sql = "SELECT * FROM sign_up WHERE verify_status = ? AND  user_token = ?;"




      db.query(sql,['pending',user_token],(err,result)=>{

           if(err) return console.log(err.message)



             if(result.length > 0){

                 res.send({
                     status: true,
                     textStatus: "Important Message For You!!"
                 })
                   
             }else{

                 res.send({
                     status: false,
                     textStatus: ""
                 })
             }



      })







}



return_application_process = (req,res)=>{



 
         const sql = "UPDATE sign_up SET  verify_status = ? WHERE user_token = ?;"
         const sql2 = "SELECT * FROM acknowledgment WHERE user_token = ? AND mssg = ?;"
        const {user_token} = req.params



        db.query(sql2,[user_token,"acknowledged"],(err,result)=>{

                      if(err) return console.log(err.message)
                        
                        
                        if(result.length > 0){

                           
                        db.query(sql,['returned',user_token],(err,result)=>{

                        if(err) return console.log(err.message)



                        res.send({
                        status: true,
                        textStatus: "Application returned"
                        })



                        })

                        }else{

                             res.send({
                        status: false,
                        textStatus: "Check Preview Application section (step 4) first to aknowledge your application again !!!"
                        })
                        }
        })
       
    



}





module.exports = {CheckReturenApplication,return_application_process}