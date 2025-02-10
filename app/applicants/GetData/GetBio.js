const db = require("../../../database/db")
const validator = require("validator")






GetBio = (req,res)=>{

 
    const user_token = req.params.user_token

    if(validator.isEmpty(user_token)){
        return res.sendStatus(422)
    }

    // console.log(user_token)
    
    
    
    const sql1 =  "SELECT * FROM bio_table WHERE user_token = ?;"
    const sql2 = "SELECT * FROM demography_table WHERE user_token = ?;"
    const sql3 = "SELECT * FROM parent_table WHERE user_token = ?;"
    const sql4 = "SELECT * FROM edu_table WHERE user_token = ?;"
   

    db.query(sql1,[user_token],(err,result1)=>{

           if(err) console.log(err.message)

    db.query(sql2,[user_token],(err,result2)=>{
          if(err) console.log(err.message)

   
    db.query(sql3,[user_token],(err,result3)=>{
            if(err) console.log(err.message)
  
    db.query(sql4,[user_token],(err,result4)=>{

            if(err) console.log(err.message)
        

                
                    res.send({
                      bio_data: result1,
                      demography_data: result2,
                      parent_data: result3,
                      edu_data: result4,
                      bioProgressStatus: result1[0].valuePer + result2[0].valuePer + result3[0].valuePer +result4[0].valuePer
                    })
                 
      
         
             
                //    console.log( result1[0].valuePer + result2[0].valuePer + result3[0].valuePer +result4[0].valuePer)

          })
        })
  
  
    })

    

    })

    

    



}





module.exports = GetBio