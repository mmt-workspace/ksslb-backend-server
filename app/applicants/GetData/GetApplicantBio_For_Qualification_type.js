const db = require("../../../database/db")






GetApplicantBio_For_Qualification_type = (req,res)=>{

 
    let qualificationType = req.params.qualificationType
    let type = req.params.type
    let sql

    if(type === "selection"){

        sql = `SELECT 
        bt.*, 
        su.verify_status,
        et.*
    FROM 
        bio_table bt
    LEFT JOIN 
      sign_up su ON bt.user_token = su.user_token
    LEFT JOIN 
        edu_table et ON bt.user_token = et.user_token
        WHERE 
        et.applying_for_type = ? AND su.verify_status = 'verified';`
    }

    if(type === "verification"){

        sql = `SELECT 
        bt.*, 
        su.verify_status,
        et.*
    FROM 
        bio_table bt
    LEFT JOIN 
      sign_up su ON bt.user_token = su.user_token
    LEFT JOIN 
        edu_table et ON bt.user_token = et.user_token
        WHERE 
        et.applying_for_type = ? AND su.verify_status = 'Not Verified';`


    }

    
    
    
    
    
    db.query(sql,[qualificationType],(err,result)=>{
        if(err) return console.log(err.message)
             res.send(result)
    })


    


}



module.exports = GetApplicantBio_For_Qualification_type